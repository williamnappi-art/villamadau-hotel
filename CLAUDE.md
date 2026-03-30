# CLAUDE.md

Questo file fornisce indicazioni a Claude Code (claude.ai/code) per lavorare con il codice in questo repository.

## Panoramica del Progetto

Sito web **Next.js 15.5** (App Router, TypeScript) per **Villa Madau Hotel** – Hotel Boutique nel centro storico di Pula (CA), Sardegna. Il sito live corrente e' `villamadau.it`. Sito bilingue IT/EN.

## Comandi principali

```bash
npm run dev      # avvia in sviluppo su localhost:3000
npm run build    # build di produzione (verifica TypeScript + ESLint)
npm run lint     # solo linting ESLint
npm start        # avvia il server di produzione (dopo build)
```

## Architettura

### Stack
- **Framework**: Next.js 15.5 App Router + TypeScript
- **Styling**: Tailwind CSS v3 — colore brand oro sabbia `#c4b99a` configurato come `primary`
- **Font**: Cormorant Garamond (serif, `--font-cormorant`) + DM Sans (sans, `--font-dm-sans`) via `next/font/google`
- **Animazioni**: Framer Motion — transizione fade tra pagine (template.tsx), menu mobile fullscreen con clip-path circolare, carosello 3D, offerte auto-rotate
- **Form**: React Hook Form + Zod
- **Email**: Resend (richiede `RESEND_API_KEY` in `.env.local`)
- **i18n**: next-intl — italiano (default, senza prefisso URL) + inglese (/en/)
- **Immagini**: tutte in WebP, video in MP4 H.264 (compressi a 3 MB ciascuno)

### Struttura chiave

```
src/
├── app/
│   ├── layout.tsx              # Root layout minimo (solo children)
│   ├── globals.css             # Stili globali, bg-[#1e1c18]
│   ├── sitemap.ts              # Sitemap bilingue (IT + EN)
│   ├── robots.ts               # allow: '/' + sitemap URL (indicizzazione attiva)
│   ├── api/contatto/route.ts   # POST: valida dati e invia email via Resend
│   └── [locale]/               # Routing multilingua
│       ├── layout.tsx          # Layout locale: html lang, font, metadata, NextIntlClientProvider
│       ├── template.tsx        # Transizione fade tra pagine (framer-motion, 'use client')
│       ├── page.tsx            # Homepage
│       ├── hotel/page.tsx
│       ├── ristorante/page.tsx
│       ├── servizi/page.tsx
│       ├── contatti/page.tsx
│       ├── galleria/           # page.tsx (server) + GalleriaClient.tsx (lightbox, 'use client')
│       ├── da-non-perdere/page.tsx
│       ├── sant-efisio/page.tsx
│       ├── domus-antigas/page.tsx
│       ├── pasqua-a-pula/page.tsx
│       ├── gutturu-mannu/page.tsx
│       └── privacy/page.tsx
├── i18n/
│   ├── routing.ts              # Locales: ['it', 'en'], defaultLocale: 'it', localePrefix: 'as-needed', localeDetection: false
│   ├── request.ts              # Carica i JSON delle traduzioni per namespace
│   └── navigation.ts           # Link, usePathname, useRouter locale-aware
├── middleware.ts                # Middleware next-intl per locale detection
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Server component async, nav + LanguageSwitcher
│   │   ├── Footer.tsx          # Server component async, link privacy + gestisci cookie
│   │   ├── ConditionalHeader.tsx # Client: mostra Header solo su pagine senza hero
│   │   └── MobileNav.tsx       # Client: menu fullscreen con clip-path circolare
│   ├── sections/
│   │   ├── HeroSection.tsx     # Home hero (video di sfondo)
│   │   ├── HotelHero.tsx, ServiziHero.tsx, ContattiHero.tsx, RistoranteHero.tsx
│   │   ├── DaNonPerdereHero.tsx, DomusAntigasHero.tsx, SantEfisioHero.tsx, PasquaHero.tsx
│   │   ├── HeroMobileMenu.tsx  # Client: hamburger + menu fullscreen per hero
│   │   ├── CardCarousel.tsx    # Client: carosello 3D con auto-advance
│   │   ├── OfferteSection.tsx  # Client: offerte con auto-rotate
│   │   ├── RistoranteSection.tsx, LocationSection.tsx  # Server components
│   │   └── HomeScrollSnap.tsx  # Scroll behavior
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── CookieBanner.tsx    # GDPR: Consent Mode v2, salva in localStorage (180 giorni)
│   │   └── LanguageSwitcher.tsx # Bandierine SVG IT/EN
│   └── forms/ContactForm.tsx   # 'use client' — react-hook-form + Zod
├── content/
│   ├── camere.ts               # Dati camere (slug, mq, occupazione, immagine)
│   └── servizi.ts              # Dati servizi (icone)
└── lib/
    ├── hotel.config.ts         # Costanti: nome, indirizzo, contatti, coordinate, URL
    └── schema.ts               # JSON-LD: Hotel, HotelRoom, BreadcrumbList

messages/
├── it/                         # 11 file JSON con tutte le stringhe italiane
│   ├── common.json             # Nav, footer, CTA, cookie banner
│   ├── metadata.json           # Titoli e descrizioni SEO
│   ├── home.json, hotel.json, ristorante.json, servizi.json
│   ├── camere.json, contatti.json, eventi.json, galleria.json, privacy.json
└── en/                         # 11 file JSON con traduzioni inglesi (stessa struttura)
```

