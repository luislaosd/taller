/**
 * Normaliza lo que pega el cliente (enlace, iframe o src embed) a una URL usable en <iframe>.
 * Los enlaces tipo /maps/place/... sin output=embed suelen mostrar «Google rechazó la conexión».
 */
export function normalizeMapsEmbedSrc(raw) {
  if (raw == null) return null
  let s = String(raw).trim()
  if (!s) return null

  const iframeSrc = s.match(/<iframe[^>]+src=["']([^"']+)["']/is)
  if (iframeSrc) s = iframeSrc[1].trim()

  s = s.replace(/&amp;/g, '&')

  if (s.startsWith('//')) s = `https:${s}`
  if (!/^https?:\/\//i.test(s)) return null

  s = s.replace(/^http:\/\//i, 'https://')

  if (/google\.[a-z.]+\/maps\/embed/i.test(s)) {
    return s
  }

  if (/output=embed/i.test(s) && /google\.[a-z.]*\/maps/i.test(s)) {
    return s
  }

  if (/^(https:\/\/)?(maps\.)?app\.goo\.gl\//i.test(s) || /^https:\/\/goo\.gl\/maps\//i.test(s)) {
    return null
  }

  try {
    const url = new URL(s)
    if (!url.hostname.includes('google')) return s

    const coord = s.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?)z)?/)
    if (coord) {
      const z = coord[3] ? Math.round(parseFloat(coord[3])) : 15
      const q = `${coord[1]},${coord[2]}`
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${z}&hl=es&output=embed`
    }

    const placeMatch = url.pathname.match(/\/maps\/place\/([^/]+)/)
    if (placeMatch) {
      const place = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '))
      return `https://www.google.com/maps?q=${encodeURIComponent(place)}&hl=es&output=embed`
    }

    const q = url.searchParams.get('q') || url.searchParams.get('query')
    if (q) {
      const z = url.searchParams.get('z') || '15'
      return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=${z}&hl=es&output=embed`
    }
  } catch {
    return s
  }

  return s
}

export function mapsEmbedInputHint(raw) {
  const n = normalizeMapsEmbedSrc(raw)
  if (!n && raw?.trim()) {
    if (/goo\.gl|maps\.app\.goo/i.test(raw)) {
      return 'Abre el enlace corto en el navegador, luego en Google Maps usa Compartir → Insertar un mapa.'
    }
    return 'No se pudo convertir; use la URL del botón «Insertar un mapa» (…/maps/embed?pb=…).'
  }
  return null
}