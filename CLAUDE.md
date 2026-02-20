# CLAUDE.md

Questo file fornisce indicazioni a Claude Code (claude.ai/code) per lavorare con il codice in questo repository.

## Panoramica del Progetto

Sito web **Next.js 15** (App Router, TypeScript) per **Villa Madau Hotel** – hotel 3 stelle nel centro storico di Pula (CA), Sardegna. Il sito live corrente è `villamadau.it`.

## Comandi principali

```bash
npm run dev      # avvia in sviluppo su localhost:3000
npm run build    # build di produzione (verifica TypeScript + ESLint)
npm run lint     # solo linting ESLint
npm start        # avvia il server di produzione (dopo build)
```

## Architettura

### Stack
- **Framework**: Next.js 15 App Router + TypeScript
- **Styling**: Tailwind CSS v3 — colore brand `#2c5f2d` configurato come `primary`
- **Font**: Playfair Display (serif, `--font-playfair`) + Lato (sans, `--font-lato`) via `next/font/google`
- **Animazioni**: Framer Motion — usato solo per menu mobile e lightbox galleria
- **Form**: React Hook Form + Zod
- **Email**: Resend (richiede `RESEND_API_KEY` in `.env.local`)

### Struttura chiave

```
src/
├── app/                        # Pagine App Router
│   ├── layout.tsx              # Root layout: font, metadata globali, Header/Footer, JSON-LD Hotel
│   ├── page.tsx                # Homepage
│   ├── camere/page.tsx         # Lista camere
│   ├── camere/[slug]/page.tsx  # Dettaglio camera (SSG via generateStaticParams)
│   ├── ristorante/page.tsx
│   ├── servizi/page.tsx
│   ├── galleria/               # page.tsx (server) + GalleriaClient.tsx (lightbox, 'use client')
│   ├── contatti/page.tsx
│   ├── api/contatto/route.ts   # POST: valida dati e invia email via Resend
│   ├── sitemap.ts              # sitemap.xml generata automaticamente
│   └── robots.ts
├── components/
│   ├── layout/                 # Header (server), Footer (server + LocalBusiness schema), MobileNav ('use client')
│   ├── sections/               # Tutti server components: Hero, CamerePreview, Servizi, Ristorante, Location
│   ├── ui/                     # Button, SectionTitle
│   └── forms/ContactForm.tsx   # 'use client' — react-hook-form + Zod
├── content/
│   ├── camere.ts               # Array `camere[]` con slug, descrizione, dotazioni, immagini
│   └── servizi.ts              # Array `servizi[]` con icone
└── lib/
    ├── hotel.config.ts         # Costanti: nome, indirizzo, contatti, coordinate, attrazioni vicine
    └── schema.ts               # Generatori JSON-LD: Hotel, HotelRoom, LocalBusiness, BreadcrumbList
```

### Immagini
Le foto originali (con spazi nei nomi) rimangono in `images/`. Quelle usate dall'app sono in `public/images/` con nomi puliti: `hero.png`, `hotel-1.jpg`, `hotel-2.jpg`, `ristorante.jpg`, `sardegna-chia.jpg`, `mare-sardegna.jpg`.

### SEO
- Ogni `page.tsx` esporta `metadata` statici o `generateMetadata()`
- JSON-LD `Hotel` in `layout.tsx`, `LocalBusiness` in `Footer.tsx`, `HotelRoom` + `BreadcrumbList` nelle pagine camera
- Sitemap autogenerata da `src/app/sitemap.ts`, robots da `src/app/robots.ts`

### Aggiungere contenuti
- **Nuova camera**: aggiungere oggetto in `src/content/camere.ts` con `slug` univoco + immagine in `public/images/`
- **Nuovo servizio**: aggiungere in `src/content/servizi.ts` e il relativo SVG icon in `ServiziSection.tsx` e `servizi/page.tsx`
- **Costanti hotel** (telefono, orari, ecc.): modificare `src/lib/hotel.config.ts`

### Variabili d'ambiente
```
RESEND_API_KEY=   # API key Resend (https://resend.com) per il form contatti
CONTACT_EMAIL=    # email destinatario (default: info@villamadau.it)
```
Vedere `.env.local.example` come riferimento.

## Lingua dei Contenuti

Tutti i contenuti visibili all'utente sono in **italiano**.
