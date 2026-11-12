# Mosaica

Editor de mosaicos en español, hecho con HTML, CSS y JavaScript sin dependencias.

## Uso

Abrí `dist/index.html` en un navegador moderno o serví la carpeta `dist` con un servidor estático.

Incluye 15 formas, letras A–Z y Ñ, números de uno o dos dígitos, tres patrones de color, paletas, pintura por pieza, color de juntas, deshacer, restablecer, descarga SVG e impresión.

El botón **Imprimir diseño** abre el diálogo del navegador: permite imprimir o guardar como PDF. La hoja A4 contiene solo el diseño actual y su descripción. La impresión se ajusta a la hoja; no es una plantilla a escala real.

Los cambios se conservan entre formas mientras la página permanece abierta; no se guardan después de recargar.

## Archivos

- `dist/index.html`: interfaz, estilos e impresión.
- `dist/app.js`: formas SVG y comportamiento del editor.
- `.openai/hosting.json`: configuración de publicación del sitio.

## Demo

https://mosaica-taller-demo.edukaos.chatgpt.site/
