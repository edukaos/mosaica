# Mosaica

Editor de mosaicos en español, hecho con HTML, CSS y JavaScript sin dependencias.

## Uso

Abrí `dist/index.html` en un navegador moderno o serví la carpeta `dist` con un servidor estático.

Incluye 15 formas, letras A–Z y Ñ, números de uno o dos dígitos, tres patrones de color, paletas, pintura por pieza, color de juntas, deshacer, restablecer, descarga SVG e impresión.

El botón **Imprimir diseño** abre el diálogo del navegador: permite imprimir o guardar como PDF. La hoja A4 contiene solo el diseño actual y su descripción. La impresión se ajusta a la hoja; no es una plantilla a escala real.

El trabajo se guarda automáticamente y se recupera al abrir de nuevo la app en el mismo navegador. Podés guardar hasta 12 copias con nombre en Mis proyectos, abrirlas o eliminarlas. Los datos quedan en el dispositivo y no se sincronizan entre navegadores o entre la demo y GitHub Pages.

## Archivos

- `dist/index.html`: interfaz, estilos e impresión.
- `dist/app.js`: formas SVG y comportamiento del editor.
- `.openai/hosting.json`: configuración de publicación del sitio.

## Demo

https://mosaica-taller-demo.edukaos.chatgpt.site/

## Colores

Generador de paletas aleatorias de 6, 8, 10 o 12 tonos. Cada paleta recolorea la pieza actual y se puede deshacer. Los colores personalizados se agregan con el selector o un código HEX de 3 o 6 caracteres, y se conservan al cambiar de paleta durante la sesión.

## Estilos

El estilo Artesanal agrega teselas irregulares, anillos ondulados en espejos y mandalas, pétalos en flores y detalles de alas y ojos en búhos. El estilo Clásico conserva las geometrías regulares originales.
