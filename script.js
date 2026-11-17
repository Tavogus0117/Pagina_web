// ==========================================
// 0. ANIMACIÓN DE SELECCIÓN DE INTEGRANTE (SIN REDIRECCIÓN)
// ==========================================
function seleccionarIntegrante(tarjeta) {
    const yaSeleccionado = tarjeta.classList.contains("selected-member");
    document.querySelectorAll(".member-card").forEach(card => {
        card.classList.remove("selected-member");
    });
    if (!yaSeleccionado) {
        tarjeta.classList.add("selected-member");
    }
}

// ==========================================
// 0.1 DETECTOR AUTOMÁTICO DE EXTENSIONES DE FOTO
// ==========================================
function probarExtensiones(img, nombreBase) {
    const intento = parseInt(img.dataset.intento || "0", 10);
    const alternativas = [
        `${nombreBase}.png`,
        `${nombreBase}.jpeg`,
        `${nombreBase}.webp`,
        `img/${nombreBase}.jpg`,
        `img/${nombreBase}.png`,
        `imagenes/${nombreBase}.jpg`,
        `imagenes/${nombreBase}.png`
    ];

    if (intento < alternativas.length) {
        img.dataset.intento = intento + 1;
        img.src = alternativas[intento];
    } else {
        img.onerror = null;
        img.parentElement.innerHTML = `<span>FALTA: ${nombreBase}.jpg</span>`;
    }
}

// ==========================================
// 1. CONTROLADOR DE NAVEGACIÓN ENTRE PÁGINAS
// ==========================================
const ordenPaginas = [
    "inicio",
    "contexto",
    "red-historica",
    "audiovisual",
    "recurso-interactivo",
    "conclusiones"
];

