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

Los cambios del panel se guardan en **localStorage** del navegador y se ven en la web pública al instante. Con backend (FastAPI + Supabase) esto se reemplazará por API.

### Variables opcionales

Copiar `.env.example` → `.env.local` y ajustar:

- `VITE_ADMIN_USER`
- `VITE_ADMIN_PASSWORD`

## Producción

https://dosh-motor.vercel.app

Deploy:

```powershell
vercel deploy --prod --yes --scope luislaos-projects
```
