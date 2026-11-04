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

const puntoHornada = document.querySelectorAll('[data-hora]');

if (puntoHornada.length > 0) {
    const ahora = new Date();
    const minutos = ahora.getHours() * 60 + ahora.getMinutes();
    const horas = ['08:00', '11:30', '18:00'];
    let siguiente = horas.find((hora) => {
        const [h, m] = hora.split(':');
        return Number(h) * 60 + Number(m) > minutos;
    });
    if (!siguiente) {
        siguiente = horas[0];
    }
    document.querySelectorAll(`[data-hora="${siguiente}"] .punto`).forEach((punto) => {
        punto.classList.remove('invisible');
    });
}

document.querySelectorAll('[data-carrusel]').forEach((carrusel) => {
    const lista = carrusel.querySelector('ul');
    const anterior = carrusel.querySelector('[data-anterior]');
    const siguiente = carrusel.querySelector('[data-siguiente]');
    const pagina = carrusel.querySelector('[data-pagina]');
    const fichas = lista.querySelectorAll('li');

    function dosCifras(numero) {
        return String(numero).padStart(2, '0');
    }

    function actualizar() {
        const ancho = fichas[0].getBoundingClientRect().width;
        const visibles = Math.round(lista.clientWidth / ancho);
        const primera = Math.round(lista.scrollLeft / ancho) + 1;
        const ultima = Math.min(primera + visibles - 1, fichas.length);
        pagina.textContent = `${dosCifras(primera)}–${dosCifras(ultima)}`;
        anterior.disabled = lista.scrollLeft <= 2;
        siguiente.disabled = lista.scrollLeft + lista.clientWidth >= lista.scrollWidth - 2;
    }

    anterior.addEventListener('click', () => {
        lista.scrollBy({ left: -lista.clientWidth, behavior: 'smooth' });
    });

    siguiente.addEventListener('click', () => {
        lista.scrollBy({ left: lista.clientWidth, behavior: 'smooth' });
    });

    lista.addEventListener('scroll', actualizar);
    window.addEventListener('resize', actualizar);
    actualizar();
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

const contenedorMapa = document.querySelector('#mapa');

if (contenedorMapa && window.L) {
    const tienda = [40.4089, -3.701];
    const mapa = L.map(contenedorMapa, {
        center: tienda,
        zoom: 16,
        zoomControl: false,
        scrollWheelZoom: false
    });

    function capa() {
        const estilo = raiz.classList.contains('dark') ? 'World_Dark_Gray_Base' : 'World_Light_Gray_Base';
        return `https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/${estilo}/MapServer/tile/{z}/{y}/{x}`;
    }

    const fondo = L.tileLayer(capa(), {
        maxZoom: 16,
        attribution: 'Esri, HERE, Garmin, © OpenStreetMap'
    }).addTo(mapa);

    L.circleMarker(tienda, {
        radius: 7,
        stroke: false,
        fillColor: '#567FFB',
        fillOpacity: 1
    }).addTo(mapa);

    botonTema.addEventListener('click', () => {
        fondo.setUrl(capa());
    });
}

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

const cajon = document.querySelector('#cajon');
const velo = document.querySelector('#velo');
const botonEncargo = document.querySelector('#boton-encargo');
const cerrarCajon = document.querySelector('#cerrar-cajon');
const lineas = document.querySelector('#lineas');
const vacio = document.querySelector('#encargo-vacio');
const confirmacion = document.querySelector('#confirmacion');
const total = document.querySelector('#total');
const confirmar = document.querySelector('#confirmar');
const contadorEncargo = document.querySelector('#contador-encargo');

let encargo = [];

try {
    encargo = JSON.parse(localStorage.getItem('encargo')) || [];
} catch (error) {
    encargo = [];
}

function pintarEncargo() {
    let unidadesTotales = 0;
    let importe = 0;

    lineas.innerHTML = encargo
        .map((linea, indice) => {
            const pan = panes.find((p) => p.id === linea.id);
            unidadesTotales += linea.cantidad;
            importe += pan.precio * linea.cantidad;
            return `
                <li class="py-4 flex items-center gap-4 border-b last:border-b-0 border-linea dark:border-linea-noche uppercase tracking-wider">
                    <img src="img/panes/${pan.id}-cenital.jpg" alt="" width="900" height="1200" class="w-12 aspect-producto object-cover bg-superficie dark:bg-superficie-noche">
                    <div class="flex-1 flex flex-col gap-1">
                        <a href="producto.html?pan=${pan.id}" class="hover:text-acento">${pan.nombre}</a>
                        <span class="text-suave dark:text-suave-noche">${linea.dia} · ${pan.peso}</span>
                    </div>
                    <div class="flex items-center border border-linea dark:border-linea-noche">
                        <button type="button" data-accion="menos" data-indice="${indice}" aria-label="Quitar una" class="px-2 py-1 hover:text-acento">−</button>
                        <span class="w-6 text-center">${linea.cantidad}</span>
                        <button type="button" data-accion="mas" data-indice="${indice}" aria-label="Añadir una" class="px-2 py-1 hover:text-acento">+</button>
                    </div>
                    <span class="w-16 text-right">${euros(pan.precio * linea.cantidad)}</span>
                    <button type="button" data-accion="quitar" data-indice="${indice}" aria-label="Quitar ${pan.nombre}" class="hover:text-acento">×</button>
                </li>`;
        })
        .join('');

    contadorEncargo.textContent = unidadesTotales;
    total.textContent = euros(importe);
    vacio.classList.toggle('hidden', encargo.length > 0 || !confirmacion.classList.contains('hidden'));
    confirmar.disabled = encargo.length === 0;
}

function guardarEncargo() {
    localStorage.setItem('encargo', JSON.stringify(encargo));
    pintarEncargo();
}

function abrirCajon() {
    cajon.classList.remove('-translate-y-full');
    cajon.removeAttribute('inert');
    cajon.setAttribute('aria-hidden', 'false');
    velo.classList.remove('hidden');
    botonEncargo.setAttribute('aria-expanded', 'true');
    cerrarCajon.focus();
}

function cerrarElCajon() {
    cajon.classList.add('-translate-y-full');
    cajon.setAttribute('inert', '');
    cajon.setAttribute('aria-hidden', 'true');
    velo.classList.add('hidden');
    botonEncargo.setAttribute('aria-expanded', 'false');
    confirmacion.classList.add('hidden');
    pintarEncargo();
}

function anadir(id, cantidadPan, dia) {
    const linea = encargo.find((l) => l.id === id && l.dia === dia);
    if (linea) {
        linea.cantidad = Math.min(linea.cantidad + cantidadPan, 20);
    } else {
        encargo.push({ id: id, cantidad: cantidadPan, dia: dia });
    }
    confirmacion.classList.add('hidden');
    guardarEncargo();
    abrirCajon();
}

botonEncargo.addEventListener('click', abrirCajon);
cerrarCajon.addEventListener('click', cerrarElCajon);
velo.addEventListener('click', cerrarElCajon);

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !velo.classList.contains('hidden')) {
        cerrarElCajon();
    }
});