function cambiarPagina(idPagina) {
    document.querySelectorAll(".page-view").forEach(seccion => {
        seccion.classList.remove("active-page");
    });
    const paginaActiva = document.getElementById(idPagina);
    if (paginaActiva) {
        paginaActiva.classList.add("active-page");
    }

    document.querySelectorAll(".nav-tab").forEach(tab => {
        tab.classList.remove("active");
        if (tab.dataset.page === idPagina) {
            tab.classList.add("active");
        }
    });

    const numero = ordenPaginas.indexOf(idPagina) + 1;
    document.getElementById("pageIndicator").textContent = `PÁGINA ${numero} DE ${ordenPaginas.length}`;

    if (idPagina === "red-historica") {
        setTimeout(dibujarLineas, 50);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 2. ESTRUCTURA DE DATOS: RED DE RELACIONES HISTÓRICAS
// ==========================================
const nodosHistoricos = [
    {
        id: "viena",
        titulo: "Congreso de Viena (1815)",
        tipo: "causa",
        etiqueta: "CAUSA POLÍTICA",
        descripcion: "Reunión de las potencias europeas tras la caída de Napoleón para restaurar las monarquías absolutas y redibujar el mapa europeo bajo el principio de legitimidad.",
        conectados: ["nacionalismo", "revoluciones1848"],
        justificacion: [
            "Impulsa el Nacionalismo: Al dividir pueblos (como Italia y Alemania) en reinos dinásticos sin consultar su identidad, provocó movimientos de unificación.",
            "Detona las Revoluciones de 1848: El autoritarismo restaurador generó alzamientos liberales y nacionales en toda Europa."
        ]
    },
    {
        id: "industrial",
        titulo: "Revolución Industrial",
        tipo: "causa",
        etiqueta: "PROCESO ECONÓMICO",
        descripcion: "Transición hacia una economía mecanizada y fabril iniciada en Gran Bretaña y expandida por Europa continental durante el siglo XIX.",
        conectados: ["proletariado", "utopias", "romanticismo"],
        justificacion: [
            "Origina al Proletariado Urbano: La migración campo-ciudad creó una nueva clase trabajadora sometida a jornadas extenuantes.",
            "Provoca las Utopías Sociales: La desigualdad industrial llevó a pensadores a diseñar sociedades alternativas.",
            "Reacción del Romanticismo: Frente a la mecanización y contaminación urbana, los románticos idealizaron la naturaleza."
        ]
    },
    {
        id: "proletariado",
        titulo: "Burguesía y Proletariado",
        tipo: "actor",
        etiqueta: "ACTORES SOCIALES",
        descripcion: "Nuevos grupos sociales antagónicos surgidos del capitalismo industrial: los dueños del capital y las fábricas frente a los trabajadores asalariados.",
        conectados: ["utopias", "revoluciones1848"],
        justificacion: [
            "Motor de las Utopías Sociales: Las condiciones de vida obrera inspiraron las cooperativas de Robert Owen y los falansterios de Fourier.",
            "Protagonistas en 1848: Demandaron derechos laborales y sufragio en las barricadas europeas."
        ]
    },
    {
        id: "utopias",
        titulo: "Utopías Sociales",
        tipo: "consecuencia",
        etiqueta: "IDEOLOGÍA SOCIAL",
        descripcion: "Corriente impulsada por Saint-Simon, Charles Fourier y Robert Owen que proponía reformar pacíficamente la sociedad mediante comunidades igualitarias.",
        conectados: ["industrial", "proletariado"],
        justificacion: [
            "Respuesta directa a la Revolución Industrial: Buscaba corregir los efectos sociales del libre mercado sin recurrir inicialmente a la lucha armada."
        ]
    },
    {
        id: "romanticismo",
        titulo: "Romanticismo",
        tipo: "consecuencia",
        etiqueta: "MOVIMIENTO CULTURAL",
        descripcion: "Movimiento artístico y filosófico que priorizó la emoción, la libertad individual, la naturaleza y el espíritu popular (Volksgeist) frente al racionalismo.",
        conectados: ["nacionalismo", "industrial"],
        justificacion: [
            "Alimenta al Nacionalismo: Rescató el folclore, las lenguas y la historia medieval de cada pueblo, fortaleciendo la identidad nacional."
        ]
    },
    {
        id: "nacionalismo",
        titulo: "Nacionalismo y 1848",
        tipo: "consecuencia",
        etiqueta: "IDEOLOGÍA Y CONSECUENCIA",
        descripcion: "Doctrina que sostiene que cada nación tiene derecho a constituirse como Estado soberano, estallando en la 'Primavera de los Pueblos' de 1848.",
        conectados: ["viena", "romanticismo", "proletariado"],
        justificacion: [
            "Desafío al orden de Viena: Cuestionó los imperios plurinacionales (como el Austríaco) y sentó las bases de las futuras unificaciones de Italia y Alemania."
        ]
    }
];

const nodesContainer = document.getElementById("nodesContainer");
const networkLines = document.getElementById("networkLines");

function renderNodos(filtro = "todos") {
    nodesContainer.innerHTML = "";
    const filtrados = filtro === "todos"
        ? nodosHistoricos
        : nodosHistoricos.filter(n => n.tipo === filtro);

    filtrados.forEach(nodo => {
        const div = document.createElement("div");
        div.className = "node-item";
        div.dataset.id = nodo.id;
        div.innerHTML = `
            <span class="node-category">${nodo.etiqueta}</span>
            <h4>${nodo.titulo}</h4>
        `;
        div.addEventListener("click", () => seleccionarNodo(nodo));
        nodesContainer.appendChild(div);
    });

    dibujarLineas();
}

function dibujarLineas() {
    networkLines.innerHTML = "";
    const canvas = document.getElementById("networkCanvas");
    if (!canvas || canvas.offsetParent === null) return;

    const canvasRect = canvas.getBoundingClientRect();
    const elementos = document.querySelectorAll(".node-item");
    const posiciones = {};

    elementos.forEach(el => {
        const rect = el.getBoundingClientRect();
        posiciones[el.dataset.id] = {
            x: rect.left - canvasRect.left + rect.width / 2,
            y: rect.top - canvasRect.top + rect.height / 2
        };
    });

    nodosHistoricos.forEach(nodo => {
        if (!posiciones[nodo.id]) return;
        nodo.conectados.forEach(destinoId => {
            if (posiciones[destinoId]) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", posiciones[nodo.id].x);
                line.setAttribute("y1", posiciones[nodo.id].y);
                line.setAttribute("x2", posiciones[destinoId].x);
                line.setAttribute("y2", posiciones[destinoId].y);
                line.setAttribute("stroke", "rgba(96, 165, 250, 0.35)");
                line.setAttribute("stroke-width", "2");
                networkLines.appendChild(line);
            }
        });
    });
}

function seleccionarNodo(nodo) {
    document.querySelectorAll(".node-item").forEach(el => {
        el.classList.remove("selected", "connected");
        if (el.dataset.id === nodo.id) el.classList.add("selected");
        if (nodo.conectados.includes(el.dataset.id)) el.classList.add("connected");
    });

    document.getElementById("detailType").textContent = nodo.etiqueta;
    document.getElementById("detailTitle").textContent = nodo.titulo;
    document.getElementById("detailDesc").textContent = nodo.descripcion;

    const ul = document.getElementById("detailConnections");
    ul.innerHTML = "";
    nodo.justificacion.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
    });
}

