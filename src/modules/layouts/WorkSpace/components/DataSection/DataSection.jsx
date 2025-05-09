import React, { useEffect } from "react";
import "./DataSection";
import "./DataSection.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Importamos los componentes Hijos
import Tutoring from "../../../../../pages/Tutoring/Tutoring.jsx";
import Forum from "../../../../../pages/Forum/Forum.jsx";
import Home from "../../../../../pages/Home/Home.jsx";
import Configuration from "../../../../../pages/Configuration/Configuration.jsx";
// Importar componentes administrativos
import StudentsDashboard from "../../../../admin/components/students/studentsDashboard.jsx";
import StudentRequest from "../../../../admin/components/request/StudentRequest.jsx";

const DataSection = ({ buttonSelected, searchTerm }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenemos la ruta actual
    const currentPath = window.location.pathname;
    
    // Efecto que permite navegar entre las rutas según el botón seleccionado
    switch (buttonSelected) {
      case "Inicio":
        navigate("/inicio");
        break;
      case "Tutorias":
        // Solo navega si no estamos ya en una subruta de tutorias
        if (!currentPath.startsWith("/tutorias/")) {
          navigate("/tutorias");
        }
        break;
      case "Foro":
        navigate("/foro");
        break;
      case "Configuracion":
        navigate("/perfil/configuracion");
        break;
      // Añadir casos para rutas administrativas
      case "Estudiantes":
        navigate("/admin/estudiantes");
        break;
      case "Solicitudes":
        navigate("/admin/solicitudes");
        break;
      default:
        break;
    }
  }, [buttonSelected, navigate]); // Agregamos navigate como dependencia


  return (
    <div className="mainDataSection">
      <Routes>
        {/* Rutas generales */}
        <Route path="/inicio" element={<Home />} />
        
        {/* Rutas de tutorías */}
        <Route path="/tutorias" element={<Tutoring searchTerm={searchTerm} />} />
        <Route path="/tutorias/:subschool" element={<Tutoring searchTerm={searchTerm} />} />
        
        {/* Ruta específica del foro */}
        <Route path="/foro" element={<Forum />} />
        
        {/* Ruta específica para la sección de configuración*/}
        <Route path="/perfil/configuracion" element={<Configuration />} />
     
        {/* Rutas administrativas */}
¿       <Route path="/admin/estudiantes" element={<StudentsDashboard />} />
        <Route path="/admin/solicitudes" element={<StudentRequest/>} />
        
        {/* Ruta por defecto al iniciar sesión */}
        <Route path="" element={<Navigate to="/inicio" />} />
        
      </Routes>
    </div>
  );
};

export default DataSection;