lineas.addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-accion]');
    if (!boton) {
        return;
    }
    const linea = encargo[boton.dataset.indice];
    if (boton.dataset.accion === 'mas') {
        linea.cantidad = Math.min(linea.cantidad + 1, 20);
    }
    if (boton.dataset.accion === 'menos') {
        linea.cantidad--;
    }
    if (boton.dataset.accion === 'quitar' || linea.cantidad < 1) {
        encargo.splice(boton.dataset.indice, 1);
    }
    guardarEncargo();
});

confirmar.addEventListener('click', () => {
    const dias = [...new Set(encargo.map((linea) => linea.dia.toLowerCase()))]
        .map((dia) => (dia === 'mañana' ? 'mañana' : `el ${dia}`))
        .join(' y ');
    confirmacion.textContent = `Encargo apuntado. Te esperamos ${dias} en Calle del Horno, 12. Se paga al recoger.`;
    confirmacion.classList.remove('hidden');
    encargo = [];
    guardarEncargo();
});

document.querySelectorAll('[data-anadir]').forEach((boton) => {
    boton.addEventListener('click', () => {
        anadir(boton.dataset.anadir, 1, 'Mañana');
    });
});

const botonAnadir = document.querySelector('#anadir');

if (botonAnadir) {
    botonAnadir.addEventListener('click', () => {
        const dia = document.querySelector('input[name="dia"]:checked').value;
        anadir(panActual.id, unidades, dia);
        unidades = 1;
        cantidad.textContent = unidades;
    });
}

pintarEncargo();
