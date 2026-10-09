import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Home,
  FileText,
  Users,
  Wrench,
  MapPin,
  LogOut,
  ExternalLink,
} from 'lucide-react'
import { useAdminAuth } from '../../context/AdminAuthContext'

const navClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-brand-orange text-white' : 'text-white/85 hover:bg-white/10'
  }`

export default function AdminLayout() {
  const { logout } = useAdminAuth()

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      <aside className="bg-brand-blue text-white md:w-64 md:shrink-0">
        <div className="border-b border-white/10 p-4">
          <img src="/logo.jpeg" alt="DOSH motor" className="h-10 w-auto max-w-[160px] object-contain" />
          <p className="mt-2 text-xs text-white/70">Panel de configuración · maqueta</p>
        </div>
        <nav className="flex flex-row gap-1 overflow-x-auto p-3 md:flex-col md:overflow-visible" aria-label="Admin">
          <NavLink to="/admin" end className={navClass}>
            <LayoutDashboard size={18} /> Inicio
          </NavLink>
          <NavLink to="/admin/secciones/home" className={navClass}>
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/admin/secciones/descripcion" className={navClass}>
            <FileText size={18} /> Descripción
          </NavLink>
          <NavLink to="/admin/secciones/quienes-somos" className={navClass}>
            <Users size={18} /> Quiénes somos
          </NavLink>
          <NavLink to="/admin/secciones/contacto" className={navClass}>
            <MapPin size={18} /> Contáctenos
          </NavLink>
          <NavLink to="/admin/servicios" className={navClass}>
            <Wrench size={18} /> Servicios
          </NavLink>
        </nav>
        <div className="mt-auto hidden border-t border-white/10 p-3 md:block">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            <ExternalLink size={16} /> Ver sitio público
          </Link>
          <button
            type="button"
            onClick={() => {
              logout()
              window.location.href = '/admin/login'
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            <LogOut size={16} /> Cerrar sesión
          </button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-brand-neutral/40 bg-white px-4 py-3 md:hidden">
          <span className="text-sm font-bold text-brand-blue">DOSH admin</span>
          <button type="button" onClick={logout} className="text-sm text-brand-orange font-semibold">
            Salir
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
