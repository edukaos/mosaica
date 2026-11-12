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

## Interfaz compacta

En escritorio, el editor usa el alto disponible de la ventana: miniaturas a la izquierda, diseño adaptable en el centro, pestañas de Paletas / Personalizado / Juntas a la derecha y una barra de acciones siempre visible. Los paneles permiten desplazamiento interno en alturas reducidas. En tablet y móvil se habilita el desplazamiento de la página.

## Herramientas de pintura

- **Pincel:** tocá o arrastrá con mouse, lápiz o dedo sobre las teselas. Un trazo completo cuenta como una operación de Deshacer.
- **Cuentagotas:** toma el color de una tesela y vuelve automáticamente al pincel.
- **Reemplazar:** elegí el color nuevo y tocá una tesela del color que querés sustituir; cambia todas las teselas de ese color en el diseño abierto, sin modificar las demás formas.
- **Rehacer:** restaura el último cambio deshecho. Una edición nueva descarta la rama de rehacer. Atajos: Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z o Ctrl/Cmd+Y. Los atajos no interfieren con campos de texto.

El historial de Deshacer/Rehacer dura mientras está abierta la sesión y se reinicia al abrir otro proyecto; el resultado del dibujo sí se guarda automáticamente.

## Zoom, movimiento y simetría

- Zoom de 100% a 400% con + / − o rueda del mouse sobre el lienzo, centrado en el puntero.
- **Mover** permite arrastrar la vista sin pintar; también se puede arrastrar con el botón central del mouse. **Ver completo** restaura la vista.
- **Simetría** del pincel: sin simetría, espejo vertical, radial de 4 o de 8 sectores. Solo se pintan puntos dentro de la forma; las teselas irregulares se seleccionan por el punto reflejado. El cuentagotas y el reemplazo no se repiten por simetría.
- Un trazo simétrico sigue siendo una sola operación de Deshacer/Rehacer.
- Descargar SVG e imprimir conservan el diseño completo independientemente del zoom.
