import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().optional(),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  ospiti: z.string().optional(),
  messaggio: z.string().min(10).max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const destinatario = process.env.CONTACT_EMAIL ?? 'info@villamadau.it'

    if (!apiKey) {
      // In sviluppo senza API key, logga e restituisce successo
      console.log('[Contatto] Nuovo messaggio ricevuto:', data)
      return NextResponse.json({ ok: true })
    }

    // Invia email via Resend
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const righeOpzionali = [
      data.telefono ? `Telefono: ${data.telefono}` : null,
      data.checkin ? `Data arrivo: ${data.checkin}` : null,
      data.checkout ? `Data partenza: ${data.checkout}` : null,
      data.ospiti ? `Numero ospiti: ${data.ospiti}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    await resend.emails.send({
      from: 'Villa Madau Hotel <noreply@villamadau.it>',
      to: [destinatario],
      replyTo: data.email,
      subject: `Nuova richiesta da ${data.nome} – Villa Madau`,
      text: `
Nuova richiesta di contatto dal sito Villa Madau Hotel

Nome: ${data.nome}
Email: ${data.email}
${righeOpzionali}

Messaggio:
${data.messaggio}
      `.trim(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
    }
    console.error('[Contatto] Errore invio email:', error)
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}
