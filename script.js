
   //DETECTOR AUTOMÁTICO DE EXTENSIONES DE IMAGEN

function probarExtensiones(img, baseName) {
    const extensiones = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'PNG', 'JPEG'];
    let intento = parseInt(img.dataset.intento || '0', 10) + 1;

    if (intento < extensiones.length) {
        img.dataset.intento = intento;
        img.src = `${baseName}.${extensiones[intento]}`;
    } else {
        const parent = img.parentElement;
        if (parent) {
            parent.innerHTML = `<div class="missing-photo-box"><i class="fa-regular fa-image" style="font-size:24px;"></i><span>Imagen: <strong>${baseName}</strong></span></div>`;
        }
    }
}


   // NAVEGACIÓN ENTRE PÁGINAS 

const ordenPaginas = ['inicio', 'contexto', 'red-historica', 'audiovisual', 'recurso-interactivo', 'conclusiones'];

function cambiarPagina(pageId) {
    const vistas = document.querySelectorAll('.page-view');
    vistas.forEach(vista => vista.classList.remove('active-page'));

    const destino = document.getElementById(pageId);
    if (destino) destino.classList.add('active-page');

    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        const targetTab = (pageId === 'detalle-tema') ? 'contexto' : pageId;
        if (tab.getAttribute('data-page') === targetTab) {
            tab.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'red-historica') {
        setTimeout(() => {
            dibujarLineasCausales();
        }, 80);
    }
}


   //CONTENIDO DETALLADO DE LOS 4 TEMAS

