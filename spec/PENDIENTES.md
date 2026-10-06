# Decisiones pendientes (no inventar en código)

La [propuesta-cliente.md](../propuesta-cliente.md) no define estos puntos. Confirmar con el cliente / product owner antes de implementar.

| # | Tema | Qué dice la propuesta | Decisión necesaria |
|---|------|------------------------|-------------------|
| P-01 | Nombre comercial del taller | Taller mecánico/automotriz genérico | Nombre, logo, favicon |
| P-02 | Rutas URL públicas | Secciones por nombre | ¿Slugs en español (`/quienes-somos`) u otro criterio? |
| P-03 | Bloques editables por sección | Home: portada, mensaje, imágenes destacadas | ¿Cuántos campos de texto/imagen por página fija? |
| P-04 | Editor de texto | «Texto enriquecido simple» | ¿Solo párrafos y listas, o negritas/enlaces/imágenes inline? |
| P-05 | Página de servicio | Título, contenido, imagen principal | ¿Galería múltiple, PDF, precio — fuera de propuesta? |
| P-06 | Orden de servicios | «Ordenar» en panel | ¿Campo numérico `sort_order` o drag-and-drop? |
| P-07 | Desactivar vs borrar | Recomienda desactivar | ¿Soft delete únicamente en v1? |
| P-08 | «Cómo llegar» | Opcional en propuesta | ¿Incluir en v1 sí/no? ¿URL fija de Google Maps directions? |
| P-09 | WhatsApp | `wa.me` configurable | ¿Mensaje prellenado al abrir chat? |
| P-10 | Schema Supabase | «Schema dedicado al proyecto» | Nombre del schema (ej. `taller`) y proyecto Supabase compartido o nuevo |
| P-11 | Repositorio Git | No especificado | Nombre repo, monorepo `frontend/` + `backend/` |
| P-12 | Proyectos Vercel | Vercel frontend + API | Nombres exactos (ej. `taller`, `taller-api`) |
| P-13 | Usuario admin inicial | 1 admin en v1 | ¿Seed en migración, creación manual, o script de bootstrap? |
| P-14 | Límites de imagen | Mitigación: tamaño/compresión | MB máximo, formatos (jpg/png/webp), dimensiones recomendadas |
| P-15 | Publicación de cambios | «Visible en web pública» | ¿Guardar = publicar inmediato o borrador/publicado? |
| P-16 | Referencias visuales | Próximos pasos de propuesta | Mockups, paleta, tipografía |
