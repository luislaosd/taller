import { Gauge, MessageSquare, Wrench, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ButtonLink, ExternalButtonLink } from '../components/ui/Button'
import { sections, activeServices, whatsappUrl } from '../data/mockContent'

const iconMap = {
  gauge: Gauge,
  wrench: Wrench,
  message: MessageSquare,
}

export default function HomePage() {
  const { home } = sections
  const featured = activeServices().slice(0, 3)

  return (
    <>
      <section className="relative min-h-[520px] overflow-hidden bg-text-body text-white md:min-h-[600px]">
        <img
          src={home.heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/95 via-brand-blue/80 to-brand-blue/40" />
        <div className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[600px] lg:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-orange">DOSH motor S.A.C.</p>
          <h1 className="max-w-2xl text-4xl font-bold uppercase leading-tight md:text-6xl text-balance">
            {home.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90 leading-relaxed">{home.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ExternalButtonLink href={whatsappUrl()} variant="primary">
              {home.ctaLabel}
            </ExternalButtonLink>
            <ButtonLink to="/servicios" variant="onDark">
              Ver servicios
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-bold uppercase text-brand-blue md:text-4xl">Por qué elegirnos</h2>
            <p className="mt-3 text-text-body/80">Calidad técnica y comunicación clara en cada visita.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {home.highlights.map((item) => {
              const Icon = iconMap[item.icon] || Wrench
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-brand-neutral/60 bg-white p-6 shadow-sm transition hover:border-brand-orange/40 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-brand-orange/10 p-3 text-brand-orange">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-brand-blue">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-body/80">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase text-brand-blue">Servicios</h2>
              <p className="mt-2 text-text-body/80">Soluciones para el cuidado de tu vehículo.</p>
            </div>
            <Link
              to="/servicios"
              className="inline-flex items-center gap-1 text-sm font-bold text-brand-blue hover:text-brand-orange transition"
            >
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <Link
                key={service.id}
                to={`/servicios/${service.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-neutral/50 transition hover:shadow-lg hover:ring-brand-orange/30"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-blue group-hover:text-brand-orange transition">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-text-body/75">{service.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-blue py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold uppercase md:text-4xl">¿Listo para agendar?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Escríbenos por WhatsApp o visita nuestra sección de contacto con mapa y horarios.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ExternalButtonLink href={whatsappUrl()} variant="primary">
              WhatsApp
            </ExternalButtonLink>
            <ButtonLink to="/contacto" variant="onDark">
              Contáctenos
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
