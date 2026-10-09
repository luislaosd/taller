import PageHero from '../components/ui/PageHero'
import { sections } from '../data/mockContent'

export default function DescripcionPage() {
  const { descripcion } = sections

  return (
    <>
      <PageHero eyebrow="Institucional" title={descripcion.title} subtitle={descripcion.lead} compact />
      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-4 text-text-body/85 leading-relaxed">
            {descripcion.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-neutral/50">
            <img src={descripcion.image} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>
    </>
  )
}
