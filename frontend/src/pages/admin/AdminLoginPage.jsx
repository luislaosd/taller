import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Lock, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { adminCredentials } from '../../config/authConfig'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated } = useAdminAuth()
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) navigate('/admin', { replace: true })
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const ok = await login(user, pass)
    if (ok) {
      const dest = location.state?.from || '/admin'
      navigate(dest, { replace: true })
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
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
            <p className="mt-1 text-xs text-text-body/60">
              Maqueta: sesión en este navegador · sin backend aún
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                <AlertCircle size={16} /> {error}
              </p>
            )}
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
                required
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
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Entrar
            </Button>
          </form>
          <details className="mt-6 rounded-lg border border-brand-neutral/60 bg-slate-50 p-3 text-xs text-text-body/80">
            <summary className="cursor-pointer font-semibold text-brand-blue">Credenciales de demo</summary>
            <p className="mt-2">
              Usuario: <code className="rounded bg-white px-1">{adminCredentials.username}</code>
            </p>
            <p className="mt-1">
              Contraseña: <code className="rounded bg-white px-1">{adminCredentials.password}</code>
            </p>
            <p className="mt-2 text-[11px] text-text-body/60">
              Cambiables con <code>VITE_ADMIN_USER</code> y <code>VITE_ADMIN_PASSWORD</code> en Vercel.
            </p>
          </details>
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
