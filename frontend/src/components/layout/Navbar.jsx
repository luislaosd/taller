import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { activeServices } from '../../data/mockContent'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition ${
    isActive ? 'text-brand-orange' : 'text-white/90 hover:text-white'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const serviceCount = activeServices().length

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/descripcion', label: 'Descripción' },
    { to: '/quienes-somos', label: 'Quiénes somos' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/contacto', label: 'Contáctenos' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-blue shadow-lg shadow-brand-blue/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/logo.jpeg"
            alt="DOSH motor S.A.C."
            className="h-14 w-auto max-w-[220px] object-contain object-left sm:h-16 sm:max-w-[260px] md:h-[72px] md:max-w-[300px]"
            width={300}
            height={72}
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            to="/contacto"
            className="rounded-lg bg-brand-orange px-4 py-2 text-sm font-bold text-white hover:bg-brand-orange-soft transition"
          >
            Contacto
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-white/10 bg-brand-blue px-4 py-4 lg:hidden"
          aria-label="Menú móvil"
        >
          <ul className="flex flex-col gap-1">
            {links.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 text-base font-semibold ${
                      isActive ? 'bg-white/10 text-brand-orange' : 'text-white'
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {item.to === '/servicios' && serviceCount > 0 && (
                    <span className="ml-2 text-xs text-white/60">({serviceCount})</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
