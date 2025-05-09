import React, { useEffect } from "react";
import "./DataSection";
import "./DataSection.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Navigate redirecciona automáticamente.

// Importamos los componentes Hijos
import Tutoring from "../../../../../pages/Tutoring/Tutoring.jsx"; // Componente de tutorías
import Forum from "../../../../../pages/Forum/Forum.jsx";
import Home from "../../../../../pages/Home/Home.jsx";
import Configuration from "../../../../../pages/Configuration/Configuration.jsx"

const DataSection = ({ buttonSelected, searchTerm }) => { // Recibimos desde WorkSpace el texto que el usuario escribió en el buscador
  const navigate = useNavigate();

  useEffect(() => {
    // Efecto que permite navegar entre las rutas según el botón seleccionado
    switch (buttonSelected) {
      case "Inicio":
        navigate("/inicio");
        break;
      case "Tutorias":
        navigate("/tutorias");
        break;
      case "Foro":
        navigate("/foro");
        break;
      case "Configuracion":
        navigate("/perfil/configuracion");
        break;
      default:
        break;
    }
  }, [buttonSelected, navigate]); // Dependencias

  return (
    <div className="mainDataSection">
      <Routes>
        {/* Rutas generales */}
        <Route path="/inicio" element={<Home />} />
        {/* Ruta específica de tutorías, le pasamos el texto del input como prop */}
        <Route path="/tutorias" element={<Tutoring searchTerm={searchTerm} />} />
        {/* Ruta específica del foro */}
        <Route path="/foro" element={<Forum />} />
        {/* Ruta específica para la sección de configuración*/}
        <Route path="/perfil/configuracion" element={<Configuration />} />
        {/* Ruta por defecto al iniciar sesión */}
        <Route path="" element={<Navigate to="/inicio" />} />
        
      </Routes>
    </div>
  );
};

export default DataSection;
