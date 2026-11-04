const raiz = document.documentElement;

function euros(cantidad) {
    return cantidad.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}

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
const fichasColeccion = document.querySelectorAll('[data-tipo]');
const contador = document.querySelector('#contador');

filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
        const filtro = boton.dataset.filtro;
        let visibles = 0;

        fichasColeccion.forEach((ficha) => {
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

const paginaProducto = document.querySelector('#producto');
let panActual = null;

function rellenar(campo, texto) {
    document.querySelectorAll(`[data-campo="${campo}"]`).forEach((elemento) => {
        elemento.textContent = texto;
    });
}

if (paginaProducto) {
    const id = new URLSearchParams(location.search).get('pan');
    panActual = panes.find((pan) => pan.id === id) || panes[0];

    document.title = `${panActual.nombre} · Obrador`;
    rellenar('nombre', panActual.nombre);
    rellenar('tipo', panActual.tipo);
    rellenar('familia', familias[panActual.familia]);
    rellenar('precio', euros(panActual.precio));
    rellenar('peso', panActual.peso);
    rellenar('texto', panActual.texto);
    rellenar('harina', panActual.harina);
    rellenar('fermentacion', panActual.fermentacion);
    rellenar('hornada', panActual.hornada);
    rellenar('conservacion', panActual.conservacion);

    const cenital = document.querySelector('#foto-cenital');
    const corte = document.querySelector('#foto-corte');
    cenital.src = `img/panes/${panActual.id}-cenital.jpg`;
    cenital.alt = `${panActual.nombre} visto desde arriba`;
    corte.src = `img/panes/${panActual.id}-corte.jpg`;
    corte.alt = `${panActual.nombre} abierto por la mitad`;

    const muestras = document.querySelector('#muestras');
    muestras.innerHTML = panes
        .filter((pan) => pan.familia === panActual.familia)
        .map((pan) => {
            const actual = pan.id === panActual.id;
            const marca = actual ? 'outline-1 -outline-offset-1 outline-acento' : 'hover:outline-1 hover:-outline-offset-1 hover:outline-linea dark:hover:outline-linea-noche';
            return `
                <li class="w-14 md:w-auto md:flex-1">
                    <a href="producto.html?pan=${pan.id}" ${actual ? 'aria-current="page"' : ''} aria-label="${pan.nombre}" class="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acento">
                        <img src="img/panes/${pan.id}-cenital.jpg" alt="" width="900" height="1200" class="aspect-producto object-cover bg-superficie dark:bg-superficie-noche ${marca}">
                    </a>
                </li>`;
        })
        .join('');
}

const menos = document.querySelector('#menos');
const mas = document.querySelector('#mas');
const cantidad = document.querySelector('#cantidad');
let unidades = 1;

if (cantidad) {
    menos.addEventListener('click', () => {
        if (unidades > 1) {
            unidades--;
            cantidad.textContent = unidades;
        }
    });

    mas.addEventListener('click', () => {
        if (unidades < 10) {
            unidades++;
            cantidad.textContent = unidades;
        }
    });
}
