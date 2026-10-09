import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Maqueta: sin backend. Navegación demo al panel.
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-brand-neutral/50">
          <div className="mb-6 text-center">
            <img
              src="/logo.jpeg"
              alt="DOSH motor S.A.C."
              className="mx-auto h-14 w-auto max-w-[220px] object-contain"
            />
            <p className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-brand-blue">
              <Lock size={16} /> Panel administrativo
            </p>
            <p className="mt-1 text-xs text-text-body/60">Maqueta — login sin API (Req 4 pendiente de backend)</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-text-body">
                Usuario
              </label>
              <input
                id="user"
                type="text"
                autoComplete="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-neutral px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="admin"
              />
            </div>
            <div>
              <label htmlFor="pass" className="block text-sm font-medium text-text-body">
                Contraseña
              </label>
              <input
                id="pass"
                type="password"
                autoComplete="current-password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="mt-1 w-full rounded-lg border border-brand-neutral px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Entrar (demo)
            </Button>
          </form>
          <p className="mt-6 text-center text-sm">
            <Link to="/" className="font-semibold text-brand-blue hover:text-brand-orange">
              ← Volver al sitio público
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