function filtrarRed(categoria, boton) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    renderNodos(categoria);
}

// ==========================================
// 3. INTERACTIVIDAD DE CAPÍTULOS DE VIDEO
// ==========================================
const capitulosVideo = [
    "<strong>Tesis del segmento:</strong> Analiza cómo la reorganización territorial de 1815 ignoró los principios de soberanía nacional, generando un conflicto estructural entre legitimidad dinástica y voluntad popular.",
    "<strong>Tesis del segmento:</strong> Explica el paso del taller artesanal a la fábrica mecanizada, el crecimiento acelerado de ciudades como Manchester y el surgimiento de la cuestión social.",
    "<strong>Tesis del segmento:</strong> Examina los proyectos comunitarios de Robert Owen y Charles Fourier como primeros intentos de humanizar el trabajo industrial.",
    "<strong>Tesis del segmento:</strong> Muestra cómo escritores y músicos románticos despertaron la conciencia nacional que desembocó en las revoluciones de 1848."
];

function mostrarCapitulo(indice, boton) {
    document.querySelectorAll(".chapter-btn").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    document.getElementById("chapterSummary").innerHTML = capitulosVideo[indice];
}

// ==========================================
// 4. RECURSO INTERACTIVO: LÍNEA DE TIEMPO Y COMPARADOR
// ==========================================
const hitosHistoricos = [
    { anio: "1815", titulo: "Congreso de Viena", eje: "politica", texto: "Restauración monárquica y nuevo equilibrio europeo tras Waterloo." },
    { anio: "1819", titulo: "Obra de Saint-Simon y Owen", eje: "industria", texto: "Primeros planteamientos de reorganización industrial y cooperativismo." },
    { anio: "1830", titulo: "Oleada Revolucionaria y Romanticismo", eje: "cultura", texto: "Independencia de Bélgica y auge del arte romántico comprometido (Delacroix)." },
    { anio: "1848", titulo: "La Primavera de los Pueblos", eje: "politica", texto: "Revoluciones liberales, nacionales y obreras simultáneas en Europa." }
];

function renderTimeline() {
    const filtro = document.getElementById("ejeSelect").value;
    const container = document.getElementById("timelineContainer");
    container.innerHTML = "";

    const lista = filtro === "todos"
        ? hitosHistoricos
        : hitosHistoricos.filter(h => h.eje === filtro);

    lista.forEach(item => {
        const card = document.createElement("div");
        card.className = "timeline-card";
        card.innerHTML = `
            <div class="timeline-year">${item.anio}</div>
            <h4>${item.titulo}</h4>
            <p>${item.texto}</p>
        `;
        container.appendChild(card);
    });
}

const datosCorrientes = {
    romanticismo: {
        idea: "Primacía del sentimiento, la subjetividad, la libertad creadora y la exaltación de la naturaleza frente al industrialismo.",
        actores: "Lord Byron, Víctor Hugo, Eugène Delacroix, Caspar David Friedrich.",
        impacto: "Revalorizó la historia medieval y las tradiciones populares, sirviendo de base cultural al nacionalismo."
    },
    nacionalismo: {
        idea: "La nación (unida por lengua, historia y cultura) es la única fuente legítima de soberanía política.",
        actores: "Giuseppe Mazzini, movimientos de unificación italiana y alemana, revolucionarios de 1848.",
        impacto: "Cuestionó los imperios multinacionales del Congreso de Viena y reconfiguró el mapa europeo."
    },
    utopias: {
        idea: "Búsqueda de una sociedad justa e igualitaria mediante comunidades cooperativas y reforma moral sin lucha violenta.",
        actores: "Henri de Saint-Simon, Charles Fourier, Robert Owen.",
        impacto: "Sentó las bases del cooperativismo moderno y del pensamiento socialista posterior."
    }
};

function compararCorriente(clave, boton) {
    document.querySelectorAll(".comp-btn").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    const info = datosCorrientes[clave];
    document.getElementById("comparatorResult").innerHTML = `
        <div><strong>Idea Central:</strong><p>${info.idea}</p></div>
        <div><strong>Referentes / Actores:</strong><p>${info.actores}</p></div>
        <div><strong>Impacto Histórico:</strong><p>${info.impacto}</p></div>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
    renderNodos();
    renderTimeline();
    compararCorriente("romanticismo", document.querySelector(".comp-btn"));
});

window.addEventListener("resize", dibujarLineas);