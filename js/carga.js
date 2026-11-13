const raizCarga = document.documentElement;
let cargaVista = false;

try {
    cargaVista = sessionStorage.getItem('obrador-carga') === 'vista';
} catch (error) {
    cargaVista = false;
}

if (cargaVista) {
    raizCarga.classList.add('sin-carga');
} else {
    raizCarga.classList.add('cargando');

    let paginaCargada = false;
    window.addEventListener('load', () => {
        paginaCargada = true;
    });

    document.addEventListener('DOMContentLoaded', () => {
        const carga = document.querySelector('#carga');
        const numero = document.querySelector('#carga-numero');
        const inicio = performance.now();
        const duracion = 1400;
        let valor = 0;

        function terminar() {
            numero.textContent = '100';
            try {
                sessionStorage.setItem('obrador-carga', 'vista');
            } catch (error) {
                cargaVista = true;
            }
            setTimeout(() => {
                carga.classList.add('carga-fuera');
                raizCarga.classList.remove('cargando');
                document.dispatchEvent(new Event('carga-lista'));
                setTimeout(() => carga.remove(), 1000);
            }, 300);
        }

        function contar(ahora) {
            const avance = Math.min((ahora - inicio) / duracion, 1);
            const curva = 1 - Math.pow(1 - avance, 3);
            const objetivo = paginaCargada ? curva * 100 : Math.min(curva * 100, 90);
            valor += (objetivo - valor) * 0.15;
            numero.textContent = String(Math.floor(valor)).padStart(3, '0');

            if (paginaCargada && avance === 1 && valor > 99) {
                terminar();
            } else {
                requestAnimationFrame(contar);
            }
        }

        if (carga && numero) {
            requestAnimationFrame(contar);
        }
    });
}
