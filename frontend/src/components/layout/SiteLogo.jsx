import { useSiteContent } from '../../context/SiteContentContext'
import { getSiteLogoUrl } from '../../utils/siteLogo'

const VARIANT_CLASS = {
  nav: 'h-12 w-auto max-w-[200px] object-contain object-left sm:h-14 sm:max-w-[220px] md:h-16 md:max-w-[240px]',
  footer: 'h-12 w-auto max-w-[180px] object-contain object-left brightness-110',
  admin: 'h-10 w-auto max-w-[160px] object-contain object-left',
  login: 'mx-auto h-14 w-auto max-w-[200px] object-contain',
}

export default function SiteLogo({ variant = 'nav', className = '', alt = 'DOSH motor S.A.C.' }) {
  const { sections } = useSiteContent()
  const src = getSiteLogoUrl(sections?.home)
  const classes = [VARIANT_CLASS[variant] || VARIANT_CLASS.nav, className].filter(Boolean).join(' ')

  return <img src={src} alt={alt} className={classes} loading="eager" decoding="async" />
}