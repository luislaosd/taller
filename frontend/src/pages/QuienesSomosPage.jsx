import PageHero from '../components/ui/PageHero'
import { useSiteContent } from '../context/SiteContentContext'

export default function QuienesSomosPage() {
  const { sections } = useSiteContent()
  const { quienesSomos } = sections

  return (
    <>
      <PageHero eyebrow="Equipo" title={quienesSomos.title} subtitle={quienesSomos.lead} compact />
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-neutral/50">
            <img
              src={quienesSomos.teamImage}
              alt=""
              className="aspect-[21/9] w-full object-cover md:aspect-[3/1]"
            />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {quienesSomos.values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border-l-4 border-brand-orange bg-slate-50 p-6"
              >
                <h2 className="text-xl font-bold text-brand-blue">{value.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-body/80">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
