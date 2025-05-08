import React, { useState, useEffect } from "react";
import "./Tutoring.css"; // Estilos personalizados
import Subcategories from "../../components/Subcategories/Subcategories";
import {useMentorStore} from "../../stores/Store"; // Estado global con Zustand
import { FcPrevious, FcNext } from "react-icons/fc"; // Iconos para las flechas
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Importar hooks de react-router
import { IoMdClose } from "react-icons/io"; // Ícono para cerrar el modal


// ============================
// COMPONENTE DE FLECHAS
// ============================
const CarouselArrow = ({ direction, onClick }) => (
  <button className={`carousel-arrow carousel-arrow--${direction}`} onClick={onClick}>
    {direction === "left" ? <FcPrevious size={32} /> : <FcNext size={32} />}
  </button>
);

// ============================
// CARRUSEL REUTILIZABLE
// ============================
const SubschoolCarousel = ({ title, data, onCardClick }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Determina cuántos ítems mostrar según el tamaño de pantalla
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 550) setItemsPerPage(1);
      else if (width < 992) setItemsPerPage(2);
      else if (width < 1150) setItemsPerPage(3);
      else if (width < 1300) setItemsPerPage(4);
      else setItemsPerPage(5);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Reinicia la posición del carrusel al cambiar los datos
  useEffect(() => {
    setStartIndex(0);
  }, [data]);

  const maxIndex = Math.max(0, data.length - itemsPerPage);

  const handleNext = () => {
    if (startIndex < maxIndex) setStartIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(prev => prev - 1);
  };

  return (
    <fieldset className="tutoring__fieldset">
      <legend className="tutoring__legend">{title}</legend>
      <div className="tutoring__carousel">
        <CarouselArrow direction="left" onClick={handlePrev} />
        <div className="tutoring__cards-wrapper">
          <div
            className="tutoring__cards"
            style={{
              transform: `translateX(-${(startIndex * 100) / data.length}%)`,
              width: `${(data.length / itemsPerPage) * 100}%`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
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
                  onClick={() => onCardClick(item.title)} 
                />
              </div>
            ))}
          </div>
        </div>
        <CarouselArrow direction="right" onClick={handleNext} />
      </div>
    </fieldset>
  );
};

