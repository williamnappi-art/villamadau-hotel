import { NextRequest, NextResponse } from 'next/server'

/**
 * Raccoglie le segnalazioni della Content-Security-Policy in modalità "solo segnalazione"
 * (header Content-Security-Policy-Report-Only in next.config.ts).
 * Le scrive nei log di Vercel (Functions → Logs, cerca "[CSP]") senza dati personali:
 * solo pagina, direttiva violata e risorsa bloccata. Servono a completare l'elenco
 * delle fonti autorizzate prima di attivare la policy davvero.
 */

type Report = {
  'document-uri'?: string
  'violated-directive'?: string
  'effective-directive'?: string
  'blocked-uri'?: string
  // formato Reporting API (report-to)
  documentURL?: string
  effectiveDirective?: string
  blockedURL?: string
}

const NOISE = /^(chrome|moz|safari|safari-web)-extension:|^about:|^data:$|^blob:$/

function sanitize(u?: string) {
  if (!u) return '-'
  try {
    const url = new URL(u)
    return url.origin + url.pathname // niente query string (potrebbe contenere dati)
  } catch {
    return u.slice(0, 80)
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new NextResponse(null, { status: 204 })
  }

  // report-uri: { "csp-report": {...} } — report-to: [{ type: "csp-violation", body: {...} }]
  const reports: Report[] = Array.isArray(body)
    ? body.filter((r) => r?.type === 'csp-violation').map((r) => r.body as Report)
    : [((body as { 'csp-report'?: Report })['csp-report'] ?? {}) as Report]

  for (const r of reports.slice(0, 10)) {
    const blocked = r['blocked-uri'] ?? r.blockedURL ?? ''
    if (NOISE.test(blocked)) continue
    console.log(
      '[CSP]',
      r['effective-directive'] ?? r.effectiveDirective ?? r['violated-directive'] ?? '-',
      'bloccato:',
      sanitize(blocked) || blocked || '-',
      'pagina:',
      sanitize(r['document-uri'] ?? r.documentURL),
    )
  }
  return new NextResponse(null, { status: 204 })
}
