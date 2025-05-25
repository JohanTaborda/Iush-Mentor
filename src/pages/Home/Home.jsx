import React, {useState, useEffect, use} from "react";// Importa React (necesario para componentes JSX)
import "./Home.css";// Importa los estilos específicos de este componente
import { useNavigate } from 'react-router-dom';// Importa el hook useNavigate de react-router-dom 
import 'react-calendar/dist/Calendar.css';// Importa los estilos por defecto del calendario
import {useUserStore, useMentorStore} from "../../stores/Store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDelete from "../../components/modalDelete/ModalDelete.jsx"
import { BeatLoader } from 'react-spinners'; 

const Home = () => {
  // Estado para guardar la fecha seleccionada en el calendario
  const [date, setDate] = useState(new Date());
  const [dataUser, setDataUser] = useState(useUserStore(state => state.user))
  const [dataTutoring, setDataTutoring] = useState(useMentorStore(value => value.tutoringSessions))
  const [rol, setRol] = useState(dataUser.userRol !== "tutor")
  const [enrolledTutorings, setEnrolledTutorings] = useState([]);
  // Estado para el modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [enrollmentToCancel, setEnrollmentToCancel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tutorTutorings = dataTutoring.filter( tut => tut.tutor?.username === dataUser?.username);
  
  // Sincroniza las tutorías al cargar Home
  useEffect(() => {
    const fetchTutorings = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/tutoring");
        const data = await res.json();
        if (res.ok) {
          setDataTutoring(data); 
        }
      } catch (error) {
        console.error("Error de conexión al backend", error);
      }finally{
        setIsLoading(false);
      }
    };
    fetchTutorings();
  }, []);  
  
  const navigate = useNavigate();

  //Tutorias inscritas como estudiante
  useEffect(() => {
  const fetchEnrolledTutorings = async () => {
    try {
      const res = await fetch(`http://localhost:3000/enrollments/student/${dataUser.userId}`);
      const data = await res.json();
      if (res.ok) {
        setEnrolledTutorings(data);
      }
    } catch (error) {
      console.error("Error al cargar tutorías inscritas:", error);
    }
  };

  if (dataUser.userRol === "aprendiz") {
    fetchEnrolledTutorings();
  }
}, [dataUser]);

// Función para abrir el modal de confirmación
const openCancelModal = (enrollmentId) => {
  setEnrollmentToCancel(enrollmentId);
  setIsModalOpen(true);
};

