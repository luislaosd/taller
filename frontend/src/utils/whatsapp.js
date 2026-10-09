export function buildWhatsappUrl(contact) {
  const base = `https://wa.me/${String(contact.whatsappNumber || '').replace(/\D/g, '')}`
  const msg = contact.whatsappMessage
  if (msg) return `${base}?text=${msg}`
  return base
}
