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
