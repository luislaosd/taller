import { contact as defaultContact, sections as defaultSections, services as defaultServices } from './mockContent'

const STORAGE_KEY = 'dosh_cms_v1'

const clone = (obj) => JSON.parse(JSON.stringify(obj))

const defaultState = () => ({
  sections: clone(defaultSections),
  contact: clone(defaultContact),
  services: clone(defaultServices),
})

export function loadPersistedContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw)
    return {
      sections: { ...defaultState().sections, ...parsed.sections },
      contact: { ...defaultState().contact, ...parsed.contact },
      services: Array.isArray(parsed.services) ? parsed.services : defaultState().services,
    }
  } catch {
    return defaultState()
  }
}

export function persistContent(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function resetContentToDefaults() {
  localStorage.removeItem(STORAGE_KEY)
  return defaultState()
}

export const SECTION_KEYS = {
  home: { label: 'Home', path: 'home' },
  descripcion: { label: 'Descripción', path: 'descripcion' },
  quienesSomos: { label: 'Quiénes somos', path: 'quienes-somos' },
  contacto: { label: 'Contáctenos', path: 'contacto' },
}
