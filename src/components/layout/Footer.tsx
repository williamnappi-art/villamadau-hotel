import Link from 'next/link'
import { HOTEL } from '@/lib/hotel.config'
import { generateLocalBusinessSchema } from '@/lib/schema'

const links = [
  { href: '/camere', label: 'Camere' },
  { href: '/ristorante', label: 'Ristorante' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/galleria', label: 'Galleria' },
  { href: '/contatti', label: 'Contatti' },
]

export function Footer() {
  const schema = generateLocalBusinessSchema()

  return (
    <footer className="bg-gray-900 text-gray-400">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-2">{HOTEL.shortName}</p>
            <p className="text-sm leading-relaxed">{HOTEL.tagline}</p>
            <div className="flex gap-4 mt-4">
              <a
                href={HOTEL.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Villa Madau"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <a
                href={HOTEL.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Villa Madau"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Navigazione */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Navigazione
            </p>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              Dove siamo
            </p>
            <address className="not-italic text-sm space-y-2">
              <p>{HOTEL.address.full}</p>
              <p>
                <a
                  href={`mailto:${HOTEL.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {HOTEL.contact.email}
                </a>
              </p>
              <p>Check-in: {HOTEL.checkinTime} · Check-out: {HOTEL.checkoutTime}</p>
            </address>
            <a
              href={HOTEL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-primary-300 hover:text-primary-200 transition-colors"
            >
              Vedi su Google Maps →
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-xs text-gray-600 text-center">
          © {new Date().getFullYear()} {HOTEL.name} – {HOTEL.address.full} – P.IVA da inserire
        </div>
      </div>
    </footer>
  )
}