### Traduzioni (next-intl)
- **Server components**: usare `getTranslations('namespace')` da `next-intl/server`
- **Client components**: usare `useTranslations('namespace')` da `next-intl`
- **Link**: usare `Link` da `@/i18n/navigation` (non da `next/link`)
- **Pathname**: usare `usePathname` da `@/i18n/navigation` (restituisce path senza prefisso locale)
- **Ogni page.tsx** deve avere `setRequestLocale(locale)` e accettare `params: Promise<{ locale: string }>`
- I namespace corrispondono ai nomi dei file JSON: `common`, `home`, `hotel`, `eventi`, ecc.

### Immagini e video
Tutte le immagini sono in `public/images/` in formato WebP (1920px max). I video sono in MP4 H.264 (~3 MB ciascuno, senza audio, con faststart per streaming). Il logo (`logo.png`) e il logo Federico's (`logo-federicos.gif`) restano nei formati originali.

### SEO
- Ogni `page.tsx` esporta `generateMetadata` (dinamico, multilingua) con title, description, canonical locale-aware, hreflang alternates IT+EN, OpenGraph con locale (it_IT/en_US)
- JSON-LD `Hotel` nel layout, `BreadcrumbList` nelle singole pagine
- Immagine OG/SERP di default: `/images/hotel-primavera.webp`
- Sitemap bilingue autogenerata
- 21 redirect 301 dal vecchio sito Flazio configurati in `next.config.ts`
- robots.ts: `allow: '/'` con riferimento a sitemap (indicizzazione attiva)

### Cookie e tracking
- GTM attivo: `GTM-KQMDTBCZ` con GA4 `G-942JLBX8T4`
- Consent Mode v2: default denied, aggiornato dal CookieBanner
- Cookie banner GDPR (accetta/rifiuta/personalizza), preferenze in localStorage (180 giorni)
- Tag GTM: GA4, Conversion Linker, click (telefono, email, prenota, social, maps, WhatsApp), scroll depth, outbound links
- Consenso integrato abilitato su tutti i tag in GTM Console

### Aggiungere contenuti
- **Nuova camera**: aggiungere in `src/content/camere.ts` + tradurre in `messages/it/camere.json` e `messages/en/camere.json`
- **Nuovo servizio**: aggiungere in `src/content/servizi.ts` + tradurre nei file servizi.json
- **Costanti hotel** (telefono, orari, ecc.): modificare `src/lib/hotel.config.ts`
- **Nuova pagina**: creare sotto `src/app/[locale]/`, aggiungere traduzioni nei JSON, aggiungere alla sitemap

### Variabili d'ambiente
```
RESEND_API_KEY=   # API key Resend (https://resend.com) per il form contatti
CONTACT_EMAIL=    # email destinatario (default: info@villamadau.it)
