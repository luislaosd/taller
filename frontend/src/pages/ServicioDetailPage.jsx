import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'
import { buildWhatsappUrl } from '../utils/whatsapp'
import { ExternalButtonLink } from '../components/ui/Button'
import NotFoundPage from './NotFoundPage'

export default function ServicioDetailPage() {
  const { slug } = useParams()
  const { activeServices, contact } = useSiteContent()
  const service = activeServices.find((s) => s.slug === slug)

  if (!service) {
    return <NotFoundPage message="Este servicio no está disponible o fue desactivado." />
  }

  return (
    <article>
      <div className="bg-brand-blue py-8 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/servicios"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-brand-orange transition"
          >
            <ArrowLeft size={16} /> Volver a servicios
          </Link>
          <h1 className="mt-4 text-3xl font-bold uppercase md:text-4xl">{service.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-neutral/50">
          <img src={service.image} alt="" className="aspect-[21/9] w-full object-cover" />
        </div>
        <div className="prose prose-lg mt-10 max-w-3xl">
          <p className="text-lg leading-relaxed text-text-body/85">{service.body}</p>
        </div>
        <div className="mt-10">
          <ExternalButtonLink href={buildWhatsappUrl(contact)} variant="primary">
            Consultar por WhatsApp
          </ExternalButtonLink>
        </div>
      </div>
    </article>
  )
}
