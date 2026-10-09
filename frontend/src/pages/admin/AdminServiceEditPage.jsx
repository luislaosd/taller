import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useSiteContent } from '../../context/SiteContentContext'

const inputClass =
  'w-full rounded-lg border border-brand-neutral px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const emptyService = () => ({
  id: Date.now(),
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  image: '/images/mock/taller.jpg',
  sortOrder: 99,
  isActive: true,
})

export default function AdminServiceEditPage() {
  const { id } = useParams()
  const isNew = id === 'nuevo'
  const navigate = useNavigate()
  const { services, updateServices } = useSiteContent()
  const [form, setForm] = useState(emptyService)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isNew) {
      setForm(emptyService())
      return
    }
    const found = services.find((s) => String(s.id) === id)
    if (found) setForm({ ...found })
  }, [id, isNew, services])

  const handleSave = (e) => {
    e.preventDefault()
    const slug = form.slug || slugify(form.title)
    const payload = { ...form, slug }

    if (isNew) {
      updateServices([...services, payload])
    } else {
      updateServices(services.map((s) => (s.id === payload.id ? payload : s)))
    }
    setSaved(true)
    setTimeout(() => navigate('/admin/servicios'), 800)
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/admin/servicios" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:text-brand-orange">
        <ArrowLeft size={16} /> Volver al listado
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-brand-blue">{isNew ? 'Nuevo servicio' : 'Editar servicio'}</h1>

      <form onSubmit={handleSave} className="mt-6 space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-neutral/40">
        <div>
          <label className="block text-sm font-semibold text-brand-blue">Título</label>
          <input
            className={inputClass}
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-blue">Slug (URL)</label>
          <input className={inputClass} required value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-blue">Resumen (listado)</label>
          <textarea className={inputClass} rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-blue">Contenido (detalle)</label>
          <textarea className={inputClass} rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-blue">Imagen (URL)</label>
          <input className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
          Servicio activo (visible en web)
        </label>
        <Button type="submit" variant="primary">
          <Save size={18} /> {saved ? 'Guardado…' : 'Guardar'}
        </Button>
      </form>
    </div>
  )
}
