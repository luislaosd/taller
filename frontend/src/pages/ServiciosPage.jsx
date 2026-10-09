import { Link } from 'react-router-dom'
import PageHero from '../components/ui/PageHero'
import { useSiteContent } from '../context/SiteContentContext'

export default function ServiciosPage() {
  const { activeServices: list } = useSiteContent()

  return (
    <>
      <PageHero
        eyebrow="Servicios activos"
        title="Lo que hacemos por tu vehículo"
        subtitle="Cada servicio tiene su página con detalle. Los inactivos no se muestran en esta maqueta."
        compact
      />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {list.map((service) => (
              <article
                key={service.id}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-brand-neutral/40 transition hover:ring-brand-blue/30"
              >
                <Link to={`/servicios/${service.slug}`} className="block overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    className="aspect-[16/9] w-full object-cover transition hover:scale-[1.02]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold text-brand-blue">
                    <Link to={`/servicios/${service.slug}`} className="hover:text-brand-orange transition">
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-body/80">{service.excerpt}</p>
                  <Link
                    to={`/servicios/${service.slug}`}
                    className="mt-4 text-sm font-bold text-brand-orange hover:underline"
                  >
                    Ver detalle →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
