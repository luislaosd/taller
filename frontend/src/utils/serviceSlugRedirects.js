/** Actualiza redirecciones cuando un servicio cambia de slug (maqueta / localStorage). */
export function mergeSlugRedirectsOnChange(prevRedirects, prevServices, nextServices) {
  const redirects = { ...(prevRedirects || {}) }
  for (const s of nextServices) {
    const old = (prevServices || []).find((x) => x.id === s.id)
    if (!old || old.slug === s.slug) continue
    redirects[old.slug] = s.slug
    for (const [key, target] of Object.entries(redirects)) {
      if (target === old.slug) redirects[key] = s.slug
    }
  }
  return redirects
}

export function getServiceSlugRedirectTarget(slug, redirects) {
  if (!slug || !redirects) return null
  return redirects[slug] || null
}