const temasDetallados = {
    postnapoleonico: {
        kicker: "EJE TEMÁTICO 01 • MUNDO POST-NAPOLEÓNICO (1814 – 1815)",
        titulo: "El Congreso de Viena y el Nuevo Equilibrio Europeo",
        resumen: "Tras veinticinco años de guerras revolucionarias y la derrota definitiva de Napoleón Bonaparte en Waterloo, las potencias europeas se reunieron en Viena entre septiembre de 1814 y junio de 1815 para rediseñar el mapa continental y asegurar una paz estable.",
        heroImg: "tema_napoleon.jpg",
        heroBase: "tema_napoleon",
        tieneVisorInteractivo: false,
        tieneComparativaEtapas: false,
        bloquesConImagen: [
            {
                titulo: "1. ¿Qué fue el Congreso de Viena y cuál era su objetivo?",
                parrafos: [
                    "Convocado tras la primera abdicación de Napoleón en 1814 y concluido pocos días antes de la batalla de Waterloo en junio de 1815, el Congreso de Viena reunió en el Palacio Imperial del Hofburg a los principales diplomáticos de Europa. Su propósito era restaurar las monarquías legítimas depuestas por la Revolución Francesa y establecer un sistema de equilibrio de poderes que impidiera que una sola nación volviera a dominar el continente.",
                    "A diferencia de tratados punitivos anteriores, los vencedores (Reino Unido, Austria, Rusia y Prusia) integraron a la Francia monárquica de Luis XVIII en las negociaciones para garantizar un consenso duradero entre las grandes potencias."
                ],
                img: "hofburg_viena.jpg",
                baseName: "hofburg_viena",
                caption: "El Palacio Imperial del Hofburg en Viena, sede oficial de las sesiones diplomáticas entre 1814 y 1815."
            },
            {
                titulo: "2. La derrota de Napoleón y los principios de la Restauración",
                parrafos: [
                    "La arquitectura diplomática de Viena se sustentó en tres pilares: la legitimidad dinástica (devolver los tronos a sus antiguas casas reales), la compensación territorial entre los vencedores y la creación de Estados tapón alrededor de Francia para contener cualquier futura expansión.",
                    "Así surgieron el Reino Unido de los Países Bajos (uniendo Bélgica y Holanda), el fortalecimiento del Reino de Piamonte-Cerdeña en el norte de Italia y la creación de la Confederación Germánica bajo presidencia austriaca."
                ],
                img: "napoleon_waterloo.jpg",
                baseName: "napoleon_waterloo",
                caption: "La derrota definitiva de Napoleón Bonaparte en Waterloo (junio de 1815) selló el orden acordado en Viena."
            }
        ],
        personajes: [
            { nombre: "Klemens von Metternich", cargo: "Canciller del Imperio Austriaco", desc: "Anfitrión y principal arquitecto del sistema conservador europeo; defendió el equilibrio de poderes y la contención del liberalismo.", img: "metternich.jpg", baseName: "metternich" },
            { nombre: "Vizconde Castlereagh", cargo: "Ministro de Exteriores Británico", desc: "Buscó evitar el predominio de Rusia o Francia en el continente y asegurar la supremacía naval y comercial de Gran Bretaña.", img: "castlereagh.jpg", baseName: "castlereagh" },
            { nombre: "Zar Alejandro I", cargo: "Emperador de Rusia", desc: "Lideró la coalición que derrotó a Napoleón, obtuvo gran parte de Polonia e impulsó la creación de la Santa Alianza.", img: "alejandro1.jpg", baseName: "alejandro1" },
            { nombre: "Charles-Maurice de Talleyrand", cargo: "Ministro de Exteriores de Francia", desc: "Logró que la Francia derrotada fuera admitida como quinta gran potencia en Viena, evitando desmembramientos territoriales.", img: "talleyrand.jpg", baseName: "talleyrand" }
        ],
        mapa: {
            img: "mapa_viena.jpeg",
            baseName: "mapa_viena",
            titulo: "Mapa de Europa tras el Congreso de Viena (1815)",
            descripcion: "Distribución territorial acordada en el Acta Final de Viena: Confederación Germánica, Reino de los Países Bajos, Imperio Austriaco, Reino de Polonia vinculado a Rusia y fragmentación de la península itálica."
        }
    },

    industrial: {
        kicker: "EJE TEMÁTICO 02 • REVOLUCIÓN INDUSTRIAL",
        titulo: "Mecanización, Fábricas y el Nacimiento de la Cuestión Social",
        resumen: "Iniciada en Gran Bretaña en la segunda mitad del siglo XVIII y expandida por Europa en el siglo XIX, la Revolución Industrial transformó una economía agraria y artesanal en una sociedad urbana, mecanizada y capitalista.",
        heroImg: "tema_industria.jpg",
        heroBase: "tema_industria",
        tieneVisorInteractivo: true,
        tieneComparativaEtapas: true,
        bloquesConImagen: [
            {
                titulo: "1. ¿Qué fue y por qué comenzó en Gran Bretaña?",
                parrafos: [
                    "La Revolución Industrial fue el proceso de transformación económica, tecnológica y social más profundo desde el Neolítico. Comenzó en Gran Bretaña hacia 1760 gracias a una combinación única de factores: abundantes yacimientos de carbón y hierro, estabilidad institucional, acumulación de capital procedente del comercio marítimo, una revolución agrícola previa y una red de canales y puertos.",
                    "El perfeccionamiento de la máquina de vapor por James Watt en 1769 y las primeras máquinas textiles permitieron multiplicar la capacidad productiva."
                ],
                img: "ind_origen.jpg",
                baseName: "ind_origen",
                caption: "Orígenes de la industrialización en Gran Bretaña: carbón, hierro y mecanización de la producción."
            },
            {
                titulo: "2. Nuevos inventos, fábricas y revolución de los transportes",
                parrafos: [
                    "El taller artesanal fue desplazado por la fábrica, donde grandes máquinas concentraban a cientos de obreros bajo estricta disciplina horaria. Paralelamente, la aplicación del vapor al transporte dio origen al barco de vapor y a la locomotora ferroviaria de George Stephenson (línea Liverpool-Manchester en 1830).",
                    "El ferrocarril integró mercados nacionales, abarató el traslado de materias primas y consolidó la expansión industrial hacia Bélgica, Francia, Alemania y Estados Unidos."
                ],
                img: "ind_transporte.jpg",
                baseName: "ind_transporte",
                caption: "Expansión del ferrocarril y los transportes a vapor, símbolo de integración comercial y progreso técnico."
            },
            {
                titulo: "3. Urbanización acelerada y la Cuestión Social",
                parrafos: [
                    "Millones de campesinos emigraron hacia centros industriales como Manchester, Birmingham o Liverpool. Este crecimiento desordenado generó barrios obreros hacinados, sin alcantarillado ni agua potable, donde proliferaron enfermedades.",
                    "En las fábricas, hombres, mujeres y niños trabajaban entre 14 y 16 horas diarias por salarios de subsistencia, sin descanso dominical ni cobertura por accidentes. Esta realidad dio origen al movimiento ludita y a los primeros sindicatos."
                ],
                img: "ind_sociedad.jpg",
                baseName: "ind_sociedad",
                caption: "Transformación social, crecimiento urbano acelerado y condiciones laborales del proletariado industrial."
            }
        ],
        personajes: [
            { nombre: "James Watt", cargo: "Ingeniero e Inventor Escocés", desc: "Perfeccionó la máquina de vapor con condensador separado (1769), convirtiéndola en el motor de la industria moderna.", img: "watt.jpg", baseName: "watt" },
            { nombre: "George Stephenson", cargo: "Ingeniero Ferroviario", desc: "Construyó la locomotora 'The Rocket' e inauguró en 1830 el primer ferrocarril público de pasajeros entre Liverpool y Manchester.", img: "stephenson.jpg", baseName: "stephenson" },
            { nombre: "James Hargreaves", cargo: "Inventor Textil", desc: "Creó la hiladora 'Spinning Jenny' (1764), multiplicando la producción de hilo y revolucionando la industria textil británica.", img: "hargreaves.jpg", baseName: "hargreaves" },
            { nombre: "Edmund Cartwright", cargo: "Inventor del Telar Mecánico", desc: "Patentó el telar mecánico accionado por vapor (1785), completando la mecanización de la industria algodonera.", img: "cartwright.jpg", baseName: "cartwright" }
        ],
        mapa: null
    },

    utopias: {
        kicker: "EJE TEMÁTICO 03 • UTOPÍAS SOCIALES",
        titulo: "El Socialismo Utópico: Alternativas Cooperativas frente al Capitalismo",
        resumen: "Ante la miseria obrera provocada por la Revolución Industrial, los primeros pensadores socialistas diseñaron modelos de sociedades armónicas basadas en la cooperación, la educación y la justicia distributiva.",
        heroImg: "tema_utopias.jpg",
        heroBase: "tema_utopias",
        tieneVisorInteractivo: false,
        tieneComparativaEtapas: false,
        bloquesConImagen: [
            {
                titulo: "1. ¿Por qué surgieron las utopías sociales?",
                parrafos: [
                    "Durante las primeras décadas del siglo XIX se hizo evidente que las libertades jurídicas proclamadas por las revoluciones liberales no garantizaban el bienestar material de los trabajadores. La concentración de riqueza en manos de los propietarios industriales contrastaba con la pobreza extrema del proletariado.",
                    "Pensadores reformistas en Francia y Gran Bretaña plantearon que la sociedad debía reorganizarse racionalmente para sustituir la competencia egoísta por la cooperación solidaria. Más tarde, Karl Marx y Friedrich Engels los denominaron 'socialistas utópicos' porque confiaban en persuadir pacíficamente a todas las clases sociales."
                ],
                img: "utopias_debate.jpg",
                baseName: "utopias_debate",
                caption: "Debate social y filosófico frente a las desigualdades provocadas por el capitalismo industrial."
            },
            {
                titulo: "2. Los Falansterios de Fourier y la Sociedad Productiva de Saint-Simon",
                parrafos: [
                    "Henri de Saint-Simon propuso una sociedad dirigida por los 'productores' (científicos, ingenieros, industriales y obreros) frente a los sectores ociosos del Antiguo Régimen, defendiendo la planificación económica al servicio del progreso social.",
                    "Por su parte, Charles Fourier criticó la monotonía alienante del trabajo fabril y diseñó los falansterios: comunidades autosuficientes de unas 1.600 personas donde cada individuo elegía sus tareas según sus pasiones y vocación, garantizando la igualdad entre hombres y mujeres."
                ],
                img: "utopias_falansterio.jpg",
                baseName: "utopias_falansterio",
                caption: "Diseño arquitectónico de un Falansterio idealizado por Charles Fourier para la vida comunitaria y cooperativa."
            },
            {
                titulo: "3. Robert Owen y el nacimiento del cooperativismo",
                parrafos: [
                    "A diferencia de otros teóricos, el empresario galés Robert Owen llevó sus ideas a la práctica en su hilandería de New Lanark (Escocia): redujo la jornada laboral, prohibió el trabajo infantil, mejoró los salarios y creó escuelas gratuitas y viviendas dignas, demostrando que el bienestar obrero aumentaba la productividad.",
                    "Posteriormente fundó la comunidad cooperativa de New Harmony en Estados Unidos (1825) e impulsó el movimiento sindical y cooperativo británico."
                ],
                img: "utopias_owen.jpg",
                baseName: "utopias_owen",
                caption: "Experiencia cooperativa y reforma educativa impulsada por Robert Owen frente a la explotación fabril."
            }
        ],
        personajes: [
            { nombre: "Henri de Saint-Simon", cargo: "Filósofo y Economista Francés", desc: "Defendió una sociedad organizada por científicos, técnicos y trabajadores para erradicar la pobreza.", img: "saintsimon.jpg", baseName: "saintsimon" },
            { nombre: "Charles Fourier", cargo: "Pensador Social Francés", desc: "Ideó los falansterios como comunidades cooperativas libres y defendió tempranamente la emancipación de la mujer.", img: "fourier.jpg", baseName: "fourier" },
            { nombre: "Robert Owen", cargo: "Reformador Social y Empresario", desc: "Transformó New Lanark en una fábrica modelo con educación y salud, y es considerado padre del cooperativismo moderno.", img: "owen.jpg", baseName: "owen" },
            { nombre: "Flora Tristán", cargo: "Escritora y Activista Social", desc: "Vinculó la emancipación de la clase obrera con los derechos de la mujer en su obra 'La Unión Obrera' (1843).", img: "floratristan.jpg", baseName: "floratristan" }
        ],
        mapa: null
    },

    romanticismo: {
        kicker: "EJE TEMÁTICO 04 • ROMANTICISMO Y NACIONALISMO",
        titulo: "Libertad Individual, Identidad Nacional y la Primavera de los Pueblos",
        resumen: "El Romanticismo exaltó la emoción, la libertad y las raíces históricas de los pueblos, convirtiéndose en el motor cultural del Nacionalismo que desafió las fronteras del Congreso de Viena hasta estallar en 1848.",
        heroImg: "tema_romanticismo.jpg",
        heroBase: "tema_romanticismo",
        tieneVisorInteractivo: false,
        tieneComparativaEtapas: false,
        bloquesConImagen: [
            {
                titulo: "1. El Romanticismo como rebelión cultural",
                parrafos: [
                    "Surgido a finales del siglo XVIII en Alemania y Gran Bretaña y consolidado en toda Europa durante la primera mitad del siglo XIX, el Romanticismo reaccionó contra la rigidez del Neoclasicismo, el racionalismo ilustrado y la frialdad mecánica de la industrialización.",
                    "Los artistas románticos reivindicaron la subjetividad, la pasión, la naturaleza sublime, la Edad Media y la lucha heroica por la libertad frente a cualquier forma de tiranía."
                ],
                img: "romanticismo_naturaleza.jpg",
                baseName: "romanticismo_naturaleza",
                caption: "La exaltación de la subjetividad, el individuo y la naturaleza sublime frente al racionalismo ilustrado."
            },
            {
                titulo: "2. Del espíritu del pueblo (Volksgeist) al Nacionalismo político",
                parrafos: [
                    "El Romanticismo impulsó el rescate de las lenguas vernáculas, los cantos folclóricos, las leyendas y la historia medieval de cada comunidad, conceptos desarrollados por pensadores como Johann Gottfried von Herder bajo la idea del Volksgeist (espíritu del pueblo).",
                    "Pronto, esta identidad cultural se transformó en un proyecto político: cada nación tenía derecho a constituir un Estado independiente y soberano, cuestionando tanto a los imperios multinacionales (Austriaco, Ruso, Otomano) como la fragmentación de Italia y Alemania."
                ],
                img: "romanticismo_delacroix.jpg",
                baseName: "romanticismo_delacroix",
                caption: "'La Libertad guiando al pueblo' (1830) de Eugène Delacroix, síntesis visual del espíritu romántico y nacional."
            },
            {
                titulo: "3. Las oleadas revolucionarias (1820, 1830 y 1848)",
                parrafos: [
                    "La alianza entre liberalismo, romanticismo y nacionalismo desató tres grandes ciclos revolucionarios: en 1820 (España, Nápoles y la independencia de Grecia), en 1830 (la caída de los Borbones en Francia y la independencia de Bélgica) y en 1848, conocida como la 'Primavera de los Pueblos'.",
                    "En 1848 las barricadas recorrieron París, Viena, Berlín, Milán y Budapest exigiendo constituciones democráticas, derechos laborales y soberanía nacional, sentando las bases de las futuras unificaciones de Italia (1861) y Alemania (1871)."
                ],
                img: "romanticismo_1848.jpg",
                baseName: "romanticismo_1848",
                caption: "Barricadas revolucionarias de 1848 en Europa, punto culminante de la lucha nacionalista y liberal."
            }
        ],
        personajes: [
            { nombre: "Eugène Delacroix", cargo: "Pintor Romántico Francés", desc: "Inmortalizó el ideal revolucionario en 'La Libertad guiando al pueblo' (1830) y 'La matanza de Quíos'.", img: "delacroix.jpg", baseName: "delacroix" },
            { nombre: "Lord Byron", cargo: "Poeta Romántico Británico", desc: "Encarnó el ideal del héroe romántico; viajó a luchar por la independencia de Grecia frente al Imperio Otomano.", img: "byron.jpg", baseName: "byron" },
            { nombre: "Giuseppe Mazzini", cargo: "Líder Nacionalista Italiano", desc: "Fundó 'La Joven Italia' (1831) y 'La Joven Europa', promoviendo repúblicas democráticas y naciones libres.", img: "mazzini.jpg", baseName: "mazzini" },
            { nombre: "Johann G. von Herder", cargo: "Filósofo Alemán", desc: "Desarrolló el concepto de 'Volksgeist' (espíritu del pueblo), destacando el valor de la lengua y cultura popular.", img: "herder.jpg", baseName: "herder" }
        ],
        mapa: null
    }
};

