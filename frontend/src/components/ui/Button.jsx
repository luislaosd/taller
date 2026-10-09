import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variants = {
  primary: `${base} bg-brand-orange text-white hover:bg-brand-orange-soft focus-visible:outline-brand-orange`,
  secondary: `${base} border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5 focus-visible:outline-brand-blue`,
  ghost: `${base} text-brand-blue hover:bg-brand-blue/5 focus-visible:outline-brand-blue`,
  onDark: `${base} bg-white text-brand-blue hover:bg-brand-neutral/30 focus-visible:outline-white`,
}

export function Button({ variant = 'primary', className = '', ...props }) {
  return <button type="button" className={`${variants[variant]} ${className}`} {...props} />
}

export function ButtonLink({ variant = 'primary', className = '', to, ...props }) {
  return <Link to={to} className={`${variants[variant]} ${className}`} {...props} />
}

export function ExternalButtonLink({ variant = 'primary', className = '', href, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${variants[variant]} ${className}`}
      {...props}
    />
  )
}
