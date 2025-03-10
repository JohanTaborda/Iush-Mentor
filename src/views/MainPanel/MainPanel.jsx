import React, { useState } from "react";
import "./MainPanel.css" // Estilos personalizados para el componente MainPanel.
import "./MainPanel" // Funciones personalizadas para el componente MainPanel.

//Importamos los componentes Hijos
import Auth from "./components/Auth/Auth.jsx";

/*
const MainPanel = ({setMainComponent}) => {
    // Constantes.
    const[visAuth, setVisAuth] = useState(false);
    
    return(
        <>
        <div>
            <h1>Espacio para MainPanel</h1>
            <button onClick={() => setVisAuth(true)}>Iniciar Sesión</button>
        </div>
        {visAuth && (
            <Auth/>
        )}
    </>
       
    )
}
*/
const Header = () => {
  return (
    <header className="header-bar">
      <div className="header-left">
        <span className="header-icon">🎓</span>
        <h1 className="header-title">IUSH Mentor</h1>
      </div>
      <button className="login-btn">Iniciar Sesión</button>
    </header>
  );
};

const CategoryButton = ({ text, icon, schoolText }) => {
  return (
    <button className="category-btn">
      {icon && <span className="category-icon">{icon}</span>}
      {schoolText && <span className="school-text">{schoolText}</span>}
      {text}
    </button>
  );
};

const ExpertCard = ({ title, subtitle, icon }) => {
  return (
    <div className="expert-card">
      {icon && <span className="expert-icon">{icon}</span>}
      <h3 className="expert-heading">{title}</h3>
      <p className="expert-description">{subtitle}</p>
    </div>
  );
};

const MainPanel = () => {
  return (
    <div className="main-container">
      <Header />
      <div className="panel-content">
        <article className="content-article">
          <h1 className="title">El nuevo sistema de
             tutorías de nuestra universidad</h1>
          <p className="subtitle">
            Miles de estudiantes y docentes unidos para potenciar el aprendizaje y el crecimiento académico.
          </p>
        </article>

        <section className="categories">
          <CategoryButton text="Ciencias Creativas Arte, Diseño e Ingenierías" icon="🎨" schoolText="Escuela de:" />
          <CategoryButton text="Ciencias Administrativas, sociales y Humanas" icon="🗣️" schoolText="Escuela de:" />
        </section>

        <section className="about">
          <div className="about-text">
            <h2 className="about-title">Sobre Nosotros:</h2>
            <p className="about-description">
              IUSH Mentor, permite asignar tutorías personalizadas para estudiantes de todas las edades y niveles educativos. 
              Nuestro objetivo es apoyar tu aprendizaje de manera efectiva y personalizada.
            </p>
            <p className="about-description">
              Con un equipo de tutores altamente calificados y una plataforma interactiva, nos esforzamos por ofrecer una experiencia educativa enriquecedora y atractiva. 
              ¡Únete a nosotros y descubre un nuevo mundo de aprendizaje!
            </p>
          </div>
          <div className="about-image">
            <img src="/img/tutoring-session.jpg" alt="Estudiantes en tutoría" />
          </div>
        </section>

        <section className="expert-path">
          <h2 className="expert-title">Vuélvete un Experto</h2>
          <div className="expert-options">
            <ExpertCard title="Tutorías" subtitle="Recibe orientación de expertos que te ayudarán a resolver dudas y reforzar conocimientos." icon="📘" />
            <ExpertCard title="Talleres" subtitle="Aprende haciendo con sesiones interactivas diseñadas para aplicar la teoría en escenarios reales." icon="🛠️" />
            <ExpertCard title="Rutas de Aprendizaje" subtitle="Sigue un plan estructurado que te guiará paso a paso hacia el dominio de nuevas habilidades." icon="📈" />
          </div>
        </section>
      </div>
      <footer className="footer">
        <p className="footer-text">© Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default MainPanel;
