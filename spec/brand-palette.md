# Identidad visual — DOSH motor S.A.C.

**Logo de referencia:** [../logo.jpeg](../logo.jpeg) (raíz del repositorio).

Paleta extraída por muestreo de píxeles del logo (marzo 2026). Usar estos valores como **fuente de verdad** en UI pública, admin y futuros assets.

## Colores principales

| Token | Hex | RGB | Muestra | Uso |
|-------|-----|-----|---------|-----|
| `brand-blue` | `#0000F8` | 0, 0, 248 | Azul logo «DOSH», tipografía y formas diagonales | Color primario: encabezados, navbar, enlaces, iconografía, admin accent |
| `brand-orange` | `#F86000` | 248, 96, 0 | Cuadrado «DO/SH» | Color secundario / acento: CTAs, badges, bloques destacados, hover en botones primarios |
| `brand-white` | `#FFFFFF` | 255, 255, 255 | Fondo del logo | Fondos de página, tarjetas sobre azul/naranja |

Promedio por zona (útil para degradados o estados hover):

| Token | Hex | Notas |
|-------|-----|--------|
| `brand-blue-soft` | `#0B0BEF` | Promedio zona azul (anti-alias); hover de enlaces |
| `brand-orange-soft` | `#FB6605` | Promedio zona naranja; hover en botones naranja |

## Colores de apoyo (del logo)

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-blue-muted` | `#3030C8` | Bordes, iconos secundarios, estados disabled suaves |
| `brand-neutral` | `#C8D0D8` | Separadores, bordes de inputs (tomado de anti-alias claro en el archivo) |

## Texto sobre fondos

| Contexto | Foreground | Background | Notas |
|----------|------------|------------|--------|
| Cuerpo en página | `#111827` (gris casi negro) | `#FFFFFF` | Mejor legibilidad que azul puro en párrafos largos |
| Títulos / marca | `#0000F8` | `#FFFFFF` | Alineado al logo |
| Botón primario | `#FFFFFF` | `#F86000` | CTA principal (WhatsApp, «Contáctenos») |
| Botón secundario | `#0000F8` | `#FFFFFF` + borde `#0000F8` | Acciones alternativas |
| Footer / barra | `#FFFFFF` | `#0000F8` | Variante invertida del bloque de marca |

> El azul del logo (`#0000F8`) tiene buen contraste en **texto grande** sobre blanco; para **cuerpo pequeño** preferir gris oscuro y reservar el azul para títulos, UI y elementos de marca.

## Tokens CSS (implementación)

Copiar al `frontend` cuando exista (p. ej. `src/styles/brand.css` o `@theme` en Tailwind v4):

```css
:root {
  --color-brand-blue: #0000f8;
  --color-brand-blue-soft: #0b0bef;
  --color-brand-blue-muted: #3030c8;
  --color-brand-orange: #f86000;
  --color-brand-orange-soft: #fb6605;
  --color-brand-white: #ffffff;
  --color-brand-neutral: #c8d0d8;
  --color-text-body: #111827;
}
```

### Tailwind (ejemplo v3/v4 extend)

```js
// tailwind.config — extend.colors
brand: {
  blue: '#0000F8',
  'blue-soft': '#0B0BEF',
  'blue-muted': '#3030C8',
  orange: '#F86000',
  'orange-soft': '#FB6605',
  neutral: '#C8D0D8',
}
```

## Tipografía (referencia visual del logo)

El logo combina:

- **Sans condensada** en «DOSH» (impacto, industrial).
- **Serif** en «motor S.A.C.» y en el monograma DO/SH del cuadrado.

**Pendiente:** fuentes licenciadas o alternativas web (Google Fonts) — definir en implementación; hasta entonces usar fallback: `system-ui` + una sans condensada (`Arial Narrow`, `Roboto Condensed`) y serif (`Georgia`, `Libre Baskerville`) solo en hero/logo embebido.

## Uso del logo

- Mantener **zona de respiro** ≈ altura de la «O» alrededor del lockup.
- No alterar proporciones azul/naranja del monograma.
- Sobre fotos oscuras: preferir logo sobre fondo blanco o naranja sólido; evitar azul sobre imagen sin contraste.
- Archivo entregado: `logo.jpeg`; para producción conviene exportar **SVG o PNG** desde el diseñador cuando esté disponible.

## Admin vs. web pública

| Área | Recomendación |
|------|----------------|
| Web pública | Naranja en CTAs; azul en header/footer y títulos; fondo blanco |
| Panel admin | Azul como color de acción primaria; naranja solo en alertas o destacados, para no confundir con CTAs del sitio |

## Trazabilidad

| Origen | Valor |
|--------|--------|
| Muestreo dominante azul | `#0000F8` |
| Muestreo dominante naranja | `#F86000` |
| Promedio zonas naranja/azul | `#FB6605` / `#0B0BEF` |

Actualizar este documento si el cliente entrega manual de marca o nuevos archivos vectoriales.
