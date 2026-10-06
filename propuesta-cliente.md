# Propuesta de Proyecto
## Sitio web para taller — presencia digital con gestión de contenido

> **Estado del documento:** primera propuesta (v1.1 — presupuesto ajustado)  
> **Última actualización:** 2026-09-28

---

## 1. Resumen Ejecutivo

Presentamos una propuesta para el desarrollo del **sitio web de un taller mecánico / automotriz** (u otro taller de servicios), orientado a **informar**, **mostrar servicios** y **facilitar el contacto**. El sitio incluye las secciones **Home, Descripción, Quiénes somos, Servicios** (con páginas dinámicas que el cliente puede añadir o quitar) y **Contáctenos** (datos tradicionales, **WhatsApp** y **ubicación con mapa embebido de Google Maps**).

Un **panel privado con login** permitirá al personal autorizado **editar textos e imágenes** sin programar. El mapa será **embebido estático**: muestra la **ubicación real** configurada una vez; **no** usa API de Google Maps de pago ni actualización en tiempo real.

### Inversión

**Costo total: S/ 800 soles**

- Pago en **3 cuotas**: 33% inicio (S/ 264), 33% avance (S/ 264), 34% final (S/ 272)
- Incluye desarrollo según alcance, despliegue inicial, capacitación básica (**30 min**) y **15 días de garantía**
- Precio posible por **reutilización de base técnica** ya usada en otros proyectos (Vercel + Supabase) y diseño eficiente orientado al necesario para el taller
- Sin costos mensuales de licencias de software (hosting en plan gratuito o bajo costo según tráfico)

### Duración

**4 semanas** desde la aprobación del diseño hasta la entrega final en producción

### Beneficios clave

- **Presencia profesional** 24/7 en móvil y escritorio.
- **Autonomía**: el taller actualiza textos, fotos y servicios desde un panel seguro.
- **Servicios flexibles**: altas, bajas y edición de páginas de servicio sin volver a contratar desarrollo.
- **Contacto inmediato** por WhatsApp y **cómo llegar** con dirección + mapa embebido.
- **Base escalable** para futuras mejoras (más usuarios admin, formularios, SEO avanzado, etc.).

---

## 2. Alcance del proyecto

### 2.1 Funcionalidades incluidas

#### Mapa del sitio (web pública)

| Sección | Contenido | Editable desde panel |
|---------|-----------|----------------------|
| **Home** | Portada, mensaje principal, imágenes destacadas | Sí |
| **Descripción** | Presentación del taller | Sí |
| **Quiénes somos** | Historia, equipo, valores | Sí |
| **Servicios** | Listado + **página por servicio** (contenido e imágenes) | Sí; crear, editar, desactivar |
| **Contáctenos** | Teléfono, horarios, correo, **dirección**, **mapa Google Maps (embed)**, **WhatsApp** | Sí |

**Navegación:** menú principal con estas secciones; en Servicios, acceso al detalle de cada servicio activo.

#### Web pública

- Diseño **responsive** (móvil, tablet, escritorio).
- **Servicios dinámicos:** solo servicios **activos** visibles; al desactivar uno deja de publicarse (recomendado frente a borrado definitivo).
- Cada servicio: título, contenido (texto enriquecido simple), imagen principal y campos acordados en diseño.
- **Contáctenos:**
  - Datos de contacto configurables.
  - **Dirección** en texto.
  - **Mapa embebido** (iframe oficial de Google Maps): ubicación fija, sin API Maps ni refresco automático; si el taller se muda, se actualiza el enlace/código embed desde el panel.
  - Botón/enlace **WhatsApp** (abre app o web de WhatsApp).
  - Enlace opcional **“Cómo llegar”** hacia Google Maps externo.

#### Panel administrativo

- **Login** seguro (usuario/contraseña); **1 usuario administrador** incluido (usuarios adicionales: fuera de alcance v1 salvo acuerdo).
- Edición de **Home, Descripción, Quiénes somos y Contáctenos** (textos e imágenes).
- **Contáctenos:** dirección, teléfonos, horarios, WhatsApp y **código o URL de embed** del mapa.
- **Módulo Servicios:** crear, editar, ordenar y **desactivar** páginas de servicio.
- **Subida de imágenes** (secciones y servicios) con almacenamiento en la nube.
- Publicación de cambios visible en la web pública.

#### Infraestructura (incluida en la propuesta)

