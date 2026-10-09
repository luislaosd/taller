import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/ui/Button'

export default function NotFoundPage({ message = 'Página no encontrada.' }) {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold text-brand-blue/20">404</p>
      <h1 className="mt-4 text-2xl font-bold text-brand-blue">{message}</h1>
      <ButtonLink to="/" variant="secondary" className="mt-8">
        Volver al inicio
      </ButtonLink>
    </section>
  )
}