function abrirDetalleTema(temaKey) {
    const data = temasDetallados[temaKey];
    if (!data) return;

    const container = document.getElementById('topicFullContainer');

    let visorHTML = '';
    if (data.tieneVisorInteractivo && temaKey === 'industrial') {
        visorHTML = `
            <div class="interactive-showcase-box">
                <div class="showcase-tabs">
                    <button class="showcase-tab-btn active" onclick="cambiarSlideIndustria(0, this)">
                        <span class="tab-year">1760 – 1840</span>
                        <span class="tab-label">Mecanización y Vapor</span>
                    </button>
                    <button class="showcase-tab-btn" onclick="cambiarSlideIndustria(1, this)">
                        <span class="tab-year">SIGLO XIX</span>
                        <span class="tab-label">Fábricas y Expansión Urbana</span>
                    </button>
                </div>
                <div class="showcase-body" id="industriaShowcaseBody"></div>
            </div>
        `;
    }

    const comparativaEtapasHTML = data.tieneComparativaEtapas ? `
        <div class="stages-creative-section">
            <div class="stages-header-banner">
                <span class="section-kicker" style="color:#93c5fd;">EVOLUCIÓN TECNOLÓGICA Y ECONÓMICA</span>
                <h3>Primera vs. Segunda Revolución Industrial</h3>
                <p>Compara cómo evolucionaron las fuentes de energía, los sectores líderes y las potencias industriales en cada fase.</p>
            </div>

            <div class="stages-versus-grid">
                <article class="stage-creative-card stage-first">
                    <div class="stage-card-top">
                        <span class="stage-num-badge">FASE 01</span>
                        <span class="stage-period-pill">1760 – 1840</span>
                    </div>
                    <h4>Primera Revolución Industrial</h4>
                    <div class="stage-specs-list">
                        <div class="stage-spec-item">
                            <strong>Fuentes de energía</strong>
                            <span>Carbón mineral y máquina de vapor (James Watt).</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Industrias líderes</strong>
                            <span>Textil algodonera y siderurgia básica del hierro.</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Transportes clave</strong>
                            <span>Ferrocarril a vapor (Stephenson) y barco a vapor.</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Potencia hegemónica</strong>
                            <span>Gran Bretaña ("el taller del mundo").</span>
                        </div>
                    </div>
                </article>

                <article class="stage-creative-card stage-second">
                    <div class="stage-card-top">
                        <span class="stage-num-badge">FASE 02</span>
                        <span class="stage-period-pill">1870 – 1914</span>
                    </div>
                    <h4>Segunda Revolución Industrial</h4>
                    <div class="stage-specs-list">
                        <div class="stage-spec-item">
                            <strong>Fuentes de energía</strong>
                            <span>Electricidad y petróleo (motor de combustión interna).</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Industrias líderes</strong>
                            <span>Acero (convertidor Bessemer), química y automotriz.</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Transportes y comunicación</strong>
                            <span>Automóvil, aviación, telégrafo, teléfono y radio.</span>
                        </div>
                        <div class="stage-spec-item">
                            <strong>Potencias hegemónicas</strong>
                            <span>Estados Unidos, Alemania, Gran Bretaña y Japón.</span>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    ` : '';

    const bloquesHTML = data.bloquesConImagen.map((bloque, idx) => `
        <div class="narrative-media-card ${idx % 2 === 1 ? 'reverse-media' : ''}">
            <div class="narrative-media-text">
                <h3>${bloque.titulo}</h3>
                ${bloque.parrafos.map(p => `<p>${p}</p>`).join('')}
            </div>
            <figure class="narrative-media-figure">
                <div class="narrative-media-img">
                    <img src="${bloque.img}" alt="${bloque.titulo}" onerror="probarExtensiones(this, '${bloque.baseName}')">
                </div>
                <figcaption>${bloque.caption}</figcaption>
            </figure>
        </div>
    `).join('');

    const personajesHTML = data.personajes.map(p => `
        <div class="figure-card">
            <div class="figure-photo">
                <img src="${p.img}" alt="${p.nombre}" onerror="probarExtensiones(this, '${p.baseName}')">
            </div>
            <div class="figure-info">
                <span class="figure-role-badge">${p.cargo}</span>
                <h4>${p.nombre}</h4>
                <p>${p.desc}</p>
            </div>
        </div>
    `).join('');

    const mapaHTML = data.mapa ? `
        <div class="map-single-section">
            <div class="map-header-bar" style="padding: 20px 24px 10px;">
                <h3 class="topic-gallery-title" style="margin-bottom: 4px;">${data.mapa.titulo}</h3>
                <p class="topic-gallery-subtitle" style="margin-bottom: 0;">Cartografía histórica de referencia.</p>
            </div>
            <div class="map-full-frame">
                <img src="${data.mapa.img}" alt="${data.mapa.titulo}" onerror="probarExtensiones(this, '${data.mapa.baseName}')">
            </div>
            <p class="map-info-caption">${data.mapa.descripcion}</p>
        </div>
    ` : '';

    container.innerHTML = `
        <div class="topic-full-hero">
            <div>
                <span class="section-kicker" style="color:#93c5fd;">${data.kicker}</span>
                <h2>${data.titulo}</h2>
                <p>${data.resumen}</p>
            </div>
            <div class="topic-full-hero-img">
                <img src="${data.heroImg}" alt="${data.titulo}" onerror="probarExtensiones(this, '${data.heroBase}')">
            </div>
        </div>

        ${visorHTML}

        <div class="narrative-media-stack">
            ${bloquesHTML}
        </div>

        ${comparativaEtapasHTML}

        <div class="figures-section">
            <h3 class="topic-gallery-title">Personajes clave del proceso</h3>
            <p class="topic-gallery-subtitle">Protagonistas, pensadores y líderes históricos que marcaron este eje temático.</p>
            <div class="figures-grid">
                ${personajesHTML}
            </div>
        </div>

        ${mapaHTML}
    `;

    cambiarPagina('detalle-tema');

    if (temaKey === 'industrial') {
        cambiarSlideIndustria(0);
    }
}

