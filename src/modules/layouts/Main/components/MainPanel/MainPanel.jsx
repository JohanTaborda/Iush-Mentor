// Importa React y hooks necesarios
import React, { useEffect, useState } from "react";

// Importa los estilos personalizados del panel principal
import "./MainPanel.css";

// Importa herramientas de navegación
import { Link, useLocation } from "react-router-dom";

// Importa el componente de autenticación (Login/Register)
import Auth from "../../../../Auth/Auth.jsx";

// Importa íconos visuales para las secciones
import { FcReadingEbook, FcFinePrint, FcMindMap, FcIdea, FcLibrary } from "react-icons/fc";

// Componente Header que contiene el logo, título y botón de inicio de sesión
const Header = ({ setMainComponent }) => {
  const location = useLocation(); // Hook para obtener la ruta actual
  const [visAuth, setVisAuth] = useState(false); // Estado para mostrar u ocultar el componente Auth

  // Muestra el componente Auth si la ruta es /ingresar o /registro
  useEffect(() => {
    setVisAuth(location.pathname.startsWith("/ingresar") || location.pathname.startsWith("/registro"));
  }, [location.pathname]);

  return (
    <header className="header_MainPanel_bar">
      <div className="header_MainPanel_left">
        {/* Logo de la aplicación */}
        <img
          className="header_MainPanel_icon"
          src="src/resources/images/logoAplication/Logo-IushMentor-NoText.png"
          alt="Logo Iush Mentor"
        />
        <h1 className="header_MainPanel_tittle">IUSH Mentor</h1>
      </div>

      {/* Botón para iniciar sesión */}
      <Link to="/ingresar">
        <button onClick={() => setVisAuth(true)} className="login_btn_MainPanel">
          Iniciar Sesión
        </button>
      </Link>

      {/* Renderiza el componente Auth si visAuth es true */}
      {visAuth && (
        <Auth setMainComponent={setMainComponent} setVisAuth={setVisAuth} />
      )}
    </header>
  );
};

// Componente reutilizable para los botones de escuelas
const SchoolButton = ({ text, icon, schoolText }) => {
  return (
    <div className="school_btn">
      {icon && <span className="school_icon">{icon}</span>}
      {schoolText && <span className="school_text">{schoolText}</span>}
      <span className="school_description">{text}</span>
    </div>
  );
};

// Componente reutilizable para las tarjetas de experto
const ExpertCard = ({ title, subtitle, icon }) => {
  return (
    <div className="expert_card">
      {icon && <span className="expert_icon">{icon}</span>}
      <h3 className="about_title" id="title_expertCard">{title}</h3>
      <p className="expert_description">{subtitle}</p>
    </div>
  );
};

// Componente principal que representa la vista inicial del sistema
const MainPanel = ({ setMainComponent }) => {
  return (
    <div className="main_container">
      {/* Encabezado con logo y botón de login */}
      <Header setMainComponent={setMainComponent} />

      <div className="panel_content">
        {/* Sección de bienvenida */}
        <article className="content_article">
          <h1 className="title_main">
            El nuevo sistema de tutorías de nuestra universidad
          </h1>
          <p className="subtitle_main">
            Miles de estudiantes y docentes unidos para potenciar el aprendizaje y el crecimiento académico.
          </p>
        </article>

        {/* Botones para elegir escuela */}
        <section className="content_btn_schools">
          <SchoolButton 
            text="Ciencias Creativas Arte, Diseño e Ingenierías" 
            icon={<FcIdea />} 
            schoolText="Escuela de:" 
          />
          <SchoolButton 
            text="Ciencias Administrativas, sociales y Humanas" 
            icon={<FcLibrary />} 
            schoolText="Escuela de:" 
          />
        </section>

        {/* Sección informativa sobre la plataforma */}
        <section className="about">
          <div className="about_text">
            <h2 className="about_title">Sobre Nosotros:</h2>
            <p className="about_description">
              IUSH Mentor, permite asignar tutorías personalizadas para estudiantes de todas las edades y niveles educativos. 
              Nuestro objetivo es apoyar tu aprendizaje de manera efectiva y personalizada.
            </p>
            <p className="about_description">
              Con un equipo de tutores altamente calificados y una plataforma interactiva, nos esforzamos por ofrecer una experiencia educativa enriquecedora y atractiva. 
              ¡Únete a nosotros y descubre un nuevo mundo de aprendizaje!
            </p>
          </div>
          <div className="about_image">
            <img src="src/resources/images/logoAplication/tutoriaIUSH.png" alt="Estudiantes en tutoría" />
          </div>
        </section>

        {/* Sección de beneficios o rutas de aprendizaje */}
        <section className="expert_path">
          <h2 className="about_title">Vuélvete un Experto</h2>
          <div className="expert_options">
            <ExpertCard 
              title="Tutorías" 
              subtitle="Recibe orientación de expertos que te ayudarán a resolver dudas y reforzar conocimientos." 
              icon={<FcFinePrint />} 
            />
            <ExpertCard 
              title="Talleres" 
              subtitle="Aprende haciendo con sesiones interactivas diseñadas para aplicar la teoría en escenarios reales." 
              icon={<FcReadingEbook />} 
            />
            <ExpertCard 
              title="Rutas de Aprendizaje" 
              subtitle="Sigue un plan estructurado que te guiará paso a paso hacia el dominio de nuevas habilidades." 
              icon={<FcMindMap />} 
            />
          </div>
        </section>
      </div>

      {/* Pie de página */}
      <footer className="footer_MainPanel">
        <p className="footer_MainPanel_text">© Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default MainPanel;
