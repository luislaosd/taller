# taller

Web para talleres mecánicos — sitio con CMS (alcance v1 según propuesta).

## Documentación

| Carpeta / archivo | Contenido |
|-------------------|-----------|
| [spec/](./spec/) | Requerimientos, diseño, tareas y pendientes |
| [spec/brand-palette.md](./spec/brand-palette.md) | Colores de marca (extraídos de `logo.jpeg`) |
| [logo.jpeg](./logo.jpeg) | Logo DOSH motor S.A.C. |
| [propuesta-cliente.md](./propuesta-cliente.md) | Propuesta comercial / alcance acordado |

Empezar por [spec/README.md](./spec/README.md).

## Estado

**Maqueta frontend** en [frontend/](./frontend/) (React + Vite + Tailwind): web pública + shell admin demo. Backend y panel editable según [spec/tasks.md](./spec/tasks.md).

```powershell
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173
