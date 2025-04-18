import React, { useEffect } from "react";
import "./DataSection";
import "./DataSection.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; // Navigate redirecciona automáticamente.

// Importamos los componentes Hijos
import Tutoring from "../../../../pages/Tutoring/Tutoring.jsx";
import Forum from "../../../../pages/Forum/Forum.jsx";
import Home from "../../../../pages/Home/Home.jsx";

const DataSection = ({ buttonSelected }) => {
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
      default:
        break;
    }
  }, [buttonSelected, navigate]); // Dependencias

  return (
    <div className="mainDataSection">
      <Routes>
        {/* Rutas generales */}
        <Route path="/inicio" element={<Home />} />
        {/* Ruta específica de tutorías */}
        <Route path="/tutorias" element={<Tutoring />} />
        {/* Ruta específica del foro */}
        <Route path="/foro" element={<Forum />} />
        {/* Ruta por defecto al iniciar sesión */}
        <Route path="" element={<Navigate to="/inicio" />} />
      </Routes>
    </div>
  );
};

export default DataSection;
