# Requerimientos — Sitio web taller (v1)

**Referencia:** [propuesta-cliente.md](../propuesta-cliente.md) (v1.1, 2026-09-28).

## Introducción

Sistema web para un **taller de servicios** (ej. mecánico/automotriz): sitio **informativo** público y **panel administrativo** con login para editar textos e imágenes sin código. Incluye **servicios dinámicos** (páginas administrables), **contacto** (datos tradicionales + WhatsApp) y **ubicación** (dirección + mapa Google Maps embebido, sin API de Maps).

## Glosario

| Término | Definición |
|---------|------------|
| **Web_Pública** | Sitio visible sin autenticación |
| **Panel_Admin** | Interfaz privada tras login |
| **Sección_Fija** | Home, Descripción, Quiénes somos, Contáctenos |
| **Página_Servicio** | Entrada dinámica bajo Servicios con URL propia |
| **Servicio_Activo** | Página de servicio visible en menú y listados |
| **Servicio_Inactivo** | Desactivado; no se muestra en la web pública (datos pueden persistir en BD) |
| **Mapa_Embed** | `iframe` de Google Maps con ubicación fija; sin API Maps ni refresco en tiempo real |
| **Administrador** | Único rol en v1; usuario/contraseña |

## Fuera de alcance (v1)

No implementar (propuesta §2.2): e-commerce, citas/reservas, ERP/inventario, blog con comentarios, app nativa, i18n, Google Maps Platform (API de pago), geolocalización del visitante, múltiples roles, recuperación automática de contraseña.

---

## Requerimiento 1 — Web pública informativa (R-001)

**Historia:** Como visitante, quiero ver información del taller, para conocer servicios y contacto.

### Criterios de aceptación

1. LA Web_Pública DEBERÁ exponer las secciones: **Home**, **Descripción**, **Quiénes somos**, **Servicios**, **Contáctenos**.
2. LA Web_Pública DEBERÁ ser accesible **sin login**.
3. EL menú principal DEBERÁ enlazar las Secciones_Fijas y el listado de **Servicios_Activos**.

---

## Requerimiento 2 — Diseño responsive (R-002)

**Historia:** Como visitante, quiero usar el sitio en móvil o escritorio.

### Criterios de aceptación

1. LA Web_Pública DEBERÁ ser usable en **móvil, tablet y escritorio** (layout adaptable).
2. EL Mapa_Embed y los botones de contacto (incl. WhatsApp) DEBERÁN ser usables en móvil y escritorio.

---

## Requerimiento 3 — Imágenes (R-003, R-006)

**Historia:** Como administrador, quiero subir y cambiar imágenes; como visitante, quiero verlas en el sitio.

### Criterios de aceptación

1. EL Panel_Admin DEBERÁ permitir **subir** imágenes para Secciones_Fijas y Páginas_Servicio (alcance exacto de campos: ver [PENDIENTES.md](./PENDIENTES.md) P-03, P-05).
2. LAS imágenes DEBERÁN almacenarse en **almacenamiento en la nube** (propuesta: Supabase Storage).
3. LA Web_Pública DEBERÁ mostrar las imágenes publicadas asociadas a cada sección/servicio.

---

## Requerimiento 4 — Autenticación del panel (R-004)

**Historia:** Como administrador, quiero acceder a un área privada.

### Criterios de aceptación

1. EL Panel_Admin DEBERÁ requerir **login** con usuario y contraseña.
2. LA sesión DEBERÁ ser **segura** (mecanismo concreto: ver design.md; propuesta no detalla JWT vs sesión).
3. EN v1 DEBERÁ existir **un único usuario administrador** (usuarios adicionales: fuera de alcance salvo acuerdo).
4. LOS visitantes NO DEBERÁN acceder al Panel_Admin sin credenciales válidas.

---

## Requerimiento 5 — Edición de textos (R-005)

**Historia:** Como administrador, quiero editar textos del sitio sin tocar código.

### Criterios de aceptación

1. EL Panel_Admin DEBERÁ permitir editar contenidos textuales de **Home, Descripción, Quiénes somos, Contáctenos** y de cada **Página_Servicio**.
2. EL tipo de editor (texto plano vs enriquecido simple) DEBERÁ alinearse con la decisión **P-04** en PENDIENTES.md.
3. LOS cambios guardados DEBERÁN reflejarse en la Web_Pública según el flujo acordado (**P-15**).

---

## Requerimiento 6 — Secciones fijas editables (R-007, R-008, R-009)

**Historia:** Como administrador, quiero mantener actualizadas las páginas institucionales.

### Criterios de aceptación

1. **Home:** portada, mensaje principal, imágenes destacadas — editables desde panel (detalle de campos: P-03).
2. **Descripción:** presentación del taller — editable.
3. **Quiénes somos:** historia, equipo, valores — editable (contenido provisto por cliente).

---

## Requerimiento 7 — Servicios dinámicos (R-010)

