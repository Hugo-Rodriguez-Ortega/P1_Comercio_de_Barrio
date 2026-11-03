const botonMenu = document.querySelector('#boton-menu');
const menuMovil = document.querySelector('#menu-movil');

botonMenu.addEventListener('click', () => {
    menuMovil.classList.toggle('hidden');
});
