import { Link } from 'react-router-dom'
import { LayoutDashboard, FileText, Wrench, MapPin, LogOut } from 'lucide-react'

const modules = [
  { icon: FileText, label: 'Home, Descripción, Quiénes somos', status: 'Maqueta pública lista' },
  { icon: Wrench, label: 'Servicios (CRUD)', status: 'Pendiente backend — Semana 3' },
  { icon: MapPin, label: 'Contáctenos + mapa embed', status: 'UI lista · embed del cliente' },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-brand-neutral/50 bg-brand-blue text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={24} className="text-brand-orange" />
            <div>
              <p className="text-sm font-bold">Panel admin — maqueta</p>
              <p className="text-xs text-white/70">Sin autenticación real ni persistencia</p>
            </div>
          </div>
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"
          >
            <LogOut size={14} /> Salir
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
          Esta vista anticipa el shell del panel. Los formularios de edición se implementan con la API en las
          semanas 2–4 del plan.
        </div>
        <ul className="mt-8 space-y-4">
          {modules.map((mod) => (
            <li
              key={mod.label}
              className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm ring-1 ring-brand-neutral/40"
            >
              <mod.icon className="shrink-0 text-brand-blue" size={24} />
              <div>
                <p className="font-bold text-brand-blue">{mod.label}</p>
                <p className="text-sm text-text-body/70">{mod.status}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/" className="mt-8 inline-block text-sm font-bold text-brand-blue hover:text-brand-orange">
          Ver web pública →
        </Link>
      </main>
    </div>
  )
}