const slidesIndustria = [
    {
        etapa: "INNOVACIÓN TÉCNICA • 1760 – 1840",
        titulo: "La Máquina de Vapor y el Sistema Fabril",
        subtitulo: "De los talleres artesanales a la producción mecanizada",
        texto: "Inventos como la máquina de vapor de James Watt, la hiladora de Hargreaves y el telar mecánico de Cartwright transformaron por completo la industria textil y siderúrgica en Gran Bretaña.",
        img: "slide_ind_1.jpg",
        baseName: "slide_ind_1"
    },
    {
        etapa: "EXPANSIÓN INDUSTRIAL • SIGLO XIX",
        titulo: "Ferrocarriles, Ciudades y Clase Obrera",
        subtitulo: "Integración de mercados y surgimiento de la cuestión social",
        texto: "La locomotora de vapor conectó regiones enteras y aceleró el crecimiento de las ciudades industriales, donde millones de trabajadores enfrentaron largas jornadas que dieron origen al movimiento obrero.",
        img: "slide_ind_2.jpg",
        baseName: "slide_ind_2"
    }
];

function cambiarSlideIndustria(index, btnElement) {
    const slide = slidesIndustria[index];
    const body = document.getElementById('industriaShowcaseBody');
    if (!slide || !body) return;

    if (btnElement) {
        document.querySelectorAll('.showcase-tab-btn').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');
    }

    body.innerHTML = `
        <div class="showcase-slide-grid">
            <div class="showcase-slide-image">
                <img src="${slide.img}" alt="${slide.titulo}" onerror="probarExtensiones(this, '${slide.baseName}')">
                <span class="showcase-counter">${index + 1} / ${slidesIndustria.length}</span>
            </div>
            <div class="showcase-slide-info">
                <span class="showcase-pill">${slide.etapa}</span>
                <h3>${slide.titulo}</h3>
                <h4>${slide.subtitulo}</h4>
                <p>${slide.texto}</p>
            </div>
        </div>
    `;
}


   //RED INTERACTIVA DE RELACIONES HISTÓRICAS 

