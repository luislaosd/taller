import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Save } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useSiteContent } from '../../context/SiteContentContext'

const KEY_MAP = {
  home: 'home',
  descripcion: 'descripcion',
  'quienes-somos': 'quienesSomos',
  contacto: null,
}

function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-blue">{label}</label>
      {hint && <p className="mb-1 text-xs text-text-body/60">{hint}</p>}
      <div className="mt-1">{children}</div>
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-brand-neutral px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20'

export default function AdminSectionPage() {
  const { key } = useParams()
  const { sections, contact, updateSections, updateContact } = useSiteContent()
  const sectionKey = KEY_MAP[key]
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({})

  useEffect(() => {
    if (key === 'contacto') {
      setForm({ ...contact })
    } else if (sectionKey && sections[sectionKey]) {
      setForm(JSON.parse(JSON.stringify(sections[sectionKey])))
    }
  }, [key, sectionKey, sections, contact])

  if (!KEY_MAP[key]) {
    return <Navigate to="/admin" replace />
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (key === 'contacto') {
      updateContact(form)
    } else {
      updateSections({ [sectionKey]: form })
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const title =
    key === 'contacto'
      ? 'Contáctenos'
      : key === 'quienes-somos'
        ? 'Quiénes somos'
        : key.charAt(0).toUpperCase() + key.slice(1)

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-brand-blue">Editar: {title}</h1>
      <p className="mt-1 text-sm text-text-body/70">Guardar publica los cambios en la web pública (este navegador).</p>

      <form onSubmit={handleSave} className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-brand-neutral/40">
        {key === 'home' && (
          <>
            <Field label="Título principal">
              <input className={inputClass} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Subtítulo">
              <textarea className={inputClass} rows={3} value={form.subtitle || ''} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </Field>
            <Field label="Imagen hero (URL o ruta)" hint="Ej: /images/mock/hero.jpg">
              <input className={inputClass} value={form.heroImage || ''} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} />
            </Field>
            <Field label="Texto botón WhatsApp">
              <input className={inputClass} value={form.ctaLabel || ''} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} />
            </Field>
          </>
        )}

        {key === 'descripcion' && (
          <>
            <Field label="Título">
              <input className={inputClass} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Introducción">
              <textarea className={inputClass} rows={2} value={form.lead || ''} onChange={(e) => setForm({ ...form, lead: e.target.value })} />
            </Field>
            <Field label="Párrafos (uno por línea)">
              <textarea
                className={inputClass}
                rows={5}
                value={(form.body || []).join('\n')}
                onChange={(e) => setForm({ ...form, body: e.target.value.split('\n').filter(Boolean) })}
              />
            </Field>
            <Field label="Imagen">
              <input className={inputClass} value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </Field>
          </>
        )}

        {key === 'quienes-somos' && (
          <>
            <Field label="Título">
              <input className={inputClass} value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Introducción">
              <textarea className={inputClass} rows={2} value={form.lead || ''} onChange={(e) => setForm({ ...form, lead: e.target.value })} />
            </Field>
            <Field label="Imagen equipo">
              <input className={inputClass} value={form.teamImage || ''} onChange={(e) => setForm({ ...form, teamImage: e.target.value })} />
            </Field>
            {(form.values || []).map((v, i) => (
              <div key={i} className="rounded-lg border border-brand-neutral/50 p-4 space-y-2">
                <p className="text-xs font-bold text-brand-orange">Valor {i + 1}</p>
                <input
                  className={inputClass}
                  placeholder="Título"
                  value={v.title || ''}
                  onChange={(e) => {
                    const values = [...form.values]
                    values[i] = { ...values[i], title: e.target.value }
                    setForm({ ...form, values })
                  }}
                />
                <textarea
                  className={inputClass}
                  rows={2}
                  placeholder="Descripción"
                  value={v.text || ''}
                  onChange={(e) => {
                    const values = [...form.values]
                    values[i] = { ...values[i], text: e.target.value }
                    setForm({ ...form, values })
                  }}
                />
              </div>
            ))}
          </>
        )}

        {key === 'contacto' && (
          <>
            <Field label="Teléfono">
              <input className={inputClass} value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Correo">
              <input className={inputClass} value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Horarios">
              <input className={inputClass} value={form.hours || ''} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
            </Field>
            <Field label="Dirección">
              <textarea className={inputClass} rows={2} value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </Field>
            <Field label="WhatsApp (solo números, con código país)">
              <input className={inputClass} value={form.whatsappNumber || ''} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} />
            </Field>
            <Field label="Mensaje WhatsApp (URL-encoded opcional)">
              <input className={inputClass} value={form.whatsappMessage || ''} onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })} />
            </Field>
            <Field label="URL embed mapa (src del iframe)" hint="Pegar solo la URL del src de Google Maps">
              <textarea className={inputClass} rows={2} value={form.mapsEmbedSrc || ''} onChange={(e) => setForm({ ...form, mapsEmbedSrc: e.target.value || null })} />
            </Field>
            <Field label="Enlace «Cómo llegar» (opcional)">
              <input className={inputClass} value={form.directionsUrl || ''} onChange={(e) => setForm({ ...form, directionsUrl: e.target.value })} />
            </Field>
          </>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" className="inline-flex">
            <Save size={18} /> Guardar cambios
          </Button>
          {saved && <span className="text-sm font-semibold text-green-600">Guardado ✓</span>}
        </div>
      </form>
    </div>
  )
}
