import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { ExternalButtonLink } from '../components/ui/Button'
import { contact, whatsappUrl, PLACEHOLDER } from '../data/mockContent'

function MapsBlock() {
  if (contact.mapsEmbedSrc) {
    return (
      <iframe
        title="Ubicación DOSH motor"
        src={contact.mapsEmbedSrc}
        className="h-full min-h-[280px] w-full border-0 md:min-h-[360px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    )
  }

  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center bg-slate-100 p-8 text-center md:min-h-[360px]">
      <MapPin className="mb-3 text-brand-blue" size={40} />
      <p className="max-w-sm text-sm font-semibold text-brand-blue">
        {PLACEHOLDER} Mapa embebido de Google Maps
      </p>
      <p className="mt-2 max-w-md text-xs text-text-body/70">
        El cliente debe pegar el código «Insertar mapa» desde Google Maps en el panel admin (Req 10).
      </p>
    </div>
  )
}

export default function ContactoPage() {
  const showDirections =
    contact.directionsUrl && !contact.directionsUrl.startsWith(PLACEHOLDER)

  return (
    <>
      <PageHero
        eyebrow="Contáctenos"
        title="Estamos para atenderte"
        subtitle="Teléfono, correo, horarios y ubicación del taller."
        compact
      >
        <ExternalButtonLink href={whatsappUrl()} variant="primary">
          WhatsApp
        </ExternalButtonLink>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <div className="rounded-2xl border border-brand-neutral/60 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-brand-blue">Datos de contacto</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="shrink-0 text-brand-orange" size={20} />
                  <span>{contact.phone}</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="shrink-0 text-brand-orange" size={20} />
                  <a href={`mailto:${contact.email.replace(/\[PLACEHOLDER\]\s*/g, '')}`} className="hover:text-brand-blue">
                    {contact.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="shrink-0 text-brand-orange" size={20} />
                  <span>{contact.hours}</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="shrink-0 text-brand-orange" size={20} />
                  <span>{contact.address}</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ExternalButtonLink href={whatsappUrl()} variant="primary" className="text-sm">
                  Abrir WhatsApp
                </ExternalButtonLink>
                {showDirections && (
                  <ExternalButtonLink href={contact.directionsUrl} variant="secondary" className="text-sm">
                    <Navigation size={16} /> Cómo llegar
                  </ExternalButtonLink>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-neutral/50">
            <MapsBlock />
          </div>
        </div>
      </section>
    </>
  )
}
