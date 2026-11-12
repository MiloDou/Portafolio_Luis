# Witchuart — Portafolio Artístico

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

`npm run build` genera la carpeta `dist/`. El sitio es estático y está preparado para Netlify o Vercel. Los videos incluyen soporte de HTTP Range para permitir avanzar en la reproducción.

## Cloudflare Workers

`bun install` ejecuta el script `postinstall` y genera `dist/` antes del despliegue. `wrangler.jsonc` publica solo esa carpeta, con el nombre `portafolio-luis-gomez`. En Workers Builds, el comando de despliegue puede seguir siendo `npx wrangler deploy`.
# Portafolio_Luis
