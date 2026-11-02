const tema = document.createElement('style');
tema.setAttribute('type', 'text/tailwindcss');
tema.textContent = `
    @theme {
        --color-fondo: #FFFFFF;
        --color-texto: #1C1C1C;
        --color-suave: #77746E;
        --color-linea: #787878;
        --color-acento: #567FFB;

        --font-titulo: "Geist", "Helvetica Neue", Arial, sans-serif;
        --font-dato: "IBM Plex Mono", ui-monospace, Menlo, monospace;
    }
`;
document.head.appendChild(tema);
