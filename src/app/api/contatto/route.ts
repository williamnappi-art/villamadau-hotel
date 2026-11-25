import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  telefono: z.string().trim().max(40).optional(),
  checkin: z.string().trim().max(20).optional(),
  checkout: z.string().trim().max(20).optional(),
  ospiti: z.string().trim().max(10).optional(),
  messaggio: z.string().trim().min(10).max(2000),
  /** Honeypot: campo invisibile nel form, lo compilano solo i bot */
  sito: z.string().max(200).optional(),
})

// Limite semplice per IP (in memoria della singola istanza serverless: argine contro lo spam a raffica)
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function tooManyRequests(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 1000) hits.clear() // evita che la mappa cresca all'infinito
  return recent.length > MAX_PER_WINDOW
}

/** Toglie a capo e caratteri di controllo (oggetto email, intestazioni) */
const oneLine = (s: string) => s.replace(/[\r\n\t\u0000-\u001f]+/g, ' ').trim()

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'sconosciuto'
  if (tooManyRequests(ip)) {
    return NextResponse.json({ error: 'Troppe richieste, riprova più tardi' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi' }, { status: 400 })
  }
  const data = parsed.data

  // Bot: rispondiamo "ok" senza inviare nulla, così non capisce di essere stato filtrato
  if (data.sito) return NextResponse.json({ ok: true })

  const apiKey = process.env.RESEND_API_KEY
  const destinatario = process.env.CONTACT_EMAIL ?? 'info@villamadau.it'

  if (!apiKey) {
    // Mai dire "inviato" se non lo è, e mai scrivere i dati personali nei log
    console.error('[Contatto] RESEND_API_KEY mancante: messaggio NON inviato')
    if (process.env.NODE_ENV !== 'production') return NextResponse.json({ ok: true, dev: true })
    return NextResponse.json({ error: 'Servizio email non configurato' }, { status: 503 })
  }

  const righeOpzionali = [
    data.telefono ? `Telefono: ${data.telefono}` : null,
    data.checkin ? `Data arrivo: ${data.checkin}` : null,
    data.checkout ? `Data partenza: ${data.checkout}` : null,
    data.ospiti ? `Numero ospiti: ${data.ospiti}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    // L'SDK di Resend NON lancia eccezioni: restituisce { data, error }
    const { error } = await resend.emails.send({
      from: 'Villa Madau Hotel <noreply@villamadau.it>',
      to: [destinatario],
      replyTo: data.email,
      subject: `Nuova richiesta da ${oneLine(data.nome)} – Villa Madau`,
      text: `
Nuova richiesta di contatto dal sito Villa Madau Hotel

Nome: ${oneLine(data.nome)}
Email: ${data.email}
${righeOpzionali}

Messaggio:
${data.messaggio}
      `.trim(),
    })
    if (error) {
      console.error('[Contatto] Resend ha rifiutato l’invio:', error.name, error.message)
      return NextResponse.json({ error: 'Invio non riuscito' }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Contatto] Errore invio email:', err instanceof Error ? err.message : 'sconosciuto')
    return NextResponse.json({ error: 'Errore server' }, { status: 500 })
  }
}
