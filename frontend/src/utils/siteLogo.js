export const DEFAULT_SITE_LOGO = '/logo_home.png'

export function getSiteLogoUrl(home) {
  const src = (home?.logo || '').trim()
  return src || DEFAULT_SITE_LOGO
}