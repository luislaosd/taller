import { Link } from 'react-router-dom'
import { FileText, Wrench, MapPin, RotateCcw } from 'lucide-react'
import { useSiteContent } from '../../context/SiteContentContext'

const cards = [
  { to: '/admin/secciones/home', icon: FileText, title: 'Home', desc: 'Portada, mensaje e imagen hero' },
  { to: '/admin/secciones/descripcion', icon: FileText, title: 'Descripción', desc: 'Presentación del taller' },
  { to: '/admin/secciones/quienes-somos', icon: FileText, title: 'Quiénes somos', desc: 'Historia y valores' },
  { to: '/admin/secciones/contacto', icon: MapPin, title: 'Contáctenos', desc: 'Teléfono, WhatsApp, mapa embed' },
  { to: '/admin/servicios', icon: Wrench, title: 'Servicios', desc: 'Crear, editar, orden y activar/desactivar' },
]

export default function AdminDashboardPage() {
  const { activeServices, resetToDefaults } = useSiteContent()

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-brand-blue">Configuración del sitio</h1>
      <p className="mt-2 text-sm text-text-body/75">
        Los cambios se guardan en este navegador (localStorage) y se reflejan en la web pública al instante.
        En producción final irán al backend (Supabase).
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="flex gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-brand-neutral/40 transition hover:ring-brand-orange/50"
          >
            <card.icon className="shrink-0 text-brand-orange" size={28} />
            <div>
              <p className="font-bold text-brand-blue">{card.title}</p>
              <p className="text-sm text-text-body/70">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-white p-5 shadow-sm ring-1 ring-brand-neutral/40">
        <p className="text-sm">
          <span className="font-bold text-brand-blue">{activeServices.length}</span> servicios activos visibles en
          la web.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Restaurar textos e imágenes a los valores iniciales de la maqueta?')) {
              resetToDefaults()
              window.location.reload()
            }
          }}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:underline"
        >
          <RotateCcw size={16} /> Restaurar contenido demo
        </button>
      </div>
    </div>
  )
}
