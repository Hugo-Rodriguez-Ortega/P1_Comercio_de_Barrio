const raiz = document.documentElement;
const botonTema = document.querySelector('#boton-tema');

if (localStorage.getItem('tema') === 'oscuro') {
    raiz.classList.add('dark');
    botonTema.setAttribute('aria-label', 'Cambiar a modo claro');
}

botonTema.addEventListener('click', () => {
    const oscuro = raiz.classList.toggle('dark');
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
    botonTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
});

const botonMenu = document.querySelector('#boton-menu');
const menuMovil = document.querySelector('#menu-movil');

function cerrarMenu() {
    menuMovil.classList.add('hidden');
    botonMenu.setAttribute('aria-expanded', 'false');
    botonMenu.textContent = 'Menú';
}

botonMenu.addEventListener('click', () => {
    const abierto = menuMovil.classList.toggle('hidden') === false;
    botonMenu.setAttribute('aria-expanded', abierto);
    botonMenu.textContent = abierto ? 'Cerrar' : 'Menú';
});

menuMovil.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', cerrarMenu);
});

const filtros = document.querySelectorAll('[data-filtro]');
const fichas = document.querySelectorAll('[data-tipo]');
const contador = document.querySelector('#contador');

filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
        const filtro = boton.dataset.filtro;
        let visibles = 0;

        fichas.forEach((ficha) => {
            const mostrar = filtro === 'todo' || ficha.dataset.tipo === filtro;
            ficha.classList.toggle('hidden', !mostrar);
            if (mostrar) {
                visibles++;
            }
        });

        filtros.forEach((otro) => otro.classList.remove('text-acento'));
        boton.classList.add('text-acento');
        contador.textContent = visibles;
    });
});
