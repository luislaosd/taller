import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { contact } from '../../data/mockContent'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-brand-blue text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <img
            src="/logo.jpeg"
            alt="DOSH motor S.A.C."
            className="mb-4 h-12 w-auto max-w-[200px] object-contain object-left brightness-110"
            width={200}
            height={48}
          />
          <p className="text-sm text-white/80 leading-relaxed">
            Taller automotriz — maqueta web v1. Contenido comercial pendiente de confirmación con el cliente.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-orange">Secciones</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-brand-orange transition">Home</Link></li>
            <li><Link to="/descripcion" className="hover:text-brand-orange transition">Descripción</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-brand-orange transition">Quiénes somos</Link></li>
            <li><Link to="/servicios" className="hover:text-brand-orange transition">Servicios</Link></li>
            <li><Link to="/contacto" className="hover:text-brand-orange transition">Contáctenos</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-orange">Contacto</h2>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex gap-2">
              <Phone size={18} className="shrink-0 text-brand-orange" />
              <span>{contact.phone}</span>
            </li>
            <li className="flex gap-2">
              <Mail size={18} className="shrink-0 text-brand-orange" />
              <span>{contact.email}</span>
            </li>
            <li className="flex gap-2">
              <Clock size={18} className="shrink-0 text-brand-orange" />
              <span>{contact.hours}</span>
            </li>
            <li className="flex gap-2">
              <MapPin size={18} className="shrink-0 text-brand-orange" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {year} DOSH motor S.A.C. · Maqueta frontend ·{' '}
        <Link to="/admin/login" className="underline hover:text-brand-orange">
          Admin
        </Link>
      </div>
    </footer>
  )
}
