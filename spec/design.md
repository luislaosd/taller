# Diseño técnico — Sitio web taller (v1)

**Referencia:** [propuesta-cliente.md](../propuesta-cliente.md), [requirements.md](./requirements.md).

## Visión general

Monorepo recomendado (mismo patrón que gimnasio / perucollector / papurri del workspace):

```
taller/                          ← repositorio Git (nombre: P-11)
├── frontend/                    → Vercel: proyecto frontend (P-12)
└── backend/                     → Vercel: proyecto API (P-12)
```

Stack obligatorio según propuesta §3:

| Capa | Tecnología |
|------|------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Python, FastAPI (+ adaptador serverless Vercel, ej. Mangum) |
| BD | PostgreSQL (Supabase), schema dedicado |
| Imágenes | Supabase Storage |
| Mapa | iframe embed Google Maps (sin API) |
| WhatsApp | URL configurable (`wa.me`) |

## Arquitectura lógica

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (React) — rutas públicas + /admin/*         │
├─────────────────────────────────────────────────────────┤
│  Home | Descripción | Quiénes somos | Servicios | Contacto │
└───────────────────────────┬─────────────────────────────┘
                            │ HTTPS + JSON (REST)
                            │ VITE_API_URL
┌───────────────────────────▼─────────────────────────────┐
│  BACKEND (FastAPI)                                        │
│  auth | pages | services | contact | uploads              │
└───────────────────────────┬─────────────────────────────┘
                            │
        ┌───────────────────┴───────────────────┐
        │  Supabase PostgreSQL (schema TBD)      │
        │  Supabase Storage (bucket imágenes)    │
        └────────────────────────────────────────┘
```

## Rutas frontend (propuesta)

Slugs exactos: **confirmar P-02**. Propuesta mínima sugerida (solo referencia hasta aprobación):

| Ruta pública | Sección |
|--------------|---------|
| `/` | Home |
| `/descripcion` | Descripción |
| `/quienes-somos` | Quiénes somos |
| `/servicios` | Listado servicios activos |
| `/servicios/:slug` | Detalle Página_Servicio |
| `/contacto` | Contáctenos |

| Ruta admin | Uso |
|------------|-----|
| `/admin/login` | Login |
| `/admin` | Dashboard o redirect a editor |
| `/admin/secciones/:key` | Edición Home, descripcion, quienes-somos, contacto |
| `/admin/servicios` | CRUD + orden + activar/desactivar |

## Modelo de datos (borrador)

Entidades inferidas **solo** de la propuesta. Ajustar tras cerrar PENDIENTES.

### `admin_users` (v1: una fila esperada)

| Campo | Notas |
|-------|--------|
| id | PK |
| email o username | Login |
| password_hash | |
| created_at | |

### `site_sections` (contenido fijo)

Un registro por sección: `home`, `descripcion`, `quienes_somos`, `contacto`.

| Campo | Notas |
|-------|--------|
| key | enum/string |
| title | opcional |
| body | texto / JSON según P-04 |
| metadata | JSON para imágenes destacadas, horarios, teléfonos, etc. (estructura **P-03**) |

### `contact_settings` (alternativa: solo metadata en `site_sections` contacto)

| Campo | Notas |
|-------|--------|
| phone | |
| email | |
| hours | texto o JSON |
| address_text | |
| whatsapp_number | sin `+` o normalizado para `wa.me` |
| whatsapp_message | opcional P-09 |
| maps_embed_html o maps_embed_url | iframe src o paste embed |
| directions_url | opcional P-08 |

> Puede modelarse como parte de `site_sections` para `contacto` en lugar de tabla separada.

### `services`

| Campo | Notas |
|-------|--------|
| id | PK |
| title | |
| slug | único, URL |
| body | contenido |
| image_url | imagen principal |
| sort_order | P-06 |
| is_active | desactivar = false |
| created_at, updated_at | |

## API REST (borrador)

Prefijo sugerido: `/api`. Autenticación en rutas admin excepto login.

### Público (sin auth)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/sections/:key` | Contenido sección fija publicada |
| GET | `/api/services` | Lista servicios `is_active=true`, ordenados |
| GET | `/api/services/:slug` | Detalle servicio activo |
| GET | `/api/contact` | Datos contacto + embed mapa (si no van en section) |

### Admin (auth requerida)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login` | Token/sesión |
| PUT | `/api/sections/:key` | Actualizar sección |
| GET/POST/PUT/PATCH | `/api/admin/services` | CRUD servicios |
| PATCH | `/api/admin/services/:id/toggle` | Activar/desactivar (si no va en PUT) |
| POST | `/api/uploads/image` | Subida → Storage, retorna URL |

Contratos JSON exactos: definir al cerrar P-03, P-04, P-05.

## Mapa Google (implementación)

1. Admin pega **iframe embed** de Google Maps (Compartir → Insertar mapa) o solo URL `src`.
2. Backend **sanitiza**: solo permitir hosts Google Maps conocidos; guardar `src` o HTML acotado.
3. Frontend renderiza `<iframe>` responsive (aspect-ratio CSS).
4. **No** cargar Maps JavaScript API ni geolocation del navegador.

## WhatsApp (implementación)

- Construir URL: `https://wa.me/{numero}`; si hay mensaje: `?text={encodeURIComponent(msg)}`.
- Validar número en backend al guardar (formato internacional sin espacios).

## Imágenes

- Upload vía backend → Supabase Storage (patrón perucollector).
- Límites de tamaño/formato: **P-14**.
- URLs públicas o signed según bucket; propuesta implica visualización pública en web.

## Seguridad (mínimo v1)

- Contraseñas hasheadas (bcrypt/argon2).
- JWT o cookie httpOnly (equipo elige; alinear con otros proyectos).
- CORS: `FRONTEND_URL` + localhost dev.
- Rate limit login (recomendado, no exigido en propuesta).
- Sin recuperación de contraseña en v1.

## Variables de entorno

### Backend (`.env.example`)

| Variable | Uso |
|----------|-----|
| `DATABASE_URL` | Supabase pooler |
| `SECRET_KEY` | JWT |
| `FRONTEND_URL` | CORS |
| `SUPABASE_URL` | Storage |
| `SUPABASE_ANON_KEY` o service role | Upload (definir según políticas bucket) |
| `SUPABASE_BUCKET` | ej. `taller` o `media` (**confirmar**) |

### Frontend

| Variable | Uso |
|----------|-----|
| `VITE_API_URL` | URL API en Vercel |

## Despliegue

- Dos proyectos Vercel (frontend + API), `vercel.json` en cada uno.
- Migraciones: Alembic apuntando a schema dedicado (patrón gimnasio/perucollector con `search_path`).
- SSL: incluido Vercel.

## Riesgos técnicos (propuesta §9)

| Riesgo | Acción dev |
|--------|------------|
| Imágenes pesadas | Validar tamaño en upload; opcional compresión server-side |
| Embed mapa inválido | Validación al guardar; preview en admin |
| Contenido incompleto | Seed opcional vacío; no bloquear deploy |

## Referencia de implementación en workspace

Reutilizar convenciones de:

- `perucollector/` — FastAPI + Vercel + Supabase Storage + admin React
- `gimnasio/` — schema PostgreSQL separado, Alembic
- `papurri/web_store/web_store/` — CMS-like patterns si aplica

No copiar dominio de negocio; solo infra y patrones.
