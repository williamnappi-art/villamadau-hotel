import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { camere, getCameraBySlug } from '@/content/camere'
import { Button } from '@/components/ui/Button'
import { generateRoomSchema, generateBreadcrumbSchema } from '@/lib/schema'
import { HOTEL } from '@/lib/hotel.config'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return camere.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const camera = getCameraBySlug(slug)
  if (!camera) return {}

  return {
    title: camera.nome,
    description: camera.descrizioneBreve + ` A Pula, nel centro storico della Sardegna meridionale.`,
    alternates: { canonical: `${HOTEL.url}/camere/${slug}` },
    openGraph: {
      title: `${camera.nome} | ${HOTEL.shortName} Hotel Pula`,
      description: camera.descrizioneBreve,
      images: [{ url: camera.immagine, width: 1200, height: 630, alt: camera.immagineAlt }],
    },
  }
}

export default async function CameraDetailPage({ params }: Props) {
  const { slug } = await params
  const camera = getCameraBySlug(slug)
  if (!camera) notFound()

  const roomSchema = generateRoomSchema(camera)
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: HOTEL.url },
    { name: 'Camere', url: `${HOTEL.url}/camere` },
    { name: camera.nome, url: `${HOTEL.url}/camere/${slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roomSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Breadcrumb visuale */}
      <div className="bg-cream py-3 px-4">
        <div className="max-w-7xl mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/camere" className="hover:text-primary">Camere</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{camera.nome}</span>
        </div>
      </div>

      <article className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Immagine */}
            <div className="relative h-80 lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={camera.immagine}
                alt={camera.immagineAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Contenuto */}
            <div className="flex flex-col">
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">
                {camera.mq} mq · fino a {camera.occupazione} ospiti
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-3">
                {camera.nome}
              </h1>
              <p className="text-gray-500 italic mb-6">{camera.sottotitolo}</p>
              <p className="text-gray-700 leading-relaxed mb-8">{camera.descrizione}</p>

              {/* Dotazioni */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4">
                  Dotazioni
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {camera.dotazioni.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 text-primary flex items-center justify-center text-xs">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Politiche */}
              <div className="bg-cream rounded-lg p-5 mb-8 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-800">Check-in:</span> dalle {HOTEL.checkinTime} ·
                  <span className="font-semibold text-gray-800"> Check-out:</span> entro {HOTEL.checkoutTime}
                </p>
                <p className="mt-1">Colazione inclusa · Animali non ammessi · Non fumatori</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contatti">Prenota questa camera</Button>
                <Button href="/camere" variant="outline">Tutte le camere</Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
