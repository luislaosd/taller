# DOSH motor — frontend (maqueta)

## Desarrollo local

```powershell
npm install
npm run dev
```

## Admin (maqueta sin backend)

| Campo | Valor por defecto |
|-------|-------------------|
| Usuario | `admin` |
| Contraseña | `DoshMotor2026` |

URL: `/admin/login`

Con **`VITE_API_URL`** configurada, el panel guarda en **Supabase** vía API. Sin API, fallback **localStorage** (maqueta).

### Variables locales

Copiar `.env.example` → `.env.local`:

- `VITE_API_URL` — ej. `http://127.0.0.1:8000` o `https://dosh-motor-api.vercel.app`
- `VITE_ADMIN_USER` / `VITE_ADMIN_PASSWORD` — solo maqueta sin API

## Producción

| Servicio | URL |
|----------|-----|
| Web | https://dosh-motor.vercel.app |
| API | https://dosh-motor-api.vercel.app |

Deploy:

```powershell
vercel deploy --prod --yes --scope luislaos-projects
```