**Historia:** Como administrador, quiero añadir, editar y quitar servicios del sitio.

### Criterios de aceptación

1. EL Panel_Admin DEBERÁ permitir **crear** una Página_Servicio con al menos: **título**, **contenido**, **imagen principal** (propuesta §2.1).
2. EL Panel_Admin DEBERÁ permitir **editar** servicios existentes.
3. EL Panel_Admin DEBERÁ permitir **desactivar** un servicio; al desactivar, NO DEBERÁ mostrarse en menú ni listados públicos (recomendación propuesta: desactivar vs borrar — P-07).
4. EL Panel_Admin DEBERÁ permitir **ordenar** servicios en listados (mecanismo: P-06).
5. CADA Servicio_Activo DEBERÁ tener **URL propia** enlazable desde el listado de Servicios.
6. SOLO los Servicios_Activos DEBERÁN aparecer en la Web_Pública.

---

## Requerimiento 8 — Contáctenos (R-011, R-014)

**Historia:** Como visitante, quiero datos de contacto y ubicación.

### Criterios de aceptación

1. LA sección **Contáctenos** DEBERÁ mostrar datos configurables: teléfono, horarios, correo y otros acordados con el cliente (propuesta).
2. LA **dirección** DEBERÁ mostrarse en **texto claro**.
3. EL Panel_Admin DEBERÁ permitir editar los datos de contacto y la dirección.

---

## Requerimiento 9 — WhatsApp (R-012)

**Historia:** Como visitante, quiero contactar por WhatsApp rápidamente.

### Criterios de aceptación

1. CONTÁCTENOS DEBERÁ incluir botón o enlace **WhatsApp** que abra la app o web de WhatsApp (`wa.me` o equivalente).
2. EL número/enlace DEBERÁ ser **configurable** desde el Panel_Admin.
3. SI se define mensaje prellenado (P-09), EL enlace DEBERÁ incluirlo; si no, enlace simple al número.

---

## Requerimiento 10 — Mapa embebido (R-015, R-016)

**Historia:** Como visitante, quiero ver dónde está el taller; como admin, quiero actualizar mapa y dirección si cambia.

### Criterios de aceptación

1. CONTÁCTENOS DEBERÁ mostrar un **Mapa_Embed** (iframe oficial de Google Maps) con la **ubicación real** del taller.
2. EL mapa NO DEBERÁ usar **Google Maps Platform API** de pago ni **actualización automática** de posición en tiempo real.
3. EL Panel_Admin DEBERÁ permitir actualizar **código o URL de embed** del mapa (propuesta).
4. EL Panel_Admin DEBERÁ permitir actualizar la **dirección** en texto.
5. SI se incluye enlace **«Cómo llegar»** (opcional, P-08), DEBERÁ abrir Google Maps externo.

---

## Requerimiento 11 — Navegación (R-013)

**Historia:** Como visitante, quiero encontrar secciones y servicios fácilmente.

### Criterios de aceptación

1. EL menú DEBERÁ reflejar Home, Descripción, Quiénes somos, Servicios y Contáctenos.
2. EN Servicios, EL visitante DEBERÁ poder acceder al detalle de cada **Servicio_Activo**.

---

## Requerimiento 12 — Infraestructura y entrega

**Historia:** Como equipo técnico, quiero desplegar según la propuesta.

### Criterios de aceptación

1. EL sistema DEBERÁ desplegarse en **Vercel** (frontend + API).
2. LA base de datos DEBERÁ ser **PostgreSQL en Supabase** con schema dedicado (nombre: P-10).
3. DEBERÁ entregarse **documentación mínima** de uso del panel y **capacitación ~30 min** (propuesta §7.3).
4. DEBERÁ aplicarse **garantía 15 días** solo para bugs del alcance acordado (no nuevas features).

---

## Trazabilidad propuesta → requerimientos

| ID propuesta | Requerimiento doc |
|--------------|-------------------|
| R-001 | Req 1 |
| R-002 | Req 2 |
| R-003, R-006 | Req 3 |
| R-004 | Req 4 |
| R-005 | Req 5 |
| R-007–R-009 | Req 6 |
| R-010 | Req 7 |
| R-011, R-014 | Req 8 |
| R-012 | Req 9 |
| R-015, R-016 | Req 10 |
| R-013 | Req 11 |

---

## Criterios de aceptación globales (propuesta §6)

Checklist de entrega:

- [ ] Visitante recorre Home, Descripción, Quiénes somos, Servicios y Contáctenos sin login.
- [ ] Admin crea servicio con contenido e imagen → listado + URL propia; al desactivar, desaparece del sitio.
- [ ] Admin edita textos/imágenes de secciones fijas → cambios visibles en web pública.
- [ ] Contáctenos: dirección, mapa embed correcto, WhatsApp funcional (móvil y desktop).
- [ ] Mapa sin API key de Google Maps ni refresco automático de posición.
- [ ] Capacitación y documentación mínima del panel entregadas.
