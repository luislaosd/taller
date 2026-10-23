# Configuración DOSH motor

| Archivo | Uso |
|---------|-----|
| `client-database.example.md` | Plantilla Supabase (sin secretos) |
| `client-database.local.md` | Credenciales reales — **no commitear** |

## Bootstrap BD (primera vez)

```powershell
cd backend
python -m pip install -r requirements.txt
# Crear backend/.env desde client-database.local.md
python scripts/bootstrap.py
```

Crea schema `taller`, tablas, usuario **admin** y contenido base (contacto, secciones, 4 servicios).
