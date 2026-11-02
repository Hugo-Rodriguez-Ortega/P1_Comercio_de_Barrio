const tema = document.createElement('style');
tema.setAttribute('type', 'text/tailwindcss');
tema.textContent = `
    @theme {
        --color-fondo: #FFFFFF;
        --color-texto: #1C1C1C;
        --color-suave: #77746E;
        --color-linea: #787878;
        --color-acento: #567FFB;
        --color-superficie: #F0F0F0;

        --font-titulo: "Geist", "Helvetica Neue", Arial, sans-serif;
        --font-dato: "IBM Plex Mono", ui-monospace, Menlo, monospace;

        --aspect-portada: 5 / 4;
        --aspect-hero: 5 / 2;
        --aspect-producto: 3 / 4;
        --aspect-categoria: 5 / 6;

        --text-dato: 0.625rem;
        --text-dato--line-height: 1.4;
    }
`;
document.head.appendChild(tema);
