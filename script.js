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
            img.parentElement.innerHTML = `<span>FOTO: ${nombreBase.toUpperCase()}</span>`;
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
        etiqueta: "EJE 01 • MUNDO POST-NAPOLEÓNICO (1814 – 1815)",
        titulo: "El Congreso de Viena y el Equilibrio de Poderes en Europa",
        bajada: "Con Napoleón vencido y recluido en la isla de Elba en 1814, Francisco I de Austria convocó en Viena la mayor cumbre diplomática del siglo XIX para reorganizar Europa tras veinticinco años de guerras.",
        imagenPrincipal: "tema_napoleon",
        bloquesTexto: [
            {
                subtitulo: "La caída de Napoleón y la inauguración en el Palacio del Hofburg",
                parrafos: [
                    "Tras su derrota en <strong>Leipzig</strong> (19 de octubre de 1813) y la entrada de los aliados en París el 31 de marzo de 1814, Napoleón abdicó incondicionalmente el 11 de abril. Se le permitió conservar el título de emperador y recibió el principado de la <strong>isla de Elba</strong>, donde se instaló con una pequeña corte, 400 miembros de la Vieja Guardia y un escuadrón de caballería polaca.",
                    "Con Bonaparte recluido, el <strong>1 de noviembre de 1814</strong> se inauguró oficialmente el <strong>Congreso de Viena</strong> en el Palacio del Hofburg, convocado por el emperador Francisco I de Austria. Asistieron representantes de todos los Estados europeos —incluidos el Papado y el Imperio otomano—, convirtiendo a Viena en el centro de una intensa diplomacia social entre veladas, bailes y conciertos (como el estreno de <em>El momento glorioso</em> de Beethoven)."
                ]
            },
            {
                subtitulo: "El equilibrio de poderes frente a la idea de Restauración",
                parrafos: [
                    "Más que volver exactamente a 1789, <strong>Castlereagh, Metternich y Talleyrand</strong> buscaron garantizar «las libertades de Europa»: un equilibrio de poder entre las potencias continentales que impidiera que un solo Estado —como la Francia napoleónica o una Rusia en expansión— dominara el continente, dejando intacto el dominio británico sobre los mares.",
                    "Para distribuir el poder, una comisión estadística calculó el número de habitantes de cada territorio transferido. Se asumió la desaparición del antiguo Sacro Imperio Romano Germánico (creando la <strong>Confederación Germánica</strong> de 39 Estados) y se trazaron fronteras estratégicas, aunque el regreso de Napoleón durante el <strong>Imperio de los Cien Días</strong> (marzo–junio de 1815) y su derrota final en <strong>Waterloo</strong> endurecieron las condiciones impuestas a Francia (pérdida del Sarre, indemnización y ocupación militar)."
                ]
            },
            {
                subtitulo: "Un orden duradero entre Estados, pero inestable en los pueblos",
                parrafos: [
                    "El Acta Final del Congreso se firmó el <strong>9 de junio de 1815</strong>, nueve días antes de Waterloo. Hasta 1914, solo las guerras de unificación italiana (1861) y alemana (1871) modificaron el mapa europeo.",
                    "Sin embargo, al asegurar la independencia de los Estados prescindiendo de los derechos nacionales y democráticos de los pueblos, el Congreso de Viena dejó sembradas las semillas de constantes revoluciones liberales y nacionalistas a lo largo de todo el siglo XIX."
                ]
            }
        ],
        datosClave: [
            "<strong>Sede e inicio:</strong> Palacio del Hofburg (Viena), inaugurado el 1 de noviembre de 1814 tras la abdicación de Napoleón y su exilio en Elba.",
            "<strong>Cuádruple Alianza:</strong> Reino Unido, Rusia, Austria y Prusia, articulados diplomáticamente por Lord Castlereagh.",
            "<strong>Nuevo mapa europeo:</strong> Rusia obtuvo gran parte de Polonia y Finlandia; Suecia recibió Noruega; Prusia ganó Renania, Westfalia y parte de Sajonia; Austria incorporó Lombardía y el Véneto.",
            "<strong>Estados-tapón contra Francia:</strong> Unión de Bélgica y Holanda en el Reino de los Países Bajos, y ampliación del Reino de Cerdeña con Génova.",
            "<strong>Acta Final (9 de junio de 1815):</strong> Firmada nueve días antes de la derrota definitiva de Napoleón en Waterloo."
        ],
        protagonistas: [
            {
                nombre: "Lord Castlereagh",
                cargo: "Ministro de Exteriores Británico",
                foto: "castlereagh",
                texto: "Artífice de la Cuádruple Alianza. Impuso la visión británica de un equilibrio de poderes en el continente que asegurara la paz europea mientras Gran Bretaña conservaba su hegemonía marítima (Malta, El Cabo, Mauricio y Ceilán)."
            },
            {
                nombre: "Klemens von Metternich",
                cargo: "Canciller del Imperio Austríaco",
                foto: "metternich",
                texto: "Primer ministro austríaco (1809–1848). Frenó las ambiciones territoriales de Rusia y Prusia, supervisó los festivales diplomáticos de Viena y forjó una estrecha alianza con Castlereagh para sostener el orden conservador."
            },
            {
                nombre: "Charles-Maurice de Talleyrand",
                cargo: "Diplomático y Ministro Francés",
                foto: "talleyrand",
                texto: "Tras servir a la Revolución y a Napoleón, representó a Luis XVIII de Borbón. Con gran habilidad diplomática apoyó a Gran Bretaña y Austria frente a Prusia y Rusia, logrando conservar casi intactas las fronteras francesas de 1792."
            },
            {
                nombre: "Zar Alejandro I",
                cargo: "Emperador de Rusia",
                foto: "alejandro1",
                texto: "Su ejército fue decisivo para derrotar a Napoleón. Ambicionaba anexionar toda Polonia y apoyar a Prusia en Sajonia, pero ante la oposición de Austria, Gran Bretaña y Francia aceptó un reparto equilibrado en enero de 1815."
            }
        ],
        galeria: [
            {
                img: "hofburg_viena",
                pie: "Palacio del Hofburg en Viena: sede oficial donde se reunieron los ministros de Exteriores y soberanos europeos en 1814–1815."
            },
            {
                img: "napoleon_waterloo",
                pie: "De Elba a Waterloo (1815): tras escapar de Elba durante los Cien Días, Napoleón fue derrotado definitivamente por Wellington."
            }
        ],
        tieneComparadorMapas: true
    },
    industrial: {
        etiqueta: "EJE 02 • REVOLUCIÓN INDUSTRIAL (SIGLO XIX)",
        titulo: "Mecanización, Urbanización y la Cuestión Social",
        bajada: "Mientras la política intentaba mirar hacia el pasado, la economía europea protagonizaba la transformación material más profunda desde el Neolítico.",
        imagenPrincipal: "tema_industria",
        bloquesTexto: [
            {
                subtitulo: "De los talleres artesanales a la era del vapor",
                parrafos: [
                    "Iniciada en Gran Bretaña a finales del siglo XVIII y expandida hacia Bélgica, Francia y Alemania durante la primera mitad del siglo XIX, la <strong>Revolución Industrial</strong> sustituyó el trabajo manual por la producción mecanizada en grandes fábricas movidas por la energía del vapor y el carbón.",
                    "La expansión del ferrocarril y la navegación a vapor integraron los mercados nacionales y aceleraron el comercio internacional, consolidando el capitalismo industrial."
                ]
            },
            {
                subtitulo: "El nacimiento del proletariado y la cuestión social",
                parrafos: [
                    "Millones de campesinos emigraron a ciudades industriales como Manchester, Birmingham o Lyon, formando el <strong>proletariado urbano</strong>. Hombres, mujeres y niños trabajaban entre 14 y 16 horas diarias en fábricas insalubres, sin seguro médico ni descanso dominical, frente a una <strong>burguesía industrial</strong> dueña del capital."
                ]
            }
        ],
        datosClave: [
            "<strong>Nueva estructura de clases:</strong> La burguesía (dueña de fábricas y bancos) y el proletariado (trabajadores asalariados).",
            "<strong>Primeras protestas obreras:</strong> El movimiento ludita (destrucción de máquinas) y las primeras asociaciones sindicales (Trade Unions).",
            "<strong>Revolución en el transporte:</strong> Inauguración de las primeras líneas ferroviarias modernas (1825–1830)."
        ],
        protagonistas: [
            {
                nombre: "James Watt",
                cargo: "Ingeniero e Inventor Escocés",
                foto: "watt",
                texto: "Perfeccionó la máquina de vapor, motor fundamental que permitió mecanizar las fábricas textiles, la minería y el transporte ferroviario."
            },
            {
                nombre: "George Stephenson",
                cargo: "Pionero del Ferrocarril",
                foto: "stephenson",
                texto: "Diseñó la locomotora 'Rocket' y la primera línea ferroviaria pública moderna entre Liverpool y Manchester (1830), revolucionando el transporte."
            },
            {
                nombre: "Ned Ludd (Movimiento Ludita)",
                cargo: "Resistencia Obrera Inicial",
                foto: "luditas",
                texto: "Símbolo de los artesanos y obreros textiles ingleses que destruyeron telares mecánicos en protesta por la pérdida de empleos y la caída de salarios."
            },
            {
                nombre: "La Burguesía Industrial",
                cargo: "Nueva Élite Económica",
                foto: "burguesia",
                texto: "Clase social propietaria de las fábricas, minas y bancos que desplazó gradualmente a la nobleza terrateniente como motor económico europeo."
            }
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
        bloquesTexto: [
            {
                subtitulo: "Crítica pacífica al capitalismo sin regulación",
                parrafos: [
                    "El impacto humano de la Revolución Industrial llevó a diversos filósofos y empresarios reformistas a cuestionar el liberalismo económico sin límites. Denominados posteriormente <strong>socialistas utópicos</strong>, creían que era posible alcanzar una sociedad justa mediante la razón, la educación y el ejemplo comunitario, sin recurrir a la violencia revolucionaria."
                ]
            },
            {
                subtitulo: "Experimentos cooperativos y comunidades armónicas",
                parrafos: [
                    "Desde las fábricas modelo de <strong>Robert Owen</strong> en Escocia hasta los <em>falansterios</em> ideados por <strong>Charles Fourier</strong> en Francia, estas propuestas buscaban dignificar el trabajo, eliminar la miseria obrera y armonizar la producción con el bienestar humano."
                ]
            }
        ],
        datosClave: [
            "<strong>Cooperativismo laboral:</strong> Reducción de jornada, prohibición del trabajo infantil y educación gratuita para hijos de obreros.",
            "<strong>Organización comunitaria:</strong> Creación de comunidades autosuficientes basadas en el trabajo vocacional y la propiedad compartida.",
            "<strong>Reforma pacífica:</strong> Confianza en la filantropía, la ciencia y el ejemplo práctico para transformar la sociedad."
        ],
        protagonistas: [
            {
                nombre: "Robert Owen",
                cargo: "Empresario y Reformador Británico",
                foto: "owen",
                texto: "Transformó su fábrica textil de New Lanark (Escocia) reduciendo la jornada laboral, mejorando salarios y creando escuelas, sentando las bases del cooperativismo."
            },
            {
                nombre: "Charles Fourier",
                cargo: "Filósofo Social Francés",
                foto: "fourier",
                texto: "Criticó la monotonía del trabajo fabril y diseñó los 'falansterios': comunidades armónicas de 1.600 personas donde cada miembro trabajaba según su vocación."
            },
            {
                nombre: "Henri de Saint-Simon",
                cargo: "Pensador Francés",
                foto: "saintsimon",
                texto: "Propuso una sociedad planificada y dirigida por los 'productores' (científicos, ingenieros, industriales y obreros) en lugar de la aristocracia ociosa."
            },
            {
                nombre: "Flora Tristán",
                cargo: "Pensadora y Activista Social",
                foto: "floratristan",
                texto: "Precursora del socialismo y el feminismo moderno; abogó por la 'Unión Obrera' internacional y vinculó la emancipación de los trabajadores con la de la mujer."
            }
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
        bloquesTexto: [
            {
                subtitulo: "El espíritu del pueblo (Volksgeist) y la rebeldía romántica",
                parrafos: [
                    "Como reacción frente al racionalismo frío de la Ilustración y la uniformidad gris de las ciudades industriales, el <strong>Romanticismo</strong> exaltó las pasiones humanas, la libertad individual y la historia propia de cada pueblo (<em>Volksgeist</em>).",
                    "Al recopilar lenguas locales, leyendas medievales y folclore popular, los románticos proporcionaron la base cultural que impulsó al <strong>Nacionalismo</strong> europeo."
                ]
            },
            {
                subtitulo: "De las oleadas revolucionarias a la Primavera de los Pueblos",
                parrafos: [
                    "Frente a un Congreso de Viena que había dividido naciones enteras como Italia y Alemania, el nacionalismo exigió que cada comunidad cultural formara un Estado soberano. Esta fuerza estalló en la independencia de Grecia (1829), las revoluciones de 1830 y la gran oleada de <strong>1848</strong>."
                ]
            }
        ],
        datosClave: [
            "<strong>Volksgeist (Espíritu del pueblo):</strong> Valoración de la lengua, la historia y las tradiciones propias como fundamento de la nación.",
            "<strong>Soberanía Nacional:</strong> Derecho de cada pueblo a constituirse en un Estado libre e independiente.",
            "<strong>La Primavera de los Pueblos (1848):</strong> Revoluciones simultáneas en París, Viena, Berlín y Milán que derrumbaron el sistema de Metternich."
        ],
        protagonistas: [
            {
                nombre: "Johann Gottfried Herder",
                cargo: "Filósofo Alemán",
                foto: "herder",
                texto: "Formuló el concepto del 'Volksgeist' (espíritu del pueblo), defendiendo que cada nación posee una cultura, lengua y alma histórica únicas."
            },
            {
                nombre: "Giuseppe Mazzini",
                cargo: "Líder Nacionalista Italiano",
                foto: "mazzini",
                texto: "Fundador del movimiento 'La Joven Italia' (1831). Luchó incansablemente por la unificación republicana de Italia frente al dominio austríaco."
            },
            {
                nombre: "Eugène Delacroix",
                cargo: "Pintor Romántico Francés",
                foto: "delacroix",
                texto: "Autor de 'La Libertad guiando al pueblo' (1830), obra maestra que inmortalizó la alianza entre la burguesía y el pueblo en las barricadas revolucionarias."
            },
            {
                nombre: "Lord Byron",
                cargo: "Poeta Romántico Británico",
                foto: "byron",
                texto: "Encarnó el ideal del héroe romántico comprometido con la libertad de los pueblos; viajó a luchar por la independencia de Grecia, donde falleció en 1824."
            }
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

    const container = document.getElementById("topicFullContainer");

    // Renderizar bloques de narrativa histórica
    const narrativaHTML = tema.bloquesTexto.map(bloque => `
        <h3>${bloque.subtitulo}</h3>
        ${bloque.parrafos.map(p => `<p>${p}</p>`).join("")}
    `).join("");

    // Renderizar apartado de protagonistas con foto
    const protagonistasHTML = tema.protagonistas ? `
        <section class="figures-section">
            <h3 class="topic-gallery-title">Protagonistas y Actores Clave</h3>
            <p class="topic-gallery-subtitle">Figuras históricas que definieron el rumbo de este proceso:</p>
            <div class="figures-grid">
                ${tema.protagonistas.map(pers => `
                    <article class="figure-card">
                        <div class="figure-photo">
                            <img src="${pers.foto}.jpg" alt="${pers.nombre}" onerror="probarExtensiones(this, '${pers.foto}')">
                        </div>
                        <div class="figure-info">
                            <span class="figure-role-badge">${pers.cargo}</span>
                            <h4>${pers.nombre}</h4>
                            <p>${pers.texto}</p>
                        </div>
                    </article>
                `).join("")}
            </div>
        </section>
    ` : "";

    // Renderizar galería de escenarios y hechos
    const galeriaHTML = tema.galeria ? `
        <h3 class="topic-gallery-title">Escenarios y Acontecimientos Históricos</h3>
        <p class="topic-gallery-subtitle">Registro visual de los lugares y sucesos mencionados:</p>
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
    ` : "";

    // Comparador de mapas (exclusivo para Eje 01)
    let comparadorMapasHTML = "";
    if (tema.tieneComparadorMapas) {
        comparadorMapasHTML = `
            <h3 class="topic-gallery-title">¿Cómo quedó Europa tras el Congreso de Viena?</h3>
            <p class="topic-gallery-subtitle">Desliza la barra hacia la derecha o usa los botones para comparar el mapa de Europa antes y después del Congreso de Viena (1815):</p>

            <div class="map-slider-section">
                <div class="map-slider-controls">
                    <button class="map-step-btn" onclick="ajustarComparadorMapa(100)">1. Europa Napoleónica (Antes)</button>
                    <div class="map-range-wrapper">
                        <span>Antes</span>
                        <input type="range" id="mapRangeInput" min="0" max="100" value="50" oninput="actualizarDeslizadorMapa(this.value)">
                        <span>Después (1815)</span>
                    </div>
                    <button class="map-step-btn active" onclick="ajustarComparadorMapa(0)">2. Europa tras Viena (Después)</button>
                </div>

                <div class="map-compare-frame">
                    <div class="map-layer">
                        <span class="map-label-tag map-label-right">DESPUÉS • EUROPA TRAS VIENA (1815)</span>
                        <img src="mapa_viena.jpg" alt="Mapa de Europa tras el Congreso de Viena 1815" onerror="probarExtensiones(this, 'mapa_viena')">
                    </div>

                    <div class="map-layer map-layer-top" id="mapTopLayer">
                        <span class="map-label-tag map-label-left">ANTES • EUROPA NAPOLEÓNICA (1812)</span>
                        <img src="mapa_napoleon.jpg" alt="Mapa de Europa Napoleónica" onerror="probarExtensiones(this, 'mapa_napoleon')">
                    </div>

                    <div class="map-divider-line" id="mapDividerLine">
                        <div class="map-divider-handle"><i class="fa-solid fa-arrows-left-right"></i></div>
                    </div>
                </div>

                <div class="map-info-caption" id="mapCaptionBox">
                    <strong>Reconfiguración territorial tras 1815:</strong> Rusia incorporó gran parte de Polonia y Finlandia (compensando a Suecia con Noruega); Prusia recibió Renania, Westfalia y dos quintas partes de Sajonia; Austria obtuvo Lombardía y el Véneto; y Francia quedó rodeada por el nuevo Reino de los Países Bajos (Bélgica y Holanda) y el ampliado Reino de Cerdeña.
                </div>
            </div>
        `;
    }

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
                ${narrativaHTML}
            </div>
            <aside class="topic-sidebar-box">
                <h4><i class="fa-solid fa-bookmark" style="color:#ff1744; margin-right:6px;"></i> Claves del Periodo</h4>
                <ul class="topic-key-list">
                    ${tema.datosClave.map(item => `<li>${item}</li>`).join("")}
                </ul>
            </aside>
        </div>

        ${protagonistasHTML}
        ${galeriaHTML}
        ${comparadorMapasHTML}
    `;

    cambiarPagina("detalle-tema");
}

// Funciones del comparador deslizable de mapas
function actualizarDeslizadorMapa(valor) {
    const porcentaje = parseInt(valor, 10);
    const topLayer = document.getElementById("mapTopLayer");
    const divider = document.getElementById("mapDividerLine");
    const caption = document.getElementById("mapCaptionBox");

    if (topLayer && divider) {
        topLayer.style.clipPath = `inset(0 ${100 - porcentaje}% 0 0)`;
        divider.style.left = `${porcentaje}%`;
    }

    if (caption) {
        if (porcentaje > 65) {
            caption.innerHTML = "<strong>Antes del Congreso de Viena (Imperio Napoleónico):</strong> Gran parte de Europa estaba bajo el dominio directo de Francia o de Estados aliados como el Gran Ducado de Varsovia, rompiendo las fronteras tradicionales y disolviendo el Sacro Imperio Romano Germánico.";
        } else if (porcentaje < 35) {
            caption.innerHTML = "<strong>Después del Congreso de Viena (1815):</strong> Se creó la Confederación Germánica de 39 Estados; Rusia obtuvo Polonia y Finlandia; Prusia y Austria actuaron como dique frente a Francia y Rusia; y se formaron Estados-tapón como el Reino de los Países Bajos y el Reino de Cerdeña.";
        } else {
            caption.innerHTML = "<strong>Reconfiguración territorial tras 1815:</strong> Rusia incorporó gran parte de Polonia y Finlandia (compensando a Suecia con Noruega); Prusia recibió Renania, Westfalia y dos quintas partes de Sajonia; Austria obtuvo Lombardía y el Véneto; y Francia quedó rodeada por el Reino de los Países Bajos y el Reino de Cerdeña.";
        }
    }
}

function ajustarComparadorMapa(valor) {
    const range = document.getElementById("mapRangeInput");
    if (range) {
        range.value = valor;
    }
    actualizarDeslizadorMapa(valor);
}

// ==========================================
// 2. RED INTERACTIVA DE RELACIONES HISTÓRICAS
// ==========================================
const nodosHistoricos = [
    {
        id: "viena",
        titulo: "Congreso de Viena (1814–1815)",
        tipo: "causa",
        etiqueta: "CAUSA POLÍTICA",
        descripcion: "Cumbre diplomática en el Palacio del Hofburg tras derrotar a Napoleón en Leipzig y Waterloo. Buscó el equilibrio de poderes entre las potencias y redibujó las fronteras europeas.",
        conectados: ["metternich", "nacionalismo", "rev1848"],
        justificacion: [
            "Conecta con Metternich y Castlereagh: Impulsaron un equilibrio continental para evitar el dominio de una sola potencia.",
            "Detona el Nacionalismo: Al asegurar los Estados prescindiendo de los derechos de los pueblos, impulsó las unificaciones de Italia (1861) y Alemania (1871).",
            "Conduce a las Revoluciones de 1848: Las tensiones acumuladas estallaron en constantes revoluciones internas."
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
        titulo: "Metternich, Castlereagh y Talleyrand",
        tipo: "actor",
        etiqueta: "DIPLOMACIA DE VIENA",
        descripcion: "Los grandes arquitectos del Congreso de Viena junto al zar Alejandro I. Equilibraron las ganancias territoriales de Rusia y Prusia mientras preservaron las fronteras francesas de 1792.",
        conectados: ["viena", "rev1848"],
        justificacion: [
            "Ejecutores del equilibrio europeo: Evitaron grandes guerras entre potencias hasta 1914, pero reprimieron los movimientos democráticos.",
            "Caída del sistema en 1848: Las protestas populares en Viena obligaron a Metternich a dimitir en marzo de 1848."
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
            "Desafío directo al Congreso de Viena: Cuestionó la división de Italia y Alemania, conduciendo a sus unificaciones en 1861 y 1871."
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
    "<strong>Evidencia y tesis:</strong> Se analiza cómo el mapa trazado por Metternich y Castlereagh en 1815 subordinó el principio de nacionalidad al equilibrio de poder entre las grandes potencias.",
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
    { anio: "1814–1815", titulo: "Congreso de Viena y Acta Final", eje: "restauracion", texto: "Inaugurado en el Hofburg tras el exilio de Napoleón en Elba; culmina el 9 de junio de 1815, días antes de Waterloo." },
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
        actores: "Giuseppe Mazzini ('La Joven Italia'), movimientos unificadores de Italia (1861) y Alemania (1871).",
        impacto: "Desafió las fronteras impuestas por el Congreso de Viena en 1815 y condujo a la creación de nuevos Estados nacionales en el siglo XIX."
    },
    utopias: {
        idea: "Denunció las desigualdades extremas del capitalismo industrial, proponiendo comunidades igualitarias basadas en la cooperación y la planificación racional del trabajo.",
        actores: "Henri de Saint-Simon, Charles Fourier (falansterios), Robert Owen (cooperativismo) y Flora Tristán.",
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