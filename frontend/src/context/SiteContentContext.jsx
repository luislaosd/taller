import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { loadPersistedContent, persistContent, resetContentToDefaults } from '../data/contentStore'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => loadPersistedContent())

  const saveAll = useCallback((next) => {
    setContent(next)
    persistContent(next)
  }, [])

  const updateSections = useCallback(
    (patch) => {
      setContent((prev) => {
        const next = { ...prev, sections: { ...prev.sections, ...patch } }
        persistContent(next)
        return next
      })
    },
    [],
  )

  const updateContact = useCallback((patch) => {
    setContent((prev) => {
      const next = { ...prev, contact: { ...prev.contact, ...patch } }
      persistContent(next)
      return next
    })
  }, [])

  const updateServices = useCallback((services) => {
    setContent((prev) => {
      const next = { ...prev, services }
      persistContent(next)
      return next
    })
  }, [])

  const resetToDefaults = useCallback(() => {
    const fresh = resetContentToDefaults()
    setContent(fresh)
    return fresh
  }, [])

  const activeServices = useMemo(
    () =>
      [...content.services]
        .filter((s) => s.isActive)
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [content.services],
  )

  const value = useMemo(
    () => ({
      content,
      sections: content.sections,
      contact: content.contact,
      services: content.services,
      activeServices,
      updateSections,
      updateContact,
      updateServices,
      saveAll,
      resetToDefaults,
    }),
    [content, activeServices, updateSections, updateContact, updateServices, saveAll, resetToDefaults],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContent debe usarse dentro de SiteContentProvider')
  return ctx
}