const nodosHistoricos = [
    {
        id: "c1",
        columna: "causa",
        badge: "CAUSA POLÍTICA",
        titulo: "Caída de Napoleón y Vacío de Poder",
        subtitulo: "1814 • Fin del Imperio Napoleónico",
        periodo: "1814 – 1815 • Europa Post-Napoleónica",
        fuente: "Hobsbawm (2009), Cap. 3 / Historia National Geographic",
        descripcion: "Tras veinticinco años de guerras revolucionarias y expansión imperial, la derrota de Napoleón dejó desarticulado el mapa europeo. Las monarquías vencedoras buscaron restablecer el Antiguo Régimen y evitar nuevas revoluciones.",
        relaciones: [
            { targetId: "a1", rol: "IMPULSÓ A LOS ACTORES", texto: "Reunió en Viena a Metternich, Castlereagh, Alejandro I y Talleyrand para rediseñar el orden continental." },
            { targetId: "e1", rol: "ORIGINÓ EL ACONTECIMIENTO", texto: "Desembocó directamente en la convocatoria y firma del Acta Final del Congreso de Viena (1815)." },
            { targetId: "r2", rol: "GENERÓ TENSIÓN CON", texto: "Al restaurar fronteras dinásticas sin consultar a los pueblos, alimentó el despertar del Nacionalismo." }
        ]
    },
    {
        id: "c2",
        columna: "causa",
        badge: "CAUSA ECONÓMICA Y SOCIAL",
        titulo: "Expansión de la Revolución Industrial",
        subtitulo: "1760 – 1848 • Vapor, fábricas y urbanización",
        periodo: "Finales s. XVIII – Primera mitad s. XIX",
        fuente: "Osterhammel (2015) / Encyclopædia Britannica",
        descripcion: "La introducción de la máquina de vapor de James Watt, el sistema fabril y el ferrocarril transformaron la economía agraria en industrial, concentrando a millones de trabajadores en ciudades con duras jornadas de 14 a 16 horas.",
        relaciones: [
            { targetId: "a2", rol: "MOVILIZÓ A LOS ACTORES", texto: "Consolidó a la burguesía industrial y dio origen al proletariado urbano y a los reformadores sociales." },
            { targetId: "e2", rol: "PROVOCÓ EL PROCESO", texto: "Desencadenó la 'cuestión social' y las primeras protestas obreras (ludismo y Trade Unions)." },
            { targetId: "r1", rol: "IMPULSÓ LA RESPUESTA", texto: "Motivó el nacimiento de las utopías sociales de Saint-Simon, Fourier y Owen frente a la desigualdad." }
        ]
    },
    {
        id: "c3",
        columna: "causa",
        badge: "CAUSA CULTURAL Y FILOSÓFICA",
        titulo: "Reacción contra el Racionalismo Frío",
        subtitulo: "Finales s. XVIII • Crítica a la mecanización",
        periodo: "1790 – 1830 • Europa Central y Occidental",
        fuente: "Berlin, I. (2000) / Fundación Juan March",
        descripcion: "Frente a la rigidez del Neoclasicismo, el racionalismo extremo y la deshumanización de la sociedad fabril, surgió una nueva sensibilidad que reivindicó las emociones, la libertad individual y las tradiciones populares.",
        relaciones: [
            { targetId: "a3", rol: "INSPIRÓ A LOS CREADORES", texto: "Artistas y pensadores como Herder, Delacroix, Lord Byron y Mazzini articularon identidad cultural y libertad." },
            { targetId: "e3", rol: "ALIMENTÓ LAS REVOLUCIONES", texto: "Dotó de mística heroica a las luchas de independencia (como Grecia) y a las barricadas de 1830 y 1848." },
            { targetId: "r3", rol: "CONSOLIDÓ EL MOVIMIENTO", texto: "Dio forma al Romanticismo europeo y al concepto de Volksgeist (espíritu del pueblo)." }
        ]
    },
    {
        id: "a1",
        columna: "actor",
        badge: "ACTORES DIPLOMÁTICOS",
        titulo: "Metternich, Castlereagh, Alejandro I y Talleyrand",
        subtitulo: "Arquitectos del equilibrio europeo",
        periodo: "1814 – 1848 • Diplomacia de la Restauración",
        fuente: "Acta Final del Congreso de Viena (1815) / El Orden Mundial",
        descripcion: "Representantes de Austria, Reino Unido, Rusia y Francia que negociaron el reparto territorial en el Palacio del Hofburg, priorizando la estabilidad dinástica sobre los derechos nacionales y constitucionales.",
        relaciones: [
            { targetId: "c1", rol: "RESPONDIERON A", texto: "La necesidad de cerrar el ciclo revolucionario abierto en 1789 y derrotado en Waterloo." },
            { targetId: "e1", rol: "DIRIGIERON", texto: "Las negociaciones del Congreso de Viena y la creación de la Santa Alianza para intervenir contra revoluciones." },
            { targetId: "r2", rol: "PROTAGONIZARON EL CHOQUE CON", texto: "Los movimientos nacionalistas de Italia, Alemania, Polonia y Bélgica que rechazaban sus fronteras." }
        ]
    },
    {
        id: "a2",
        columna: "actor",
        badge: "ACTORES SOCIALES Y PENSADORES",
        titulo: "Owen, Fourier, Saint-Simon y el Proletariado",
        subtitulo: "Clase obrera y socialistas utópicos",
        periodo: "1800 – 1848 • Gran Bretaña y Francia",
        fuente: "Engels (1880) / Filosofía.net / UNAM",
        descripcion: "Mientras los obreros fabriles sufrían jornadas extenuantes y hacinamiento urbano, pensadores como Robert Owen, Charles Fourier, Henri de Saint-Simon y Flora Tristán diseñaron alternativas cooperativas y comunitarias.",
        relaciones: [
            { targetId: "c2", rol: "SURGIERON DE", texto: "Las transformaciones materiales y las desigualdades generadas por la Revolución Industrial." },
            { targetId: "e2", rol: "PROTAGONIZARON", texto: "Las experiencias modelo de New Lanark, los proyectos de falansterios y la organización obrera temprana." },
            { targetId: "r1", rol: "FORMULARON", texto: "El Socialismo Utópico y las bases del cooperativismo moderno y la legislación laboral." }
        ]
    },
    {
        id: "a3",
        columna: "actor",
        badge: "ACTORES CULTURALES Y NACIONALISTAS",
        titulo: "Herder, Delacroix, Lord Byron y Mazzini",
        subtitulo: "Poetas, artistas y líderes de los pueblos",
        periodo: "1800 – 1848 • Europa",
        fuente: "Mazzini (1831) / Berlin (2000) / SEP",
        descripcion: "Intelectuales y artistas que unieron la creación estética con el compromiso político: Herder definió el espíritu popular (Volksgeist), Delacroix pintó la libertad revolucionaria, Byron luchó en Grecia y Mazzini fundó 'La Joven Italia'.",
        relaciones: [
            { targetId: "c3", rol: "CANALIZARON", texto: "La rebelión romántica contra el absolutismo y la uniformidad racionalista." },
            { targetId: "e3", rol: "IMPULSARON", texto: "Las insurrecciones nacionales de 1820, 1830 y la Primavera de los Pueblos de 1848." },
            { targetId: "r2", rol: "ARTICULARON", texto: "El Nacionalismo democrático y los proyectos de unificación de Italia y Alemania." }
        ]
    },
    {
        id: "e1",
        columna: "acontecimiento",
        badge: "ACONTECIMIENTO DIPLOMÁTICO",
        titulo: "Congreso de Viena y Santa Alianza",
        subtitulo: "1814–1815 • Rediseño del mapa europeo",
        periodo: "Septiembre 1814 – Junio 1815",
        fuente: "Acta Final del Congreso de Viena (9 de junio de 1815)",
        descripcion: "Cumbre internacional que restauró las monarquías legítimas, creó Estados tapón alrededor de Francia (Países Bajos, Piamonte-Cerdeña) y estableció el derecho de intervención armada frente a cualquier brote liberal.",
        relaciones: [
            { targetId: "a1", rol: "FUE CONDUCIDO POR", texto: "Metternich, Castlereagh, el zar Alejandro I y Talleyrand en el Palacio del Hofburg." },
            { targetId: "e3", rol: "DESENCADENÓ REACCIÓN EN", texto: "Las oleadas revolucionarias de 1820, 1830 y 1848 que buscaron derrumbar el orden de Viena." },
            { targetId: "r2", rol: "PROVOCÓ", texto: "La resistencia nacionalista de pueblos divididos o sometidos a imperios multinacionales." }
        ]
    },
    {
        id: "e2",
        columna: "acontecimiento",
        badge: "ACONTECIMIENTO SOCIOECONÓMICO",
        titulo: "Cuestión Social y Comunidades Modelo",
        subtitulo: "1815–1848 • Fábricas, ludismo y New Lanark",
        periodo: "Primera mitad del siglo XIX",
        fuente: "Hobsbawm (2009), Cap. 6 / History Crunch (2026)",
        descripcion: "Choque entre el crecimiento desregulado de las ciudades industriales (Manchester, Birmingham) y los primeros ensayos prácticos de reforma laboral y cooperación comunitaria como New Lanark (Escocia) y New Harmony.",
        relaciones: [
            { targetId: "a2", rol: "FUE PROTAGONIZADO POR", texto: "Los trabajadores industriales y reformadores como Robert Owen y Charles Fourier." },
            { targetId: "e3", rol: "CONFLUYÓ EN", texto: "Las demandas sociales y obreras de las revoluciones europeas de 1848." },
            { targetId: "r1", rol: "CONSOLIDÓ", texto: "Las teorías de las utopías sociales y el posterior desarrollo del movimiento obrero organizado." }
        ]
    },
    {
        id: "e3",
        columna: "acontecimiento",
        badge: "ACONTECIMIENTO REVOLUCIONARIO",
        titulo: "Oleadas Revolucionarias (1820, 1830 y 1848)",
        subtitulo: "La 'Primavera de los Pueblos' en Europa",
        periodo: "1820 – 1848 • París, Viena, Berlín, Milán",
        fuente: "Hobsbawm (2009) / Scribd Tema 3 Historia",
        descripcion: "Ciclos insurreccionales que desafiaron el absolutismo: independencia de Grecia (1821–1829) y Bélgica (1830), caída de Carlos X en Francia y levantamientos simultáneos en 1848 por constituciones, derechos sociales y soberanía nacional.",
        relaciones: [
            { targetId: "e1", rol: "CUESTIONÓ DIRECTAMENTE", texto: "Las fronteras y regímenes impuestos por el Congreso de Viena y la Santa Alianza." },
            { targetId: "a3", rol: "FUE INSPIRADO POR", texto: "Los ideales románticos y nacionalistas difundidos por Mazzini, Delacroix y los movimientos juveniles." },
            { targetId: "r2", rol: "PREPARÓ EL CAMINO PARA", texto: "El fin del sistema de Metternich y las unificaciones de Italia (1861) y Alemania (1871)." }
        ]
    },
    {
        id: "r1",
        columna: "consecuencia",
        badge: "CONSECUENCIA IDEOLÓGICA Y SOCIAL",
        titulo: "Utopías Sociales y Derechos Laborales",
        subtitulo: "Cooperativismo y crítica al capitalismo fabril",
        periodo: "Siglo XIX • Legado Social",
        fuente: "Engels (1880) / Repositorio UNAM",
        descripcion: "Las propuestas de Saint-Simon, Fourier y Owen demostraron la necesidad de limitar la jornada laboral, erradicar el trabajo infantil, promover la educación universal y construir asociaciones cooperativas de trabajadores.",
        relaciones: [
            { targetId: "c2", rol: "NACIERON COMO RESPUESTA A", texto: "La explotación y desigualdad producidas por la Revolución Industrial." },
            { targetId: "a2", rol: "FUERON IMPULSADAS POR", texto: "Owen, Fourier, Saint-Simon y Flora Tristán." },
            { targetId: "e2", rol: "SE EXPRESARON EN", texto: "Experiencias cooperativas, sindicatos y la agenda social de 1848." }
        ]
    },
    {
        id: "r2",
        columna: "consecuencia",
        badge: "CONSECUENCIA GEOPOLÍTICA",
        titulo: "Nacionalismo y Estados-Nación Modernos",
        subtitulo: "Soberanía popular y unificaciones nacionales",
        periodo: "1830 – 1871 • Reconfiguración de Europa",
        fuente: "Mazzini (1831) / Historia y Biografías",
        descripcion: "La idea de que cada nación con lengua e historia común debe formar un Estado independiente erosionó los imperios multinacionales y culminó en la unificación de Italia (1861) y Alemania (1871).",
        relaciones: [
            { targetId: "e1", rol: "DERRUMBÓ EL ORDEN DE", texto: "Las fronteras dinásticas impuestas en el Congreso de Viena (1815)." },
            { targetId: "e3", rol: "SE CONSOLIDÓ TRAS", texto: "Las revoluciones de 1830 y la Primavera de los Pueblos de 1848." },
            { targetId: "r3", rol: "SE NUTRIÓ DE", texto: "La valoración romántica de la historia, la lengua y la identidad popular." }
        ]
    },
    {
        id: "r3",
        columna: "consecuencia",
        badge: "CONSECUENCIA CULTURAL",
        titulo: "Romanticismo y Sensibilidad Moderna",
        subtitulo: "Libertad creadora e identidad cultural",
        periodo: "1800 – 1850 • Arte, Literatura y Música",
        fuente: "Berlin (2000) / Fundación Juan March",
        descripcion: "El Romanticismo transformó el arte, la literatura y la música europea, legitimando la expresión individual, el compromiso político del artista y el rescate del folclore como patrimonio nacional.",
        relaciones: [
            { targetId: "c3", rol: "SURGIÓ DE", texto: "La crítica al racionalismo ilustrado y a la estandarización industrial." },
            { targetId: "a3", rol: "FUE REPRESENTADO POR", texto: "Eugène Delacroix, Lord Byron, Victor Hugo y Johann G. von Herder." },
            { targetId: "r2", rol: "FORTALECIÓ A", texto: "Los movimientos nacionalistas al darles símbolos, himnos y relatos históricos." }
        ]
    }
];