const openDeleteModal = (enrollmentId) => {
  setEnrollmentToCancel(enrollmentId);
  setIsModalDelete(true);
}
// Función para cancelar tutoría inscrito como estudiante
const handleCancelEnrollment = async () => {
  if (!enrollmentToCancel) return;

  try {
    const res = await fetch(`http://localhost:3000/enrollments/${enrollmentToCancel}`, {
      method: "DELETE"
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Inscripción cancelada");
      setEnrolledTutorings(prev => prev.filter(en => en.id !== enrollmentToCancel));
      setIsModalOpen(false);
      setEnrollmentToCancel(null);
    } else {
      toast.error(data.error || "No se pudo cancelar la inscripción");
    }
  } catch (error) {
    console.error("Error al cancelar inscripción:", error);
    toast.error("Error al conectar con el servidor.");
  }
};


return (
    <main>
      <section className="general-container" >
        {/* Contenedor de tutorías a dirigir como tutor */}
                {/* Contenedor de tutorías a dirigir como tutor */}
        <fieldset className="preset-container" style={{display: `${!rol ? "block" : "none"}`}}>
          <div>
            <legend className="tittle-container">Tutorías a dirigir como tutor</legend>
            <button className="preset-btn" onClick={() => navigate("/tutorias")}> Ir a crear </button>
          </div>
          {isLoading ? (
            <div className='loadingComponents' style={{margin:"0"}}>
              Cargando Tutorias Creadas...
              <BeatLoader color="#184ea5" />
            </div>
          ) : (
            <div className="student-tutorials-wrapper">
              {tutorTutorings && tutorTutorings.length > 0 ? (
                <div className="student-tutorials-grid">
                  {tutorTutorings.map((tutoring) => (
                    <div key={tutoring.id} className="student-tutorial-card">
                      <div className="student-tutorial-header">
                        <h4 style={{fontFamily:"Outfit", fontSize: "20px"}}>{tutoring.title}</h4>
                      </div>
                      <div className="student-tutorial-content">
                        <p style={{fontFamily:"Outfit", fontSize:"16px", fontStyle: "italic", color:"#848788"}} className="tutorial-description">{tutoring.description}</p>
                        <div className="tutorial-info">
                          <p><strong>Fecha:</strong> {tutoring.date}</p>
                          <p><strong>Programa:</strong> {tutoring.program}</p>
                          <p><strong>Modalidad:</strong> {tutoring.modality}</p>
                          {tutoring.connection_link ? (
                            <p><strong>Enlace:</strong> <a target="_blank" href={tutoring.connection_link}>Unirse</a></p>
                          ) : (
                            <p><strong>Salón:</strong> {tutoring.classroom}</p>
                          )}
                          <p><strong>Capacidad:</strong> {tutoring.capacity}</p>
                          <p><strong>Hora:</strong> {tutoring.start_time} - {tutoring.end_time}</p>
                          <p><strong>Email tutor:</strong> {tutoring.tutor?.email}</p>
                          
                        </div>
                      </div>
                    <div className="tutor-tutorial-footer">
                      <button className="edit-enrollment-btn" onClick={() => {/* lógica para editar */}}>Editar</button>
                      <button className="cancel-enrollment-btn" onClick={() => openDeleteModal(tutoring.id)}>Eliminar</button>
                      <button className="view-enrollment-btn" onClick={() => {/* lógica para ver estudiantes */}}>Ver Estudiantes</button>
                    </div>
                    </div>
                  ))
                }</div>
              ) : (
                <div>
                  <p>Aquí aparecerán las tutorías que tú crees.</p>
                </div>
              )}
            </div>
          )}
          
        </fieldset>

        {/* Contenedor de tutorías inscritas como estudiante */}
        <fieldset className="mytutorials-container" style={{display: `${rol ? "block" : "none"}`, marginTop: `${rol ? "25px" : "none"}`}} >
          <legend className="tittle-container">Tutorías inscritas como estudiante</legend>
          <button className="preset-btn" onClick={() => navigate("/tutorias")}> Agendar </button>
          {isLoading ? (
            <div className='loadingComponents' style={{margin:"0"}}>
              Cargando Tutorias Inscritas...
              <BeatLoader color="#184ea5"/>
            </div>
          ) : (
            <div className="student-tutorials-wrapper">
              {enrolledTutorings.length > 0 ? (
                <div className="student-tutorials-grid">
                  {enrolledTutorings.map((enrollment) => (
                    <div key={enrollment.id} className="student-tutorial-card">
                      <div className="student-tutorial-header">
                        <h4 style={{fontFamily:"Outfit", fontSize: "20px"}}>{enrollment.tutoria?.title}</h4>
                      </div>
                      <div className="student-tutorial-content">
                        <p style={{fontFamily:"Outfit", fontSize:"16px", fontStyle: "italic", color:"#848788"}} className="tutorial-description">{enrollment.tutoria?.description}</p>
                        <div className="tutorial-info">
                          <p><strong>Fecha:</strong> {enrollment.tutoria?.date}</p>
                          <p><strong>Programa:</strong> {enrollment.tutoria?.program}</p>
                          <p><strong>Hora:</strong> {enrollment.tutoria?.start_time} - {enrollment.tutoria?.end_time}</p>
                          <p><strong>Tutor:</strong> {enrollment.tutoria?.tutor?.username}</p>
                          <p><strong>Email Tutor:</strong> {enrollment.tutoria?.tutor?.email}</p>
                          <p><strong>Modalidad:</strong> {enrollment.tutoria?.modality}</p>
                          {enrollment.tutoria?.modality === "Virtual" ? (
                            <p><strong>Enlace:</strong> <a target="_blank" href={enrollment.tutoria?.connection_link}>Unirse</a></p>
                          ) : (
                            <p><strong>Salón:</strong> {enrollment.tutoria?.classroom}</p>
                          )}
                          <p><strong>Inscrito el:</strong> {new Date(enrollment.enrollment_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="student-tutorial-footer">
                        <button className="cancel-enrollment-btn" onClick={() => openCancelModal(enrollment.id)}>Cancelar inscripción</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>No estás inscrito en ninguna tutoría aún.</p>
                </div>
              )}
            </div>
          )}
          <ToastContainer position="bottom-right" autoClose={3000} />
          
        </fieldset>

      </section>

    {isModalOpen && (
      <ModalDelete title="Cancelar inscripción" description="¿Estás seguro que deseas cancelar la inscripción a esta tutoría?"
        isOpen={isModalOpen} onConfirm={handleCancelEnrollment}
        onCancel={() => {
          setIsModalOpen(false);
          setEnrollmentToCancel(null);
        }}
      />
    )}

    {isModalDelete && (
      <ModalDelete title="Eliminar Tutoria" description="¿Estás seguro que deseas eliminar esta tutoría?"
        isOpen={isModalDelete} onConfirm={handleCancelEnrollment}
        onCancel={() => {
          setIsModalDelete(false);
          setEnrollmentToCancel(null);
        }}
      />
    )}
    </main>
  );
};

// Exporta el componente Home para usarlo en otras partes del proyecto
export default Home;