import { useEffect } from 'react'
import { useSiteContent } from '../../context/SiteContentContext'
import { getSiteLogoUrl } from '../../utils/siteLogo'

/** Sincroniza favicon con el logo configurado en Home (admin). */
export default function SiteBrandingHead() {
  const { sections } = useSiteContent()
  const logoUrl = getSiteLogoUrl(sections?.home)

  useEffect(() => {
    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = logoUrl
    if (logoUrl.endsWith('.png')) link.type = 'image/png'
    else if (/\.jpe?g$/i.test(logoUrl)) link.type = 'image/jpeg'
    else link.removeAttribute('type')
  }, [logoUrl])

  return null
}