let nodoActivoId = "c1";

function renderRedHistorica() {
    const container = document.getElementById('nodesContainer');
    if (!container) return;

    const columnasConfig = [
        { key: "causa", titulo: "1. Causas", cssClass: "col-causas" },
        { key: "actor", titulo: "2. Actores", cssClass: "col-actores" },
        { key: "acontecimiento", titulo: "3. Acontecimientos", cssClass: "col-acontecimientos" },
        { key: "consecuencia", titulo: "4. Consecuencias", cssClass: "col-consecuencias" }
    ];

    container.innerHTML = columnasConfig.map(col => {
        const nodosCol = nodosHistoricos.filter(n => n.columna === col.key);
        return `
            <div class="causal-col">
                <div class="causal-col-header ${col.cssClass}">${col.titulo}</div>
                ${nodosCol.map(nodo => `
                    <div class="node-item" id="node-${nodo.id}" onclick="seleccionarNodo('${nodo.id}')">
                        <span class="node-category">${nodo.badge}</span>
                        <h4>${nodo.titulo}</h4>
                        <span class="node-mini-sub">${nodo.subtitulo}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');

    seleccionarNodo(nodoActivoId);
}

function seleccionarNodo(id) {
    const nodo = nodosHistoricos.find(n => n.id === id);
    if (!nodo) return;
    nodoActivoId = id;

    const conectadosIds = nodo.relaciones.map(r => r.targetId);

    document.querySelectorAll('.node-item').forEach(el => {
        el.classList.remove('selected', 'connected', 'dimmed');
        const elId = el.id.replace('node-', '');
        if (elId === id) {
            el.classList.add('selected');
        } else if (conectadosIds.includes(elId)) {
            el.classList.add('connected');
        } else {
            el.classList.add('dimmed');
        }
    });

    document.getElementById('detailType').textContent = nodo.badge;
    document.getElementById('detailTitle').textContent = nodo.titulo;
    document.getElementById('detailPeriod').textContent = nodo.periodo;
    document.getElementById('detailSource').textContent = `Fuente: ${nodo.fuente}`;
    document.getElementById('detailDesc').textContent = nodo.descripcion;

    const linksGrid = document.getElementById('detailConnections');
    linksGrid.innerHTML = nodo.relaciones.map(rel => {
        const targetNode = nodosHistoricos.find(n => n.id === rel.targetId);
        return `
            <div class="causal-link-card" onclick="seleccionarNodo('${rel.targetId}')">
                <span class="causal-link-role">${rel.rol}</span>
                <strong>${targetNode ? targetNode.titulo : ''}</strong>
                <p>${rel.texto}</p>
            </div>
        `;
    }).join('');

    dibujarLineasCausales();
}

function dibujarLineasCausales() {
    const svg = document.getElementById('networkLines');
    const canvas = document.getElementById('networkCanvas');
    if (!svg || !canvas) return;

    const nodoActivo = nodosHistoricos.find(n => n.id === nodoActivoId);
    if (!nodoActivo) return;

    const canvasRect = canvas.getBoundingClientRect();
    if (canvasRect.width === 0) return;

    svg.setAttribute('width', canvasRect.width);
    svg.setAttribute('height', canvasRect.height);
    svg.innerHTML = '';

    const elOrigen = document.getElementById(`node-${nodoActivo.id}`);
    if (!elOrigen) return;
    const rectOrigen = elOrigen.getBoundingClientRect();

    const x1 = rectOrigen.left - canvasRect.left + rectOrigen.width / 2;
    const y1 = rectOrigen.top - canvasRect.top + rectOrigen.height / 2;

    nodoActivo.relaciones.forEach(rel => {
        const elDestino = document.getElementById(`node-${rel.targetId}`);
        if (!elDestino) return;

        const rectDestino = elDestino.getBoundingClientRect();
        const x2 = rectDestino.left - canvasRect.left + rectDestino.width / 2;
        const y2 = rectDestino.top - canvasRect.top + rectDestino.height / 2;

        const midX = (x1 + x2) / 2;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#ff1744');
        path.setAttribute('stroke-width', '2.5');
        path.setAttribute('stroke-dasharray', '6,4');
        svg.appendChild(path);
    });
}

window.addEventListener('resize', () => {
    dibujarLineasCausales();
});


   //EXPLORADOR CRONOLÓGICO Y COMPARADOR DE CORRIENTES
const hitosCronologicos = [
    {
        anio: "1814 – 1815",
        eje: "restauracion",
        ejeNombre: "Mundo Post-Napoleónico",
        titulo: "Congreso de Viena y Acta Final",
        desc: "Las potencias europeas (Reino Unido, Austria, Rusia, Prusia y Francia) rediseñan el mapa continental en el Palacio del Hofburg bajo los principios de legitimidad monárquica, equilibrio de poderes y Estados tapón.",
        fuente: "Acta Final del Congreso de Viena (1815) / Historia National Geographic"
    },
    {
        anio: "1815",
        eje: "restauracion",
        ejeNombre: "Mundo Post-Napoleónico",
        titulo: "Creación de la Santa Alianza",
        desc: "Impulsada por el zar Alejandro I junto con Austria y Prusia, establece un pacto de intervención militar contra cualquier movimiento liberal o nacionalista que amenace los tronos restaurados.",
        fuente: "Hobsbawm (2009), Cap. 3 / El Orden Mundial"
    },
    {
        anio: "1816 – 1824",
        eje: "industria",
        ejeNombre: "Revolución Industrial y Utopías",
        titulo: "Reformas laborales de Robert Owen en New Lanark",
        desc: "En su fábrica textil de Escocia, Robert Owen reduce la jornada laboral, prohíbe el trabajo infantil, crea escuelas gratuitas y ofrece viviendas dignas como respuesta a la explotación industrial.",
        fuente: "Engels (1880) / History Crunch (2026)"
    },
    {
        anio: "1820 – 1829",
        eje: "nacionalismo",
        ejeNombre: "Romanticismo y Nacionalismo",
        titulo: "Oleada revolucionaria de 1820 e Independencia de Grecia",
        desc: "Estallan levantamientos constitucionales en España e Italia, mientras Grecia lucha por independizarse del Imperio Otomano con el respaldo entusiasta de artistas y poetas románticos como Lord Byron.",
        fuente: "Berlin (2000) / Hobsbawm (2009)"
    },
    {
        anio: "1829 – 1840",
        eje: "industria",
        ejeNombre: "Revolución Industrial y Utopías",
        titulo: "Proyecto de los Falansterios de Charles Fourier",
        desc: "Frente a la monotonía y pobreza del trabajo fabril, Fourier propone comunidades cooperativas autosuficientes de 1.600 personas basadas en la libre elección del trabajo y la igualdad entre hombres y mujeres.",
        fuente: "Filosofía.net / Repositorio Institucional UNAM"
    },
    {
        anio: "1830",
        eje: "industria",
        ejeNombre: "Revolución Industrial y Utopías",
        titulo: "Inauguración del Ferrocarril Liverpool–Manchester",
        desc: "La locomotora 'The Rocket' diseñada por George Stephenson inaugura el transporte ferroviario moderno, consolidando la expansión industrial, la urbanización y la integración de mercados.",
        fuente: "Osterhammel (2015) / Encyclopædia Britannica"
    },
    {
        anio: "1830 – 1831",
        eje: "nacionalismo",
        ejeNombre: "Romanticismo y Nacionalismo",
        titulo: "Revoluciones de 1830 y fundación de 'La Joven Italia'",
        desc: "En Francia cae el rey absolutista Carlos X (inmortalizado por Delacroix), Bélgica logra su independencia y Giuseppe Mazzini funda 'La Joven Italia' para impulsar una república unificada y democrática.",
        fuente: "Manifiesto de la Joven Italia (1831) / SEP"
    },
    {
        anio: "1843",
        eje: "industria",
        ejeNombre: "Revolución Industrial y Utopías",
        titulo: "Publicación de 'La Unión Obrera' de Flora Tristán",
        desc: "Flora Tristán plantea la necesidad de una organización internacional de los trabajadores y vincula por primera vez la justicia social obrera con la emancipación de la mujer.",
        fuente: "Repositorio Institucional UNAM / Filosofía.net"
    },
    {
        anio: "1848",
        eje: "nacionalismo",
        ejeNombre: "Romanticismo y Nacionalismo",
        titulo: "La Primavera de los Pueblos",
        desc: "Una oleada revolucionaria recorre París, Viena, Berlín, Milán y Budapest exigiendo constituciones, derechos laborales y soberanía nacional, marcando el colapso definitivo del sistema de Metternich.",
        fuente: "Hobsbawm (2009) / Scribd Tema 3 Historia"
    }
];

function filtrarCronologia(eje, btn) {
    if (btn) {
        document.querySelectorAll('.tl-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    const container = document.getElementById('timelineContainer');
    if (!container) return;

    const filtrados = eje === 'todos' ? hitosCronologicos : hitosCronologicos.filter(h => h.eje === eje);

    container.innerHTML = filtrados.map(h => `
        <div class="timeline-row">
            <div class="timeline-row-top">
                <span class="timeline-year-badge">${h.anio}</span>
                <span class="timeline-axis-tag">${h.ejeNombre}</span>
            </div>
            <h4>${h.titulo}</h4>
            <p>${h.desc}</p>
            <span class="timeline-source-note">Fuente de referencia: ${h.fuente}</span>
        </div>
    `).join('');
}

const corrientesData = {
    romanticismo: {
        problema: "Reaccionaba contra el racionalismo frío de la Ilustración, las reglas rígidas del Neoclasicismo y la deshumanización provocada por la mecanización industrial.",
        impulsores: "Johann G. von Herder, Lord Byron, Eugène Delacroix, Victor Hugo y Caspar David Friedrich.",
        propuesta: "Exaltar la libertad individual, la subjetividad, las emociones, la naturaleza sublime y el rescate de las lenguas, músicas y tradiciones populares (Volksgeist).",
        legado: "Transformó el arte y la literatura europea y dotó al nacionalismo de símbolos, relatos históricos y mística de lucha por la libertad."
    },
    nacionalismo: {
        problema: "Cuestionaba las fronteras artificiales impuestas en el Congreso de Viena (1815) y el sometimiento de pueblos enteros bajo imperios multinacionales (Austriaco, Ruso y Otomano).",
        impulsores: "Giuseppe Mazzini ('La Joven Italia'), Giuseppe Garibaldi, Lajos Kossuth y los movimientos estudiantiles alemanes.",
        propuesta: "Defender que cada nación unida por lengua, cultura e historia común constituye una comunidad soberana con derecho a formar un Estado independiente.",
        legado: "Impulsó las revoluciones de 1820, 1830 y 1848 y culminó en la unificación de Italia (1861) y Alemania (1871), reconfigurando el mapa europeo."
    },
    utopias: {
        problema: "Denunciaba la cuestión social creada por la Revolución Industrial: jornadas de 14 a 16 horas, trabajo infantil, salarios de miseria y hacinamiento en las ciudades fabriles.",
        impulsores: "Henri de Saint-Simon, Charles Fourier, Robert Owen y Flora Tristán.",
        propuesta: "Sustituir la competencia capitalista por comunidades cooperativas armónicas (como New Lanark o los falansterios), educación gratuita y planificación productiva.",
        legado: "Sentó las bases del cooperativismo moderno, la reducción de la jornada laboral, los primeros sindicatos y la lucha por los derechos sociales."
    }
};

function compararCorriente(key, btn) {
    document.querySelectorAll('.comp-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const data = corrientesData[key];
    const box = document.getElementById('comparatorResult');
    if (!data || !box) return;

    box.innerHTML = `
        <div class="comp-detail-card">
            <strong>¿A qué problema respondía?</strong>
            <p>${data.problema}</p>
        </div>
        <div class="comp-detail-card">
            <strong>Principales impulsores</strong>
            <p>${data.impulsores}</p>
        </div>
        <div class="comp-detail-card highlight-card">
            <strong>Propuesta central</strong>
            <p>${data.propuesta}</p>
        </div>
        <div class="comp-detail-card highlight-card">
            <strong>Legado histórico</strong>
            <p>${data.legado}</p>
        </div>
    `;
}


//INICIALIZACIÓN AL CARGAR LA PÁGINA

document.addEventListener('DOMContentLoaded', () => {
    renderRedHistorica();
    filtrarCronologia('todos');
    compararCorriente('romanticismo');
});