// ============================
// VISTA PRINCIPAL DE TUTORÍAS
// ============================
const TutoringModal = ({ isOpen, onClose, subschool, tutorings }) => {
  if (!isOpen) return null;

  // Detectar clic fuera del modal para cerrarlo
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Tutorías disponibles para: {subschool}</h2>
          <button className="modal-close" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {tutorings.length > 0 ? (
            tutorings.map((tut) => (
              <div key={tut.id} className="tutoring__card-result">
                <h3>{tut.title}</h3>
                <p>{tut.description}</p>
                <p><strong>Tutor:</strong> {tut.tutor?.username}</p>
                <p><strong>Correo:</strong> {tut.tutor?.email}</p>
                <p><strong>Fecha:</strong> {tut.date}</p>
                <p><strong>Hora:</strong> {tut.start_time} - {tut.end_time}</p>
                <p><strong>Modalidad:</strong> {tut.modality}</p>
                {tut.modality.toLowerCase() === "virtual" ? (
                  <a href={tut.connection_link} target="_blank" rel="noreferrer">Enlace</a>
                ) : (
                  <p><strong>Sala:</strong> {tut.classroom}</p>
                )}
              </div>
            ))
          ) : (
            <p>No hay tutorías para esta subescuela.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================
// VISTA PRINCIPAL DE TUTORÍAS
// ============================
const Tutoring = ({ searchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subschool: urlSubschool } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  
  // Obtenemos el estado global desde Zustand
  const {
    adminSubschools,
    creativeSubschools,
    selectedSubschool,
    setSelectedSubschool,
    tutoringSessions,
    setTutoringSessions
  } = useMentorStore();

  // Normaliza texto eliminando tildes y convirtiendo a minúscula
  const normalizeText = (text) =>
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Tutorías filtradas por subescuela seleccionada
  const filteredTutorings = selectedSubschool
    ? tutoringSessions.filter(tut =>
        normalizeText(tut.program) === normalizeText(selectedSubschool)
      )
    : [];

  // Agrupar tutorías por programa (por si se quiere usar después)
  const tutoringsByProgram = tutoringSessions.reduce((acc, tut) => {
    const key = normalizeText(tut.program);
    if (!acc[key]) acc[key] = [];
    acc[key].push(tut);
    return acc;
  }, {});

  // Maneja la selección de una subescuela
  const handleSubschoolSelect = (subschool) => {
    setSelectedSubschool(subschool);
    setModalOpen(true);
    // Actualiza la URL sin recargar la página
    navigate(`/tutorias/${encodeURIComponent(subschool)}`, { replace: true });
  };

  // Cerrar modal y actualizar URL
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSubschool(null);
    navigate('/tutorias', { replace: true });
  };

  // Cargar tutorías desde el backend solo una vez al montar el componente
  useEffect(() => {
    const fetchTutorings = async () => {
      try {
        const res = await fetch("http://localhost:3000/tutoring");
        const data = await res.json();
        if (res.ok) {
          setTutoringSessions(data); // Guardar en Zustand
        } else {
          console.error("Error al obtener tutorías");
        }
      } catch (error) {
        console.error("Error de conexión al backend", error);
      }
    };
    fetchTutorings();
  }, []);

  

  // Abrir el modal si la URL contiene un parámetro de subescuela
  useEffect(() => {
    if (urlSubschool && tutoringSessions.length > 0) {
      const decodedSubschool = decodeURIComponent(urlSubschool);
      setSelectedSubschool(decodedSubschool);
      setModalOpen(true);
    }
  }, [urlSubschool, tutoringSessions]);

  // Limpiar la subescuela seleccionada cuando el usuario comienza a escribir
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setSelectedSubschool(null);
      setModalOpen(false);
    }
  }, [searchTerm]);

  // Filtrado dinámico por término de búsqueda
  const creativeFiltered = creativeSubschools.filter((item) =>
    normalizeText(item.title).includes(normalizeText(searchTerm))
  );

  const adminFiltered = adminSubschools.filter((item) =>
    normalizeText(item.title).includes(normalizeText(searchTerm))
  );

  const hasCreativeResults = creativeFiltered.length > 0;
  const hasAdminResults = adminFiltered.length > 0;
  const hasAnyResults = hasCreativeResults || hasAdminResults;
  const isSearching = searchTerm.trim() !== '';

  return (
    <main className="tutoring">
      {isSearching && !hasAnyResults ? (
        <div className="tutoring__no-results-container">
          <p className="tutoring__no-results">
            No se encontraron resultados en ninguna de las escuelas.
          </p>
        </div>
      ) : (
        <>
          {/* Carrusel de subescuelas creativas */}
          {(!isSearching || hasCreativeResults) && (
            <SubschoolCarousel
              title="Escuela de Ciencias Creativas"
              data={creativeFiltered.length > 0 ? creativeFiltered : creativeSubschools}
              onCardClick={handleSubschoolSelect}
            />
          )}

          {/* Carrusel de subescuelas administrativas */}
          {(!isSearching || hasAdminResults) && (
            <SubschoolCarousel
              title="Escuela de Ciencias Administrativas, Sociales y Humanas"
              data={adminFiltered.length > 0 ? adminFiltered : adminSubschools}
              onCardClick={handleSubschoolSelect}
            />
          )}

          {/* Mensaje inicial si no se ha seleccionado subescuela */}
          {!selectedSubschool && (
            <p className="tutoring__placeholder">
              Haz clic en una subescuela para ver las tutorías disponibles.
            </p>
          )}

          {/* Modal de tutorías */}
          <TutoringModal 
            isOpen={modalOpen}
            onClose={handleCloseModal}
            subschool={selectedSubschool}
            tutorings={filteredTutorings}
          />
        </>
      )}
    </main>
  );
};

export default Tutoring;