import React from "react";// Importa React (necesario para componentes JSX)
import "./Home.css";// Importa los estilos específicos de este componente
import { useNavigate } from 'react-router-dom';// Importa el hook useNavigate de react-router-dom (aunque por ahora no se usa)
import { useState } from 'react';// Importa el hook useState para manejar el estado del calendario
import Calendar from 'react-calendar';// Importa el componente de calendario
import 'react-calendar/dist/Calendar.css';// Importa los estilos por defecto del calendario
import React from "react";//Componente Principal Home
import "./Home.css" // Estilos personalizados para el componente Home.


const Home = () => {
  // Estado para guardar la fecha seleccionada en el calendario
  const [date, setDate] = useState(new Date());

  return (
    <main>
      <section>
        {/* Contenedor de tutorías a dirigir como tutor */}
        <fieldset className="preset-container">
          <legend className="tittle-container">Tutorías a dirigir como tutor</legend>
          <p>Aún no has creado ninguna tutoría.</p>

          {/* Botón Agendar deshabilitado temporalmente, muestra alerta mientras no hay rutas disponibles */}
          <button
            className="preset-btn"
            onClick={() => alert("Esta función estará disponible cuando se habiliten las rutas.")}>
            Agendar
          </button>
        </fieldset>

        {/* Contenedor de tutorías inscritas como estudiante */}
        <fieldset className="mytutorials-container">
          <legend className="tittle-container">Tutorías inscritas como estudiante</legend>
          <p>Aquí aparecerán las tutorías que tú crees.</p>

          {/* Botón Agendar deshabilitado temporalmente, muestra alerta mientras no hay rutas disponibles */}
          <button
            className="preset-btn"
            onClick={() => alert("Esta función estará disponible cuando se habiliten las rutas.")}>
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
