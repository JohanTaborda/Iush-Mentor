import React, { useState, useEffect } from "react";
import "./Tutoring.css"; // Estilos personalizados
import Subcategories from "../../components/Subcategories/Subcategories";
import {useMentorStore, useUserStore} from "../../stores/Store"; // Estado global con Zustand
import { FcPrevious, FcNext } from "react-icons/fc"; // Iconos para las flechas
import { useNavigate, useParams, useLocation } from "react-router-dom"; // Importar hooks de react-router
import { IoMdClose } from "react-icons/io"; // Ícono para cerrar el modal
import { IoAddCircle } from "react-icons/io5"; // Ícono para el botón flotante
import CreateTutoring from "../../components/CreateTutoring/CreateTutoring";
import { ToastContainer, toast } from 'react-toastify';

// COMPONENTE DE FLECHAS
const CarouselArrow = ({ direction, onClick }) => (
  <button className={`carousel-arrow carousel-arrow--${direction}`} onClick={onClick}>
    {direction === "left" ? <FcPrevious size={32} /> : <FcNext size={32} />}
  </button>
);

// CARRUSEL REUTILIZABLE
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

// VISTA PRINCIPAL DEL MODAL DE LAS TUTORIAS CREADAS.
const TutoringModal = ({ isOpen, onClose, subschool, tutorings, userData }) => {
  const navigate = useNavigate(); // Importamos useNavigate en este componente
  const [enrolledTutorings, setEnrolledTutorings] = useState({}); // Estado para controlar inscripciones
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga de datos

  // Verificar inscripciones existentes cuando se abre el modal
  useEffect(() => {
    if (isOpen && userData?.userId) {
      const checkEnrollments = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:3000/enrollments/student/${userData.userId}`);
          const data = await response.json();
          
          if (response.ok) {
            // Crear un objeto con las tutorías en las que ya está inscrito
            const enrolled = {};
            data.forEach(enrollment => {
              enrolled[enrollment.tutoria?.id] = true;
            });
            setEnrolledTutorings(enrolled);
          }
        } catch (error) {
          console.error("Error al verificar inscripciones:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      checkEnrollments();
    }
  }, [isOpen, userData, tutorings]);

  if (!isOpen) return null;

  // Detectar clic fuera del modal para cerrarlo
  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  // Función para manejar la inscripción
  const handleEnroll = async (tutoringId) => {
    try {
      const response = await fetch("http://localhost:3000/enrollments/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_tutoring: tutoringId,
          id_aprendiz: userData?.userId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setEnrolledTutorings(prev => ({ ...prev, [tutoringId]: true }));
        toast.success("¡Inscripción exitosa!");
        setTimeout(() => {
          navigate("/inicio");
        }, 1000); 
      } else {
        toast.warn(data.error || "No se pudo inscribir.");
      }
    } catch (error) {
      console.error("Error al inscribirse:", error);
      toast.error("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Tutorías disponibles en {subschool}</h2>
          <button className="modal-close" onClick={onClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="modal-body">
          {isLoading ? (
            <p>Cargando tutorías...</p>
          ) : tutorings.length > 0 ? (
            tutorings.map((tut) => (
              <div key={tut.id} className="tutoring__card-result">
                <h3>{tut.title}</h3>
                <p>{tut.description}</p>
                <p><strong>Tutor:</strong> {tut.tutor?.username}</p>
                <p><strong>Fecha:</strong> {tut.date}</p>
                <p><strong>Hora:</strong> {tut.start_time} - {tut.end_time}</p>
                <p><strong>Modalidad:</strong> {tut.modality}</p>
                
                {/* Botón de inscripción */}
                {userData.userRol === "aprendiz" && (
                  <div>
                    {!enrolledTutorings[tut.id] ? (
                      <button className="tutoring__enroll-btn" onClick={() => handleEnroll(tut.id)}> Inscribirse </button>
                    ) : (
                      <p className="tutoring__enrolled-message">¡Inscrito correctamente!</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No hay tutorías para esta subescuela.</p>
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

// VISTA PRINCIPAL DE TUTORÍAS
const Tutoring = ({ searchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subschool: urlSubschool } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [visCreateTutoring, setVisCreateTutoring] = useState(false);
  const [userData, setUserData] = useState(useUserStore(value => value.user))

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
            userData={userData}
          />
        </>
      )}
      {(!visCreateTutoring && !modalOpen && userData.userRol === "tutor") && (
        <button className="floating-button" onClick={() => setVisCreateTutoring(true)}> <IoAddCircle size={24} /> <span>Nueva tutoría</span> </button>
      )}
      {visCreateTutoring && (<CreateTutoring closeWindow = {setVisCreateTutoring} />)} {/*Renderizamos el componente que nos permite crear las tutorias. */}
    </main>
  );
};

export default Tutoring;