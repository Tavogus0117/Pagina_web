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
        if (img.parentElement) {
            img.parentElement.innerHTML = `<span>IMAGEN: ${nombreBase.toUpperCase()}</span>`;
        }
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

    // Marcar la pestaña activa (si estamos en detalle-tema, ilumina Contexto histórico)
    const tabObjetivo = idPagina === "detalle-tema" ? "contexto" : idPagina;
    document.querySelectorAll(".nav-tab").forEach(tab => {
        tab.classList.remove("active");
        if (tab.dataset.page === tabObjetivo) {
            tab.classList.add("active");
        }
    });

    const numero = ordenPaginas.indexOf(tabObjetivo) + 1;
    document.getElementById("pageIndicator").textContent = `PÁGINA ${numero} DE ${ordenPaginas.length}`;

    if (idPagina === "red-historica") {
        setTimeout(dibujarLineas, 50);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 1.1 DESARROLLO COMPLETO DE CADA TEMA DEL CONTEXTO HISTÓRICO
// ==========================================
const temasDesarrollados = {
    postnapoleonico: {
        etiqueta: "EJE 01 • MUNDO POST-NAPOLEÓNICO (1815 – 1830)",
        titulo: "La Restauración Europea y el Sistema de Metternich",
        bajada: "Tras la derrota de Napoleón en Waterloo, las monarquías absolutas intentaron borrar veinticinco años de revolución y redibujar Europa según los intereses dinásticos.",
        imagenPrincipal: "tema_napoleon",
        parrafos: [
            "Entre septiembre de 1814 y junio de 1815, las grandes potencias vencedoras (Austria, Rusia, Prusia y Gran Bretaña) se reunieron en el <strong>Congreso de Viena</strong> bajo la dirección del canciller austríaco <strong>Klemens von Metternich</strong>. El objetivo era claro: restaurar en sus tronos a las dinastías legítimas depuestas por Napoleón y crear un equilibrio territorial que impidiera el surgimiento de una nueva potencia hegemónica.",
            "Para sostener este orden conservador se fundó la <strong>Santa Alianza</strong> (impulsada por el zar Alejandro I de Rusia), un pacto político-religioso que autorizaba la intervención militar en cualquier país donde estallara una revolución liberal o constitucional, como ocurrió en España e Italia entre 1820 y 1823.",
            "Sin embargo, el Congreso de Viena cometió un error histórico fundamental: trazó fronteras artificiales sin consultar la identidad cultural de los pueblos. Alemania quedó dividida en 39 Estados, Italia fragmentada bajo control austríaco y Polonia repartida, sembrando la semilla de las futuras revoluciones liberales y nacionales."
        ],
        datosClave: [
            "<strong>Principio de Legitimidad:</strong> Retorno de los reyes absolutos anteriores a 1789 (como Luis XVIII en Francia).",
            "<strong>Contención de Francia:</strong> Creación de Estados-tapón en sus fronteras (Reino de los Países Bajos y Confederación Germánica).",
            "<strong>Censura y vigilancia:</strong> Represión contra universidades, prensa libre y sociedades secretas como los Carbonarios."
        ],
        galeria: [
            { img: "napoleon_viena", pie: "El Congreso de Viena (1815): diplomáticos europeos redibujando el mapa tras la caída de Napoleón." },
            { img: "napoleon_mapa", pie: "Europa tras 1815: fronteras dinásticas que ignoraron las identidades nacionales." }
        ]
    },
    industrial: {
        etiqueta: "EJE 02 • REVOLUCIÓN INDUSTRIAL (SIGLO XIX)",
        titulo: "Mecanización, Urbanización y la Cuestión Social",
        bajada: "Mientras la política intentaba mirar hacia el pasado, la economía europea protagonizaba la transformación material más profunda desde el Neolítico.",
        imagenPrincipal: "tema_industria",
        parrafos: [
            "Iniciada en Gran Bretaña a finales del siglo XVIII y expandida hacia Bélgica, Francia y Alemania durante la primera mitad del siglo XIX, la <strong>Revolución Industrial</strong> sustituyó el trabajo manual y artesanal por la producción mecanizada en grandes fábricas movidas por la energía del vapor y el carbón.",
            "La expansión del ferrocarril y la navegación a vapor integraron los mercados nacionales y aceleraron el comercio internacional. Sin embargo, este crecimiento económico trajo consigo una profunda fractura social conocida como la <strong>cuestión social</strong>.",
            "Millones de campesinos emigraron a ciudades industriales como Manchester, Birmingham o Lyon, formando el <strong>proletariado urbano</strong>. Hombres, mujeres y niños trabajaban entre 14 y 16 horas diarias en fábricas insalubres, sin seguro médico, sin descanso dominical y viviendo en barrios hacinados, frente a una <strong>burguesía industrial</strong> que acumulaba el capital."
        ],
        datosClave: [
            "<strong>Nueva estructura de clases:</strong> La burguesía (dueña de fábricas y bancos) y el proletariado (trabajadores asalariados).",
            "<strong>Primeras protestas obreras:</strong> El movimiento ludita (destrucción de máquinas) y las primeras asociaciones sindicales (Trade Unions).",
            "<strong>Revolución en el transporte:</strong> Inauguración de las primeras líneas ferroviarias modernas (1825–1830)."
        ],
        galeria: [
            { img: "industria_fabrica", pie: "Interior de fábricas textiles mecanizadas: el nuevo ritmo de trabajo impuesto por la máquina." },
            { img: "industria_ciudad", pie: "Crecimiento urbano e industrial en Europa: chimeneas, ferrocarriles y barrios obreros." }
        ]
    },
    utopias: {
        etiqueta: "EJE 03 • UTOPÍAS SOCIALES (PRIMER SOCIALISMO)",
        titulo: "Propuestas Comunitarias frente a la Desigualdad Industrial",
        bajada: "Antes del marxismo, un grupo de pensadores y filántropos imaginó modelos de sociedad cooperativa para corregir las injusticias del capitalismo industrial.",
        imagenPrincipal: "tema_utopias",
        parrafos: [
            "El impacto humano de la Revolución Industrial llevó a diversos filósofos, economistas y empresarios reformistas a cuestionar el liberalismo económico sin límites. Posteriormente denominados <strong>socialistas utópicos</strong>, estos pensadores creían que era posible alcanzar una sociedad justa mediante la razón, la educación y el ejemplo comunitario, sin recurrir a la violencia revolucionaria.",
            "El empresario británico <strong>Robert Owen</strong> demostró en su fábrica textil de <em>New Lanark</em> (Escocia) que reducir la jornada laboral, mejorar los salarios, prohibir el trabajo infantil y construir escuelas gratuitas aumentaba tanto el bienestar obrero como la productividad.",
            "Por su parte, el francés <strong>Charles Fourier</strong> propuso la creación de los <em>falansterios</em> —comunidades autosuficientes de unas 1.600 personas donde el trabajo se rotaba según la vocación de cada individuo—, mientras <strong>Henri de Saint-Simon</strong> defendió una sociedad dirigida por científicos, ingenieros y productores útiles en lugar de nobles ociosos."
        ],
        datosClave: [
            "<strong>Robert Owen (1771–1858):</strong> Pionero del cooperativismo moderno y de la legislación laboral protectora.",
            "<strong>Charles Fourier (1772–1837):</strong> Crítico de la monotonía fabril e ideólogo de las comunidades armónicas (falansterios).",
            "<strong>Henri de Saint-Simon (1760–1825):</strong> Propuso reorganizar la sociedad bajo criterios científicos e industriales."
        ],
        galeria: [
            { img: "utopias_owen", pie: "New Lanark (Escocia): la comunidad industrial modelo impulsada por Robert Owen." },
            { img: "utopias_falansterio", pie: "Diseño arquitectónico de un Falansterio según los planos comunitarios de Charles Fourier." }
        ]
    },
    romanticismo: {
        etiqueta: "EJE 04 • ROMANTICISMO Y NACIONALISMO (1815 – 1848)",
        titulo: "La Rebelión del Sentimiento y el Despertar de las Naciones",
        bajada: "El arte, la literatura y la filosofía romántica rescataron las raíces históricas de los pueblos, convirtiendo la identidad cultural en bandera política de libertad.",
        imagenPrincipal: "tema_romanticismo",
        parrafos: [
            "Como reacción frente al racionalismo frío de la Ilustración y la uniformidad gris de las ciudades industriales, surgió el <strong>Romanticismo</strong>. Este movimiento cultural exaltó las pasiones humanas, la libertad creadora, la naturaleza indómita y la rebeldía contra toda forma de opresión.",
            "A través del concepto alemán del <em>Volksgeist</em> (el 'espíritu del pueblo' formulado por Herder), los románticos comenzaron a recopilar cuentos tradicionales, canciones folclóricas, lenguas locales e historia medieval. Esta búsqueda de identidad propia alimentó directamente al <strong>Nacionalismo</strong>.",
            "El nacionalismo sostuvo que cada pueblo con historia, lengua y cultura comunes constituía una <strong>nación</strong> con derecho a gobernarse como Estado soberano. Esta fuerza impulsó la independencia de Grecia (1829) y Bélgica (1830), inspiró a líderes como <strong>Giuseppe Mazzini</strong> en Italia y culminó en las revoluciones europeas de <strong>1848</strong>, conocidas como la <em>Primavera de los Pueblos</em>."
        ],
        datosClave: [
            "<strong>Arte comprometido:</strong> Obras como <em>La Libertad guiando al pueblo</em> (1830) de Eugène Delacroix simbolizaron la lucha revolucionaria.",
            "<strong>Mazzini y la Joven Italia:</strong> Movimiento juvenil que luchó por la unificación republicana de Italia frente a Austria.",
            "<strong>La Primavera de los Pueblos (1848):</strong> Oleada revolucionaria en París, Viena, Berlín y Milán que derrumbó el sistema de Metternich."
        ],
        galeria: [
            { img: "romanticismo_delacroix", pie: "La Libertad guiando al pueblo (Eugène Delacroix, 1830): ícono del romanticismo revolucionario." },
            { img: "romanticismo_1848", pie: "Barricadas de 1848: la unión de demandas liberales, nacionales y obreras en Europa." }
        ]
    }
};

function abrirDetalleTema(claveTema) {
    const tema = temasDesarrollados[claveTema];
    if (!tema) return;

    // Botones superiores para cambiar rápido entre los 4 temas sin volver atrás
    const nombresCortos = {
        postnapoleonico: "01. Mundo Post-Napoleónico",
        industrial: "02. Revolución Industrial",
        utopias: "03. Utopías Sociales",
        romanticismo: "04. Romanticismo y Nacionalismo"
    };

    const switcher = document.getElementById("detailSwitcher");
    switcher.innerHTML = Object.keys(temasDesarrollados).map(key => `
        <button class="switch-pill ${key === claveTema ? 'active' : ''}" onclick="abrirDetalleTema('${key}')">
            ${nombresCortos[key]}
        </button>
    `).join("");

    // Renderizar el contenido completo del tema seleccionado
    const container = document.getElementById("topicFullContainer");
    container.innerHTML = `
        <div class="topic-full-hero">
            <div>
                <span class="section-kicker" style="color:#93c5fd;">${tema.etiqueta}</span>
                <h2>${tema.titulo}</h2>
                <p>${tema.bajada}</p>
            </div>
            <div class="topic-full-hero-img">
                <img src="${tema.imagenPrincipal}.jpg" alt="${tema.titulo}" onerror="probarExtensiones(this, '${tema.imagenPrincipal}')">
            </div>
        </div>

        <div class="topic-content-grid">
            <div class="topic-narrative">
                <h3>Desarrollo Histórico</h3>
                ${tema.parrafos.map(p => `<p>${p}</p>`).join("")}
            </div>
            <aside class="topic-sidebar-box">
                <h4><i class="fa-solid fa-bookmark" style="color:#ff1744; margin-right:6px;"></i> Claves del Periodo</h4>
                <ul class="topic-key-list">
                    ${tema.datosClave.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </aside>
        </div>

        <h3 class="topic-gallery-title">Evidencia Visual e Ilustraciones Históricas</h3>
        <div class="topic-gallery-grid">
            ${tema.galeria.map(foto => `
                <figure class="gallery-figure">
                    <div class="gallery-figure-img">
                        <img src="${foto.img}.jpg" alt="${foto.pie}" onerror="probarExtensiones(this, '${foto.img}')">
                    </div>
                    <figcaption>${foto.pie}</figcaption>
                </figure>
            `).join("")}
        </div>
    `;

    cambiarPagina("detalle-tema");
}

// ==========================================
// 2. RED INTERACTIVA DE RELACIONES HISTÓRICAS
// ==========================================
const nodosHistoricos = [
    {
        id: "viena",
        titulo: "Congreso de Viena (1815)",
        tipo: "causa",
        etiqueta: "CAUSA POLÍTICA",
        descripcion: "Cumbre diplomática liderada por Austria, Rusia, Prusia y Gran Bretaña tras derrotar a Napoleón. Restauró las monarquías absolutas y trazó fronteras artificiales sin respetar las nacionalidades.",
        conectados: ["metternich", "nacionalismo", "rev1848"],
        justificacion: [
            "Conecta con Metternich y la Santa Alianza: Creó el sistema policial y militar europeo para reprimir el liberalismo.",
            "Detona el Nacionalismo: Al dejar divididas a Alemania e Italia y someter a Polonia o Bélgica, despertó el deseo de independencia.",
            "Conduce a las Revoluciones de 1848: El bloqueo político acumulado estalló en la 'Primavera de los Pueblos'."
        ]
    },
    {
        id: "industrial",
        titulo: "Revolución Industrial",
        tipo: "causa",
        etiqueta: "CAUSA ECONÓMICA",
        descripcion: "Transformación productiva basada en la máquina de vapor, el carbón, el ferrocarril y la fábrica moderna. Consolidó el capitalismo industrial y transformó la vida urbana.",
        conectados: ["clases", "utopias", "romanticismo"],
        justificacion: [
            "Origina a la Burguesía y al Proletariado: Reemplazó la sociedad estamental por una sociedad de clases definida por el capital.",
            "Motiva las Utopías Sociales: La pobreza obrera y el trabajo infantil llevaron a reformadores a proponer modelos alternativos.",
            "Provoca la reacción del Romanticismo: Los artistas románticos rechazaron la mecanización y la destrucción de la naturaleza."
        ]
    },
    {
        id: "metternich",
        titulo: "Metternich y Santa Alianza",
        tipo: "actor",
        etiqueta: "ACTORES CONSERVADORES",
        descripcion: "El canciller austríaco Klemens von Metternich fue el arquitecto del orden conservador europeo, defendiendo el derecho de intervención para sofocar constituciones liberales.",
        conectados: ["viena", "rev1848"],
        justificacion: [
            "Ejecutor del Congreso de Viena: Impuso censura de prensa y persecución contra sociedades secretas como los Carbonarios italianos.",
            "Caída en 1848: Las protestas populares en Viena obligaron a Metternich a dimitir y huir en marzo de 1848."
        ]
    },
    {
        id: "clases",
        titulo: "Burguesía y Proletariado",
        tipo: "actor",
        etiqueta: "ACTORES SOCIALES",
        descripcion: "La burguesía exigía participación política y libre comercio frente a la nobleza, mientras el proletariado luchaba por salarios dignos, reducción de jornada y derecho de asociación.",
        conectados: ["industrial", "utopias", "rev1848"],
        justificacion: [
            "Protagonistas de las Utopías Sociales: Fueron el objeto de estudio y experimentación social de Owen y Fourier.",
            "Fuerza de choque en 1848: La alianza temporal (y luego ruptura) entre burgueses y obreros marcó el rumbo de 1848."
        ]
    },
    {
        id: "utopias",
        titulo: "Utopías Sociales (Owen, Fourier)",
        tipo: "consecuencia",
        etiqueta: "IDEOLOGÍA SOCIAL",
        descripcion: "Corriente del primer socialismo (Saint-Simon, Fourier, Owen) que buscó superar la explotación industrial creando comunidades cooperativas modelo (falansterios y colonias).",
        conectados: ["industrial", "clases"],
        justificacion: [
            "Respuesta pacífica a la Revolución Industrial: Planteó que la educación, la ciencia y la cooperación eliminarían la miseria obrera."
        ]
    },
    {
        id: "romanticismo",
        titulo: "Romanticismo (1800–1850)",
        tipo: "consecuencia",
        etiqueta: "MOVIMIENTO CULTURAL",
        descripcion: "Movimiento cultural (Víctor Hugo, Byron, Delacroix, Herder) que exaltó el sentimiento, la rebeldía, la naturaleza salvaje y el espíritu propio de cada pueblo (Volksgeist).",
        conectados: ["industrial", "nacionalismo"],
        justificacion: [
            "Base cultural del Nacionalismo: Al rescatar las lenguas, leyendas medievales y folclore local, dio identidad simbólica a las naciones."
        ]
    },
    {
        id: "nacionalismo",
        titulo: "Nacionalismo y Mazzini",
        tipo: "consecuencia",
        etiqueta: "IDEOLOGÍA POLÍTICA",
        descripcion: "Movimiento que defendía que cada nación con historia y lengua propias debía formar un Estado independiente y soberano (ej. 'La Joven Italia' de Giuseppe Mazzini).",
        conectados: ["viena", "romanticismo", "rev1848"],
        justificacion: [
            "Desafío directo al Congreso de Viena: Cuestionó la existencia de imperios multinacionales como el Austríaco y el Otomano."
        ]
    },
    {
        id: "rev1848",
        titulo: "Revoluciones de 1848",
        tipo: "acontecimiento",
        etiqueta: "ACONTECIMIENTO CLAVE",
        descripcion: "Conocida como la 'Primavera de los Pueblos', fue una oleada revolucionaria simultánea en Francia, Alemania, Italia y Austria que combinó demandas liberales, nacionales y obreras.",
        conectados: ["viena", "metternich", "clases", "nacionalismo"],
        justificacion: [
            "Síntesis de todo el proceso: Demostró que el orden post-napoleónico había caducado y que las masas urbanas y nacionales eran los nuevos actores de la historia."
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
                line.setAttribute("stroke", "rgba(147, 197, 253, 0.35)");
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
    "<strong>Evidencia y tesis:</strong> Se analiza cómo el mapa trazado por Metternich en 1815 subordinó el principio de nacionalidad a los intereses de las casas reales, creando una tensión permanente en Europa central e Italia.",
    "<strong>Evidencia y tesis:</strong> Se documenta el crecimiento explosivo de ciudades industriales como Manchester, el impacto del vapor y el nacimiento del movimiento obrero frente a la falta de leyes laborales.",
    "<strong>Evidencia y tesis:</strong> Se explican las experiencias concretas de New Lanark (Robert Owen) y los falansterios (Charles Fourier) como intentos de reorganizar la producción con justicia social.",
    "<strong>Evidencia y tesis:</strong> Se muestra cómo la pintura (Delacroix), la literatura y la música romántica impulsaron las revoluciones liberales y nacionales de 1830 y 1848."
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
    { anio: "1815", titulo: "Congreso de Viena y Santa Alianza", eje: "restauracion", texto: "Tras Waterloo, las potencias restauran el absolutismo y redibujan Europa bajo el principio de equilibrio." },
    { anio: "1816", titulo: "Colonia Cooperativa de New Lanark", eje: "industria", texto: "Robert Owen demuestra en Escocia que reducir la jornada laboral y educar a los hijos de obreros mejora la sociedad." },
    { anio: "1821–1829", titulo: "Independencia de Grecia", eje: "nacionalismo", texto: "Grecia se libera del Imperio Otomano con apoyo de intelectuales románticos europeos como Lord Byron." },
    { anio: "1830", titulo: "Revoluciones de 1830 y Delacroix", eje: "nacionalismo", texto: "Cae el absolutismo en Francia, Bélgica logra su independencia y Delacroix pinta 'La Libertad guiando al pueblo'." },
    { anio: "1833", titulo: "Factory Act en Gran Bretaña", eje: "industria", texto: "Primera ley relevante que limita el trabajo infantil en las fábricas textiles tras las denuncias sociales." },
    { anio: "1848", titulo: "La Primavera de los Pueblos", eje: "restauracion", texto: "Estallido revolucionario en París, Viena, Berlín y Milán que marca el fin definitivo del sistema de Metternich." }
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
        idea: "Rechazó el racionalismo frío de la Ilustración y la fealdad de las ciudades industriales, reivindicando la emoción, la libertad individual, la naturaleza y la historia medieval.",
        actores: "Johann Gottfried Herder, Lord Byron, Víctor Hugo, Eugène Delacroix, Caspar David Friedrich.",
        impacto: "Despertó el interés por las lenguas, canciones y tradiciones populares, proporcionando la base emocional y cultural del nacionalismo europeo."
    },
    nacionalismo: {
        idea: "Sostenía que la soberanía reside en la nación —entendida como una comunidad unida por historia, lengua y cultura— y no en el patrimonio hereditario de un rey.",
        actores: "Giuseppe Mazzini ('La Joven Italia'), Simón Bolívar (en América), movimientos unificadores de Alemania e Italia.",
        impacto: "Desafió las fronteras impuestas por el Congreso de Viena en 1815 y condujo a la creación de nuevos Estados nacionales en el siglo XIX."
    },
    utopias: {
        idea: "Denunció las desigualdades extremas del capitalismo industrial, proponiendo comunidades igualitarias basadas en la cooperación y la planificación racional del trabajo.",
        actores: "Henri de Saint-Simon, Charles Fourier (falansterios) y Robert Owen (cooperativismo).",
        impacto: "Sentó las bases del movimiento cooperativo moderno, del sindicalismo y de las corrientes socialistas posteriores."
    }
};

function compararCorriente(clave, boton) {
    document.querySelectorAll(".comp-btn").forEach(b => b.classList.remove("active"));
    boton.classList.add("active");
    const info = datosCorrientes[clave];
    document.getElementById("comparatorResult").innerHTML = `
        <div><strong>¿Qué planteaba?:</strong><p>${info.idea}</p></div>
        <div><strong>Exponentes clave:</strong><p>${info.actores}</p></div>
        <div><strong>Impacto histórico:</strong><p>${info.impacto}</p></div>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
    renderNodos();
    renderTimeline();
    compararCorriente("romanticismo", document.querySelector(".comp-btn"));
});

window.addEventListener("resize", dibujarLineas);