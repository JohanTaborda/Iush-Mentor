import React, {useState, useEffect} from "react";// Importa React (necesario para componentes JSX)
import "./Home.css";// Importa los estilos específicos de este componente
import { useNavigate } from 'react-router-dom';// Importa el hook useNavigate de react-router-dom 
import Calendar from 'react-calendar';// Importa el componente de calendario
import 'react-calendar/dist/Calendar.css';// Importa los estilos por defecto del calendario
import {useUserStore, useMentorStore} from "../../stores/Store"


const Home = () => {
  // Estado para guardar la fecha seleccionada en el calendario
  const [date, setDate] = useState(new Date());
  const[dataUser, setDataUser] = useState(useUserStore(state => state.user))
  const [dataTutoring, setDataTutoring] = useState(useMentorStore(value => value.tutoringSessions))
  const [rol, setRol] = useState(dataUser.userRol !== "tutor")


  const tutorTutorings = dataTutoring.filter( tut => tut.tutor?.username === dataUser?.username);
  
  // Sincroniza las tutorías al cargar Home
  useEffect(() => {
    const fetchTutorings = async () => {
      try {
        const res = await fetch("http://localhost:3000/tutoring");
        const data = await res.json();
        if (res.ok) {
          setDataTutoring(data); 
        }
      } catch (error) {
        console.error("Error de conexión al backend", error);
      }
    };
    fetchTutorings();
  }, []);  
  
  const navigate = useNavigate();
  return (
    <main>
      <section className="general-container" >
        {/* Contenedor de tutorías a dirigir como tutor */}
        <fieldset className="preset-container" style={{display: `${!rol ? "block" : "none"}`}}>
          <legend className="tittle-container">Tutorías a dirigir como tutor</legend>
          <div className="tutoring-cards-container">
            {tutorTutorings && tutorTutorings.length > 0 ? (
              tutorTutorings.map((tutoring) => (
                <div key={tutoring.id} className="tutoring-card">
                  <h4 style={{margin: 0}}>{tutoring.title}</h4>
                  <p style={{margin: 0, fontSize: "0.95em"}}><strong>Fecha:</strong> {tutoring.date}</p>
                  <p style={{margin: 0, fontSize: "0.95em"}}><strong>Tutor:</strong> {tutoring.tutor?.username}</p>
                  <p><strong>Descripción:</strong> {tutoring.description}</p>
                  <p><strong>Programa:</strong> {tutoring.program}</p>
                  <p><strong>Modalidad:</strong> {tutoring.modality}</p>
                  <p><strong>Salón:</strong> {tutoring.classroom}</p>
                  <p><strong>Capacidad:</strong> {tutoring.capacity}</p>
                  <p><strong>Hora inicio:</strong> {tutoring.start_time}</p>
                  <p><strong>Hora fin:</strong> {tutoring.end_time}</p>
                  <p><strong>Email tutor:</strong> {tutoring.tutor?.email}</p>
                  {tutoring.connection_link && (
                    <p><strong>Enlace:</strong> <a href={tutoring.connection_link}>{tutoring.connection_link}</a></p>
                  )}
                  <div className="card-buttons">
                    <button className="edit-btn" onClick={() => {/* lógica para editar */}}>Editar</button>
                    <button className="delete-btn" onClick={() => {/* lógica para eliminar */}}>Eliminar</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aquí aparecerán las tutorías que tú crees.</p>
            )}
          </div>
          {/* Botón Agendar */}
          <button className="preset-btn" onClick={() => navigate("/tutorias")}> Ir a crear </button>
        </fieldset>

        {/* Contenedor de tutorías inscritas como estudiante */}
        <fieldset className="mytutorials-container" style={{display: `${rol ? "block" : "none"}`, marginTop: `${rol ? "25px" : "none"}`}} >
          <legend className="tittle-container">Tutorías inscritas como estudiante</legend>
          <p>Aquí aparecerán las tutorías a las que te inscribas.</p>

          {/* Botón Agendar*/}
          <button
            className="preset-btn"
            onClick={() => navigate("/tutorias")}>
            Agendar
          </button>
        </fieldset>

        {/* Contenedor del calendario de tutorías */}
        <fieldset className="calendar-container">
          <legend className="tittle-calendar">Calendario de Tutorías:</legend>

          {/* Componente de calendario con fecha seleccionada y actualizable */}
          <Calendar onChange={setDate} value={date} />
        </fieldset>
      </section>
    </main>
  );
};

// Exporta el componente Home para usarlo en otras partes del proyecto
export default Home;
