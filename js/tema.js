const tema = document.createElement('style');
tema.setAttribute('type', 'text/tailwindcss');
tema.textContent = `
    @custom-variant dark (&:where(.dark, .dark *));

    @theme {
        --color-fondo: #FFFFFF;
        --color-texto: #1C1C1C;
        --color-suave: #77746E;
        --color-linea: #787878;
        --color-acento: #567FFB;
        --color-superficie: #F0F0F0;

        --color-fondo-noche: #141414;
        --color-texto-noche: #EDEDED;
        --color-suave-noche: #9A968F;
        --color-linea-noche: #4A4A4A;
        --color-superficie-noche: #242424;

        --font-titulo: "Geist", "Helvetica Neue", Arial, sans-serif;
        --font-dato: "IBM Plex Mono", ui-monospace, Menlo, monospace;

        --aspect-portada: 5 / 4;
        --aspect-hero: 5 / 2;
        --aspect-producto: 3 / 4;
        --aspect-categoria: 5 / 6;

        --text-display: 1.8662rem;
        --text-display--line-height: 1;
        --text-titulo: 1.296rem;
        --text-titulo--line-height: 1;
        --text-entradilla: 0.9rem;
        --text-entradilla--line-height: 1.3;
        --text-cuerpo: 0.75rem;
        --text-cuerpo--line-height: 1.6;
        --text-dato: 0.625rem;
        --text-dato--line-height: 1.4;
        --text-ficha: 0.625rem;
        --text-precio: 0.625rem;
        --text-chip: 0.5rem;

        --tracking-titulo: -0.015em;

        --spacing-margen: 0.5rem;
        --spacing-margen-texto: 1.25rem;
        --spacing-seccion: 2.5rem;
        --spacing-columna: 0.25rem;
        --spacing-fila: 1.5rem;
        --spacing-ficha-foto: 0.5rem;
        --spacing-ficha-linea: 0.0625rem;
        --spacing-ficha-peso: 0.375rem;
        --spacing-chip: 0.5rem;
    }

    @media (width >= 48rem) {
        :root {
            --text-display: 2.2888rem;
            --text-titulo: 1.4648rem;
            --text-entradilla: 0.9375rem;
            --text-dato: 0.6rem;
            --text-ficha: 0.6rem;
            --text-precio: 0.6rem;
            --spacing-margen: 0.75rem;
            --spacing-margen-texto: 1.5rem;
            --spacing-seccion: 5rem;
        }
    }
`;
document.head.appendChild(tema);
