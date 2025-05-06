import React, { useState, useEffect, useRef } from "react";// Importación de React y hooks necesarios
import "./Tutoring.css" // Estilos personalizados para el componente Tutoring.
import Subcategories from "../../components/Subcategories/Subcategories";// Importación del componente de tarjetas (Subcategorías)
import "./Tutoring.css";// Importación del archivo de estilos específicos para esta vista
// Importación de iconos representativos desde react-icons/fc
import {
  FcPrevious, FcNext, FcStatistics, FcCustomerSupport, FcCurrencyExchange, FcBusiness,
  FcBriefcase, FcGlobe, FcFlowChart, FcOrganization, FcDebt, FcDiploma2, FcClapperboard,
  FcCapacitor, FcSupport, FcCommandLine, FcReddit, FcSportsMode, FcSelfServiceKiosk,
  FcFilmReel, FcBullish
} from "react-icons/fc";

// ============================
// SUBESCUELAS ADMINISTRATIVAS
// ============================
const adminSubschools = [
  // Cada objeto representa una subescuela con título, descripción e ícono
  { id: 0, title: "Administración de Empresas", description: "Desarrolla habilidades en gestión empresarial.", icon: <FcStatistics /> },
  { id: 1, title: "Comunicación Organizacional", description: "Procesos comunicativos internos y externos.", icon: <FcCustomerSupport /> },
  { id: 2, title: "Contaduría Pública", description: "Administra recursos y analiza información financiera.", icon: <FcCurrencyExchange /> },
  { id: 3, title: "Derecho", description: "Normativas jurídicas nacionales e internacionales.", icon: <FcBusiness /> },
  { id: 4, title: "Mercadeo", description: "Estrategias de marketing efectivas.", icon: <FcBriefcase /> },
  { id: 5, title: "Negocios Internacionales", description: "Operaciones globales de comercio.", icon: <FcGlobe /> },
  { id: 6, title: "Talento Humano", description: "Selección y clima organizacional.", icon: <FcFlowChart /> },
  { id: 7, title: "Gestión Empresarial", description: "Administración moderna en entornos competitivos.", icon: <FcOrganization /> },
  { id: 8, title: "Mercadeo y Ventas", description: "Procesos comerciales efectivos.", icon: <FcDebt /> },
  { id: 9, title: "Gestión Internacional", description: "Proyectos de globalización empresarial.", icon: <FcDiploma2 /> }
];

// ============================
// SUBESCUELAS CREATIVAS
// ============================
const creativeSubschools = [
  { id: 0, title: "Animación", description: "Contenido animado 2D y 3D.", icon: <FcClapperboard /> },
  { id: 1, title: "Ing. Electrónica", description: "Soluciones electrónicas innovadoras.", icon: <FcCapacitor /> },
  { id: 2, title: "Ing. Industrial", description: "Optimización de procesos productivos.", icon: <FcSupport /> },
  { id: 3, title: "Ing. de Sistemas", description: "Soluciones tecnológicas y software.", icon: <FcCommandLine /> },
  { id: 4, title: "Diseño Gráfico", description: "Comunicación visual y diseño digital.", icon: <FcReddit /> },
  { id: 5, title: "Diseño de Modas", description: "Prendas con estética y técnica.", icon: <FcSportsMode /> },
  { id: 6, title: "Tec. en Sistemas", description: "Sistemas informáticos y mantenimiento.", icon: <FcSelfServiceKiosk /> },
  { id: 7, title: "Producción Musical", description: "Contenido musical profesional.", icon: <FcFilmReel /> },
  { id: 8, title: "Inteligencia de Negocios", description: "Decisiones estratégicas basadas en datos.", icon: <FcBullish /> }
];

// ============================
// COMPONENTE DE FLECHAS
// ============================
// Botón reutilizable de flecha izquierda o derecha
const CarouselArrow = ({ direction, onClick }) => (
  <button className={`carousel-arrow carousel-arrow--${direction}`} onClick={onClick}>
    {direction === "left" ? <FcPrevious size={32} /> : <FcNext size={32} />}
  </button>
);

