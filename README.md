# Witchu — Portafolio Artístico

Portafolio de Luis Gómez (Witchu) para presentar servicios de diseño gráfico, contenido para redes, video, ilustración e identidad de marca.

## Recorrido

La portada interactiva muestra la página entre los dientes del personaje y abre el sitio al pulsarlos; si no se entra, aparece la invitación ilustrada a los 12 segundos. Después, la página presenta a Luis y enlaza, en ese orden, servicios, trabajos seleccionados, paquetes y presupuesto, proceso de trabajo y contacto. Ilustración y encargos se abren como una galería secundaria, de acuerdo con el tablero de Mirlo.

Las piezas del portafolio se pueden ampliar con teclado o clic. Los videos se reproducen en línea y al iniciar uno se pausa cualquier otro. Las cotizaciones abren WhatsApp con el servicio o paquete seleccionado.

## Desarrollo y despliegue

```bash
npm run dev
npm run build
npm run preview
```

`npm run build` genera la carpeta `dist/` con HTML prerenderizado, metadatos y archivos para buscadores. El sitio también está preparado para Netlify o Vercel. Al conectar un dominio propio, definir `SITE_URL=https://dominio-elegido` en las variables de build para actualizar el canonical y el sitemap.

## Cloudflare Workers

`bun install` ejecuta el script `postinstall` y genera `dist/` antes del despliegue. `wrangler.jsonc` publica solo esa carpeta, con el nombre `portafolio-luis-gomez`. En Workers Builds, el comando de despliegue puede seguir siendo `npx wrangler deploy`. `worker.mjs` atiende los reels con respuestas HTTP Range para reproducción y avance en Safari; el resto de los recursos se sirve como assets estáticos.

## Pendientes de lanzamiento

- Confirmar con Luis los precios, entregables, condiciones y datos de contacto publicados.
- Confirmar permisos para exhibir públicamente las piezas de clientes y los PDF del repositorio.
- Conectar el dominio definitivo; al hacerlo, definir `SITE_URL` en las variables de build y verificar el dominio en Google Search Console.
- Revisar la reproducción de los reels en Safari/iPhone y la navegación con teclado y lector de pantalla.
