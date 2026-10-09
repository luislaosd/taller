# Plan de implementación — Taller web (v1)

Alineado al cronograma de [propuesta-cliente.md](../propuesta-cliente.md) §4 (4 semanas). Marcar tareas al completar.

**Antes de semana 1:** resolver ítems críticos en [PENDIENTES.md](./PENDIENTES.md) (mínimo P-01, P-03, P-04, P-10, P-11, P-12, P-13).

---

## Semana 1 — Diseño + base

- [x] Crear monorepo `frontend/` + `backend/` y repos Git/Vercel (P-11, P-12) — *frontend maqueta; backend pendiente*
- [ ] Supabase: schema, bucket Storage, variables entorno
- [ ] Backend: FastAPI skeleton, health, CORS, conexión BD
- [ ] Migraciones: `admin_users`, `site_sections`, `services` (ajustar tras P-03)
- [ ] Auth: login admin, protección rutas `/api/admin/*`
- [ ] Bootstrap usuario admin (P-13)
- [x] Frontend: Vite + Tailwind + router público/admin shell
- [x] Pantalla login admin — *maqueta demo sin API*
- [ ] Aprobación estilo visual con cliente (propuesta semana 1)

**Entregable:** diseño acordado + login admin funcional en dev/staging.

---

## Semana 2 — Web pública (secciones fijas)

- [ ] API GET secciones públicas
- [x] Páginas: Home, Descripción, Quiénes somos (layout responsive) — *datos mock en `frontend/src/data/mockContent.js`*
- [x] Navbar + footer con menú (Req 11)
- [ ] Panel: formularios edición Home, Descripción, Quiénes somos
- [ ] Upload imágenes para secciones fijas (según P-03)
- [x] Contenido seed o placeholders hasta textos del cliente

**Entregable:** secciones fijas publicadas y editables.

---

## Semana 3 — Servicios + panel

- [ ] API CRUD servicios + `is_active` + `sort_order`
- [x] Página pública listado `/servicios`
- [x] Página pública detalle `/servicios/:slug`
- [ ] Panel: listado admin, crear/editar/desactivar, orden (P-06)
- [ ] Imagen principal por servicio
- [ ] Menú: solo servicios activos

**Entregable:** servicios administrables end-to-end.

---

## Semana 4 — Contacto, mapa, cierre

- [x] Sección Contáctenos pública (teléfono, horarios, email, dirección) — *placeholders*
- [x] WhatsApp configurable (P-09) — *enlace mock; panel pendiente*
- [ ] Mapa embed + edición en panel (Req 10) — *UI con placeholder iframe*
- [ ] Enlace «Cómo llegar» si aplica (P-08)
- [ ] Pruebas manuales criterios [requirements.md](./requirements.md) § global
- [ ] Deploy producción Vercel
- [ ] Documentación uso panel (markdown corto)
- [ ] Capacitación 30 min con cliente

**Entregable:** producción + checklist aceptación firmada.

---

## QA mínimo (sin inventar tests E2E salvo acuerdo)

- [x] Responsive: 375px, 768px, 1280px — *revisión manual vía build + layout Tailwind*
- [ ] Login fallido / exitoso
- [ ] Servicio desactivado → 404 o redirect en detalle
- [ ] WhatsApp abre en Android/iOS simulado o device real
- [ ] iframe mapa carga con embed real del cliente

---

## Hitos de pago (referencia negocio — no bloquea dev)

| Cuota | Hito propuesta |
|-------|----------------|
| 1ra | Diseño aprobado + inicio |
| 2da | Demo ~50%: panel + secciones fijas + ≥1 servicio |
| 3ra | Producción + capacitación + docs |
