import { Link } from 'react-router-dom'
import { Plus, Pencil, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react'
import { useSiteContent } from '../../context/SiteContentContext'
import { ButtonLink } from '../../components/ui/Button'

export default function AdminServicesPage() {
  const { services, updateServices } = useSiteContent()

  const sorted = [...services].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const toggleActive = (id) => {
    updateServices(services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)))
  }

  const move = (index, dir) => {
    const list = [...sorted]
    const j = index + dir
    if (j < 0 || j >= list.length) return
    const a = list[index]
    const b = list[j]
    const orderA = a.sortOrder ?? index
    const orderB = b.sortOrder ?? j
    updateServices(
      services.map((s) => {
        if (s.id === a.id) return { ...s, sortOrder: orderB }
        if (s.id === b.id) return { ...s, sortOrder: orderA }
        return s
      }),
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue">Servicios</h1>
          <p className="text-sm text-text-body/70">Solo los activos aparecen en el menú y listados públicos.</p>
        </div>
        <ButtonLink to="/admin/servicios/nuevo" variant="primary" className="text-sm">
          <Plus size={18} /> Nuevo servicio
        </ButtonLink>
      </div>

      <ul className="mt-8 space-y-3">
        {sorted.map((service, index) => (
          <li
            key={service.id}
            className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-brand-neutral/40 sm:flex-row sm:items-center"
          >
            <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <img src={service.image} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-brand-blue truncate">{service.title}</p>
              <p className="text-xs text-text-body/60">/{service.slug}</p>
              {!service.isActive && (
                <span className="mt-1 inline-block rounded bg-slate-200 px-2 py-0.5 text-xs font-semibold">Inactivo</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => move(index, -1)} className="rounded-lg border p-2 hover:bg-slate-50" aria-label="Subir">
                <ArrowUp size={16} />
              </button>
              <button type="button" onClick={() => move(index, 1)} className="rounded-lg border p-2 hover:bg-slate-50" aria-label="Bajar">
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                onClick={() => toggleActive(service.id)}
                className="rounded-lg border p-2 hover:bg-slate-50"
                title={service.isActive ? 'Desactivar' : 'Activar'}
              >
                {service.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <Link
                to={`/admin/servicios/${service.id}`}
                className="inline-flex items-center gap-1 rounded-lg bg-brand-blue px-3 py-2 text-xs font-bold text-white hover:bg-brand-blue-soft"
              >
                <Pencil size={14} /> Editar
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