- Despliegue en **Vercel** (frontend + API).
- Base de datos **PostgreSQL** y almacenamiento de imágenes (**Supabase**, schema dedicado al proyecto).
- Configuración inicial de entorno de producción.

### 2.2 Funcionalidades excluidas

- Tienda online, pagos o carrito.
- Citas / reservas con calendario.
- ERP, inventario de repuestos o facturación.
- Blog con comentarios públicos.
- App móvil nativa.
- Múltiples idiomas.
- **Google Maps Platform (API)** con clave de pago, mapas personalizados en tiempo real o geolocalización del visitante.
- Varios roles de usuario (editor vs admin) — solo admin en v1.
- Recuperación automática de contraseña (puede añadirse en fase futura).

*Funcionalidades excluidas pueden presupuestarse en una fase 2.*

### 2.3 Supuestos y dependencias del cliente

- Textos iniciales, **logo** y fotografías por sección.
- **Número de WhatsApp** de atención.
- **Dirección** del taller y **enlace “Insertar mapa”** de Google Maps (compartir → insertar mapa).
- Dominio propio opcional; puede iniciarse con URL `*.vercel.app`.
- Feedback de diseño en un plazo máximo de **2 días hábiles** por ronda.

---

## 3. Tecnologías propuestas

| Capa | Tecnología |
|------|------------|
| Frontend (pública + panel) | React, Vite, Tailwind CSS |
| Backend | Python, FastAPI |
| Base de datos | PostgreSQL (Supabase) |
| Imágenes | Supabase Storage |
| Hosting | Vercel |
| Mapa | **Iframe embed** de Google Maps (sin API) |
| WhatsApp | Enlace `wa.me` configurable |

Stack alineado a proyectos ya operados por el equipo (Vercel + Supabase), lo que facilita mantenimiento y despliegue.

---

## 4. Cronograma de desarrollo

**Duración total: 4 semanas**

| Semana | Fase | Actividades principales | Entregable |
|--------|------|-------------------------|------------|
| **1** | Diseño + base | Estilo visual acordado, proyecto, BD, login | Diseño aprobado + acceso admin |
| **2** | Web pública | Home, Descripción, Quiénes somos, estructura responsive | Secciones fijas publicadas |
| **3** | Servicios + panel | Páginas dinámicas, imágenes, gestión desde panel | Servicios administrables |
| **4** | Contacto y cierre | Contáctenos, WhatsApp, mapa embed, pruebas, despliegue, capacitación | Entrega final |

**Hitos de pago alineados:** 1ra cuota al inicio (post-aprobación diseño); 2da cuota al ~50% (demo con panel y servicios); 3ra cuota a entrega en producción.

---

## 5. Requerimientos consolidados

| ID | Requerimiento | Prioridad |
|----|---------------|-----------|
| R-001 | Web pública informativa del taller | Alta |
| R-002 | Diseño responsive | Alta |
| R-003 | Gestión y visualización de imágenes | Alta |
| R-004 | Login panel administrativo | Alta |
| R-005 | Edición de textos desde panel | Alta |
| R-006 | Edición de imágenes desde panel | Alta |
| R-007 | Sección Home editable | Alta |
| R-008 | Sección Descripción editable | Alta |
| R-009 | Sección Quiénes somos editable | Alta |
| R-010 | Servicios dinámicos (alta, edición, baja/desactivación) | Alta |
| R-011 | Contáctenos con datos tradicionales | Alta |
| R-012 | WhatsApp configurable | Alta |
| R-013 | Menú acorde a secciones y servicios activos | Media |
| R-014 | Dirección visible en Contáctenos | Alta |
| R-015 | Mapa Google Maps **embebido** (ubicación real, estático) | Alta |
| R-016 | Actualizar dirección y embed del mapa desde panel | Media |

---

## 6. Criterios de aceptación

- Visitante navega **Home, Descripción, Quiénes somos, Servicios y Contáctenos** sin login.
- Admin crea un servicio con contenido e imagen; aparece en listado y URL propia; al desactivarlo deja de mostrarse.
- Admin edita textos e imágenes de secciones fijas; cambios visibles en la web pública.
- **Contáctenos** muestra dirección, mapa embed con ubicación correcta y enlace WhatsApp funcional en móvil y escritorio.
- Mapa **no requiere** API key de Google Maps ni actualización automática de posición.
- Capacitación realizada y documentación mínima de uso del panel entregada.

---