// ============================
// CARRUSEL REUTILIZABLE
// ============================
const SubschoolCarousel = ({ title, data }) => {
  const [startIndex, setStartIndex] = useState(0); // Índice inicial del carrusel
  const [itemsPerPage, setItemsPerPage] = useState(5); // Tarjetas visibles según tamaño

  // Detecta tamaño de pantalla para ajustar items visibles
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 550) setItemsPerPage(1);
      else if (width < 992) setItemsPerPage(2);
      else if (width < 1150) setItemsPerPage(3);
      else if (width < 1300) setItemsPerPage(4);
      else setItemsPerPage(5); //Máximo 5 en pantallas grandes
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setStartIndex(0); // Reinicia el índice cuando cambia el contenido
  }, [data]);

  const maxIndex = Math.max(0, data.length - itemsPerPage); // Evita desbordes en el carrusel

  // Avanzar carrusel (sin sobrepasar el final)
  const handleNext = () => {
    if (startIndex < maxIndex) {
      setStartIndex(prev => prev + 1);
    }
  };

  // Retroceder carrusel (sin ir antes de 0)
  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <fieldset className="tutoring__fieldset">
      {/* Título del fieldset */}
      <legend className="tutoring__legend">{title}</legend>

      <div className="tutoring__carousel">
        {/* Flecha izquierda */}
        <CarouselArrow direction="left" onClick={handlePrev} />

        {/* Carrusel de tarjetas */}
        <div className="tutoring__cards-wrapper">
          <div
            className="tutoring__cards"
            style={{
              transform: `translateX(-${(startIndex * 100) / data.length}%)`,
              width: `${(data.length / itemsPerPage) * 100}%`, // Ancho dinámico total
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {/* Render dinámico de cada tarjeta de subcategoría con un map */}
            {data.map((item) => (
              <div
                key={item.id}
                className="tutoring__card"
                style={{ flex: `0 0 ${100 / data.length}%` }}
              >
                <Subcategories
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <CarouselArrow direction="right" onClick={handleNext} />
      </div>
    </fieldset>
  );
};

// ============================
// VISTA PRINCIPAL DE TUTORÍAS
// ============================
// Renderiza los dos carruseles por escuela
// Recibe el texto del input desde WorkSpace
// ============================
// VISTA PRINCIPAL DE TUTORÍAS
// ============================
// Renderiza los dos carruseles por escuela
// Recibe el texto del input desde WorkSpace
const Tutoring = ({ searchTerm }) => {
  // Función para eliminar tildes y pasar a minúsculas
  const normalizeText = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Filtramos subescuelas creativas según el texto buscado (insensible a tildes y mayúsculas)
  const creativeFiltered = creativeSubschools.filter((item) =>
    normalizeText(item.title).includes(normalizeText(searchTerm))
  );

  // Filtramos subescuelas administrativas igual que arriba
  const adminFiltered = adminSubschools.filter((item) =>
    normalizeText(item.title).includes(normalizeText(searchTerm))
  );

  // Verificamos si hay resultados en alguna de las escuelas
  const hasCreativeResults = creativeFiltered.length > 0;
  const hasAdminResults = adminFiltered.length > 0;
  const hasAnyResults = hasCreativeResults || hasAdminResults;
  
  // Si no hay término de búsqueda, mostramos ambas escuelas
  const isSearching = searchTerm.trim() !== '';

  return (
    <main className="tutoring">
      {/* Si no hay resultados y estamos buscando, mostramos un mensaje general */}
      {isSearching && !hasAnyResults ? (
        <div className="tutoring__no-results-container">
          <p className="tutoring__no-results">
            No se encontraron resultados en ninguna de las escuelas.
          </p>
        </div>
      ) : (
        // Si hay resultados o no estamos buscando, mostramos las escuelas correspondientes
        <>
          {/* Solo mostramos la escuela creativa si hay resultados o no estamos buscando */}
          {(!isSearching || hasCreativeResults) && (
            <SubschoolCarousel
              title="Escuela de Ciencias Creativas"
              data={creativeFiltered.length > 0 ? creativeFiltered : creativeSubschools}
            />
          )}

          {/* Solo mostramos la escuela administrativa si hay resultados o no estamos buscando */}
          {(!isSearching || hasAdminResults) && (
            <SubschoolCarousel
              title="Escuela de Ciencias Administrativas, Sociales y Humanas"
              data={adminFiltered.length > 0 ? adminFiltered : adminSubschools}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Tutoring;