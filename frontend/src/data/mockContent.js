/**
 * Contenido de maqueta — placeholders hasta datos del cliente.
 * Prefijo [PLACEHOLDER] indica texto pendiente de confirmación.
 */

export const PLACEHOLDER = '[PLACEHOLDER]'

export const contact = {
  phone: `${PLACEHOLDER} +51 999 999 999`,
  email: `${PLACEHOLDER} contacto@doshmotor.com`,
  hours: `${PLACEHOLDER} Lun–Vie 8:00–18:00 · Sáb 8:00–13:00`,
  address: `${PLACEHOLDER} Av. Ejemplo 123, Lima, Perú`,
  whatsappNumber: '51999999999',
  whatsappMessage: encodeURIComponent(
    `${PLACEHOLDER} Hola DOSH motor, deseo información sobre sus servicios.`,
  ),
  directionsUrl: `${PLACEHOLDER} https://maps.google.com/`,
  /** Reemplazar con iframe embed del cliente (Compartir → Insertar mapa). */
  mapsEmbedSrc: null,
}

export const whatsappUrl = () => {
  const base = `https://wa.me/${contact.whatsappNumber.replace(/\D/g, '')}`
  return `${base}?text=${contact.whatsappMessage}`
}

export const sections = {
  home: {
    title: 'Tu vehículo en manos expertas',
    subtitle:
      `${PLACEHOLDER} Taller automotriz con diagnóstico, mantenimiento y reparación. Calidad, transparencia y atención personalizada en cada servicio.`,
    heroImage: '/images/mock/hero.jpg',
    highlights: [
      {
        title: 'Diagnóstico preciso',
        text: `${PLACEHOLDER} Equipos y técnicos calificados para identificar fallas a tiempo.`,
        icon: 'gauge',
      },
      {
        title: 'Repuestos de calidad',
        text: `${PLACEHOLDER} Trabajamos con proveedores confiables para tu tranquilidad.`,
        icon: 'wrench',
      },
      {
        title: 'Atención clara',
        text: `${PLACEHOLDER} Te explicamos el trabajo antes de autorizar cualquier reparación.`,
        icon: 'message',
      },
    ],
    ctaLabel: 'Agenda por WhatsApp',
  },
  descripcion: {
    title: 'Descripción del taller',
    lead: `${PLACEHOLDER} Somos un taller orientado al servicio integral del automóvil: desde mantenimiento preventivo hasta reparaciones complejas.`,
    body: [
      `${PLACEHOLDER} En DOSH motor S.A.C. combinamos experiencia técnica con procesos ordenados para que recibas tu vehículo en óptimas condiciones.`,
      `${PLACEHOLDER} Nuestro enfoque incluye revisión inicial, presupuesto transparente y seguimiento post-servicio.`,
    ],
    image: '/images/mock/taller.jpg',
  },
  quienesSomos: {
    title: 'Quiénes somos',
    lead: `${PLACEHOLDER} Equipo apasionado por la mecánica automotriz y el trato honesto con cada cliente.`,
    values: [
      { title: 'Compromiso', text: `${PLACEHOLDER} Cuidamos tu vehículo como si fuera nuestro.` },
      { title: 'Transparencia', text: `${PLACEHOLDER} Información clara en cada etapa del servicio.` },
      { title: 'Mejora continua', text: `${PLACEHOLDER} Capacitación constante del personal técnico.` },
    ],
    teamImage: '/images/mock/equipo.jpg',
  },
}

export const services = [
  {
    id: 1,
    slug: 'mantenimiento-preventivo',
    title: `${PLACEHOLDER} Mantenimiento preventivo`,
    excerpt: `${PLACEHOLDER} Cambio de aceite, filtros, revisión de frenos y fluidos.`,
    body: `${PLACEHOLDER} Programa de mantenimiento según kilometraje y uso del vehículo. Incluye checklist multipunto y recomendaciones por escrito.`,
    image: '/images/mock/mantenimiento.jpg',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 2,
    slug: 'frenos-y-suspension',
    title: `${PLACEHOLDER} Frenos y suspensión`,
    excerpt: `${PLACEHOLDER} Pastillas, discos, amortiguadores y alineación.`,
    body: `${PLACEHOLDER} Diagnóstico de ruidos, vibraciones y desgaste. Repuestos según disponibilidad acordada con el cliente.`,
    image: '/images/mock/frenos.jpg',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 3,
    slug: 'diagnostico-electronico',
    title: `${PLACEHOLDER} Diagnóstico electrónico`,
    excerpt: `${PLACEHOLDER} Lectura de códigos OBD y sistemas de gestión del motor.`,
    body: `${PLACEHOLDER} Identificación de fallas en sensores, inyección y sistemas auxiliares con reporte de hallazgos.`,
    image: '/images/mock/diagnostico.jpg',
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 4,
    slug: 'aire-acondicionado',
    title: `${PLACEHOLDER} Aire acondicionado`,
    excerpt: `${PLACEHOLDER} Recarga, detección de fugas y mantenimiento del circuito.`,
    body: `${PLACEHOLDER} Servicio de climatización para confort y eficiencia energética del vehículo.`,
    image: '/images/mock/aire.jpg',
    sortOrder: 4,
    isActive: true,
  },
]

export const activeServices = () => services.filter((s) => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder)

export const getServiceBySlug = (slug) => activeServices().find((s) => s.slug === slug)