## 7. Inversión y forma de pago

### 7.1 Valor de la inversión

**Inversión total: S/ 800 soles**

**Comparación orientativa:**

- Plantillas WordPress + plugins premium: S/ 80–200/mes + configuración inicial
- Desarrollo a medida con CMS completo (mercado): S/ 3,000–6,000
- **Esta propuesta:** sitio con panel propio y funcionalidades acordadas, **pago único S/ 800**, sin cuota mensual de plataforma CMS

**¿Qué incluye la tasación?**

| Componente | Valor estimado individual | Incluido |
|------------|---------------------------|----------|
| Diseño UI/UX responsive (plantilla adaptada) | S/ 120 | ✅ |
| Web pública (5 secciones) | S/ 180 | ✅ |
| Servicios dinámicos + URLs | S/ 180 | ✅ |
| Panel admin + login + imágenes | S/ 220 | ✅ |
| Backend, BD y despliegue (Vercel + Supabase) | S/ 120 | ✅ |
| WhatsApp + mapa embed + contacto | S/ 70 | ✅ |
| Testing y ajustes | S/ 60 | ✅ |
| Documentación y capacitación (30 min) | S/ 40 | ✅ |
| 15 días de garantía | S/ 30 | ✅ |
| **Valor referencial total** | **S/ 1,020** | **Por S/ 800** |

**Descuento referencial: S/ 220 (~22%)**

### 7.2 Forma de pago

| Cuota | Monto | Momento | Entregables asociados |
|-------|-------|---------|------------------------|
| **1ra** | **S/ 264** (33%) | Inicio del proyecto | Acuerdo + diseño UI/UX aprobado |
| **2da** | **S/ 264** (33%) | ~50% avance | Demo: panel, secciones fijas y al menos un servicio dinámico |
| **3ra** | **S/ 272** (34%) | Entrega final | Sistema en producción, capacitación y documentación |

**Total: S/ 800 soles**

### 7.3 Incluido sin costo adicional en el precio

- Desarrollo según alcance de esta propuesta
- Despliegue inicial en Vercel y configuración Supabase (plan free o equivalente)
- SSL en hosting Vercel
- **15 días de garantía** post-entrega (corrección de bugs del alcance acordado)
- Capacitación básica del panel (**30 minutos**)
- Documentación de uso del panel
- Código fuente y acceso al repositorio Git acordado

### 7.4 No incluido en el precio

- **Dominio** (~S/ 50–80/año)
- Costos por **tráfico alto** o planes de pago de Vercel/Supabase si superan límites gratuitos (habitualmente bajo para un taller local)
- Nuevas funcionalidades fuera del alcance
- Redacción profesional de textos o sesión fotográfica
- Creación de cuenta Google Maps / Google Business (el embed usa enlace que el cliente obtiene de Google Maps)

**Nota hosting:** para tráfico típico de un taller, el **plan gratuito** de Vercel y Supabase suele ser suficiente al inicio (~**S/ 0–50/mes** si solo se paga dominio o upgrades menores).

---

## 8. Garantía

- **15 días** después de la entrega final para corrección de errores del alcance acordado.
- No incluye cambios de diseño mayores ni funcionalidades nuevas.

---

## 9. Riesgos y mitigación

| Riesgo | Mitigación |
|--------|------------|
| Contenido inicial incompleto | Checklist al inicio; publicación por fases |
| Imágenes muy pesadas | Límites de tamaño y compresión en subida |
| Mapa incorrecto | Validación con cliente del embed antes de go-live |
| Cambio de dirección del taller | Actualización del embed desde panel (sin costo de API) |

---

## 10. Próximos pasos

1. **Aprobar o comentar** esta propuesta v1 (alcance y monto).
2. Confirmar **nombre comercial del taller** y referencias visuales (webs que gusten).
3. Enviar **logo, textos base, fotos, WhatsApp y enlace embed** del mapa.
4. Firma de acuerdo y **1ra cuota** → inicio Semana 1 (diseño).

---

## Anexo — Glosario

| Término | Definición |
|---------|------------|
| **Panel admin** | Área privada tras login para gestionar el sitio. |
| **Servicio (página dinámica)** | Entrada bajo menú Servicios con URL y contenido propios. |
| **Mapa embebido** | Iframe de Google Maps; muestra un punto fijo configurado por el taller. |
| **Desactivar servicio** | Oculta el servicio del sitio sin borrar historial en base de datos. |
