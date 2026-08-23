document.querySelectorAll("[data-red]").forEach(function(enlace) {

    const red = enlace.dataset.red;
    const url = EULER.redes[red];

    if (url) {
        enlace.href = url;
    }

});



const header = document.querySelector("header");

let ultimaPosicionScroll = window.scrollY;

window.addEventListener("scroll", function () {

    const posicionActual = window.scrollY;
    const diferencia = posicionActual - ultimaPosicionScroll;

    /* Si el menú móvil está abierto,
       mantenemos siempre visible el header */
    if (header.classList.contains("menu-abierto")) {

        header.classList.remove("oculto");
        ultimaPosicionScroll = posicionActual;

        return;
    }

    /* Ignorar movimientos de scroll muy pequeños */
    if (Math.abs(diferencia) < 8) {
        return;
    }

    /* Si bajamos, ocultar el header */
    if (diferencia > 0 && posicionActual > 100) {

        header.classList.add("oculto");

    } else {

        /* Si subimos, mostrarlo */
        header.classList.remove("oculto");

    }

    ultimaPosicionScroll = posicionActual;

});



const menuToggle = document.getElementById("menu-toggle");

if (menuToggle && header) {

    menuToggle.addEventListener("click", function () {

        header.classList.toggle("menu-abierto");
        header.classList.remove("oculto");

        const abierto =
            header.classList.contains("menu-abierto");

        menuToggle.setAttribute("aria-expanded", abierto);

        menuToggle.innerHTML = abierto
            ? '<i class="bi bi-x-lg"></i>'
            : '<i class="bi bi-list"></i>';

    });

}



const campoBusqueda = document.getElementById("campo-busqueda");
const resultadosBusqueda = document.getElementById("resultados-busqueda");
const botonBusqueda = document.getElementById("boton-busqueda");

const root = document.body.dataset.root;


function obtenerResultados(texto) {

    const busqueda = texto.trim().toLowerCase();

    if (busqueda === "") {
        return [];
    }

    return PAGINAS.filter(function(pagina) {

        return (
            pagina.titulo.toLowerCase().includes(busqueda) ||
            pagina.descripcion.toLowerCase().includes(busqueda)
        );

    });

}


function mostrarResultados() {

    const resultados = obtenerResultados(campoBusqueda.value);

    resultadosBusqueda.innerHTML = "";

    if (resultados.length === 0) {
        resultadosBusqueda.classList.remove("visible");
        return;
    }

    resultados.forEach(function(pagina) {

        const enlace = document.createElement("a");

        enlace.href = root + pagina.url;

        enlace.classList.add("resultado-busqueda");

        enlace.innerHTML = `
            <strong>${pagina.titulo}</strong>
            <span>${pagina.descripcion}</span>
        `;

        resultadosBusqueda.appendChild(enlace);

    });

    resultadosBusqueda.classList.add("visible");

}

campoBusqueda.addEventListener("input", mostrarResultados);

function irAlPrimerResultado() {

    const resultados = obtenerResultados(campoBusqueda.value);

    if (resultados.length > 0) {
        window.location.href = root + resultados[0].url;
    }

}

botonBusqueda.addEventListener("click", irAlPrimerResultado);

campoBusqueda.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        irAlPrimerResultado();
    }

});



