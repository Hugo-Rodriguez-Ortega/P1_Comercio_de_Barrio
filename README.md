# Obrador · Panadería de masa madre

Práctica 1 de Maquetación Web con Hojas de Estilo (UDIT, 4.º de Diseño Gráfico): la web de una panadería de barrio inventada, con tres hornadas al día y encargos para recoger en tienda.

Web publicada: https://hugo-rodriguez-ortega.github.io/P1_Comercio_de_Barrio/

## Páginas

- `index.html`: portada, hornadas del día, pan de hoy, categorías, pan de la semana, preguntas, horario, contacto y mapa.
- `coleccion.html`: todo el pan, con filtros por harina.
- `producto.html?pan=<id>`: ficha de cada pan, con cantidad, día de recogida y otros panes de la misma familia.

## Cómo está hecha

- Tailwind CSS v4 desde el Play CDN, con un `@theme` propio en `js/tema.js`, que lo añade al `<head>` para que el HTML valide sin errores en el W3C (colores `fondo`, `texto`, `suave`, `linea`, `acento` y `superficie`, cada uno con su versión `-noche`; tipografías `titulo` y `dato`).
- `css/styles.css` con el CSS propio organizado en `@layer` y las animaciones con `@keyframes`.
- `js/main.js` con JavaScript nativo: menú móvil, modo claro y oscuro, filtros, carrusel, ficha de producto y cajón del encargo guardado en `localStorage`. Los datos de los panes están en `js/panes.js`.
- Librerías: jQuery (preguntas), AOS (aparición al hacer scroll), Lenis (scroll suave) y Leaflet (mapa).
- Tipografías de Google Fonts: Geist e IBM Plex Mono.

## Autor

Hugo Rodríguez Ortega · GDMG 4.1
