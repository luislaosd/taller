import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { loadPersistedContent, persistContent, resetContentToDefaults } from '../data/contentStore'
import { useCmsApi } from '../config/apiConfig'
import {
  fetchPublicContent,
  syncServicesApi,
  updateContactApi,
  updateSectionApi,
} from '../services/cmsApi'

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => loadPersistedContent())
  const [loading, setLoading] = useState(useCmsApi)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    if (!useCmsApi) return
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const data = await fetchPublicContent()
        if (!cancelled) {
          setContent({
            sections: data.sections,
            contact: data.contact,
            services: data.services,
          })
          setLoadError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e.message)
          console.error('CMS API:', e)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const saveAll = useCallback((next) => {
    setContent(next)
    if (!useCmsApi) persistContent(next)
  }, [])

  const updateSections = useCallback(async (patch) => {
    if (useCmsApi) {
      await Promise.all(
        Object.entries(patch).map(([key, data]) => updateSectionApi(key, data)),
      )
    }
    setContent((prev) => {
      const next = { ...prev, sections: { ...prev.sections, ...patch } }
      if (!useCmsApi) persistContent(next)
      return next
    })
  }, [])

  const updateContact = useCallback(async (patch) => {
    if (useCmsApi) {
      await updateContactApi(patch)
    }
    setContent((prev) => {
      const next = { ...prev, contact: { ...prev.contact, ...patch } }
      if (!useCmsApi) persistContent(next)
      return next
    })
  }, [])

  const updateServices = useCallback(async (services) => {
    let list = services
    if (useCmsApi) {
      list = await syncServicesApi(services)
    }
    setContent((prev) => {
      const next = { ...prev, services: list }
      if (!useCmsApi) persistContent(next)
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
      loading,
      loadError,
      cmsOnline: useCmsApi && !loadError,
      updateSections,
      updateContact,
      updateServices,
      saveAll,
      resetToDefaults,
    }),
    [
      content,
      activeServices,
      loading,
      loadError,
      updateSections,
      updateContact,
      updateServices,
      saveAll,
      resetToDefaults,
    ],
  )

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext)
  if (!ctx) throw new Error('useSiteContent debe usarse dentro de SiteContentProvider')
  return ctx
}
