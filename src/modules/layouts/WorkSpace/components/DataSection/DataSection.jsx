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
import Auth from "../../../../Auth/Auth.jsx"; // Asegúrate de importar el componente correcto
import { useUserStore } from "../../../../../stores/Store"; //importa store usuario

const DataSection = ({ buttonSelected, searchTerm }) => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user); // obtiene el usuario
  const rol = user?.userRol || "aprendiz"; //obtiene el rol con fallback
useEffect(() => {
  const currentPath = window.location.pathname;

  // Si es administrador y está en la ruta raíz o en /inicio, redirigir a /admin/usuarios
  if (rol === "administrador" && (currentPath === "/" || currentPath === "/inicio")) {
    navigate("/admin/usuarios");
    return;
  }

  switch (buttonSelected) {
    case "Inicio":
      navigate(rol === "administrador" ? "/admin/usuarios" : "/inicio");
      break;
    case "Tutorias":
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
    case "Usuarios":
      if (rol === "administrador") {
        navigate("/admin/usuarios");
      }
      break;
    case "Solicitudes":
      if (rol === "administrador") {
        navigate("/admin/solicitudes");
      }
      break;
    default:
      break;
  }
}, [buttonSelected, navigate, rol]); // Agregamos navigate como dependencia


  return (
    <div className="mainDataSection">
      <Routes>
        <Route path="/ingresar" element={<Auth />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/tutorias" element={<Tutoring searchTerm={searchTerm} />} />
        <Route path="/tutorias/:subschool" element={<Tutoring searchTerm={searchTerm} />} />
        <Route path="/foro" element={<Forum />} />
        <Route path="/perfil/configuracion" element={<Configuration />} />

        {/* Rutas administrativas SOLO si es admin */}
        {rol === "administrador" && (
          <>
            <Route path="/admin/usuarios" element={<StudentsDashboard />} />
            <Route path="/admin/solicitudes" element={<StudentRequest />} />
          </>
        )}

        {/* Ruta por defecto */}
        <Route path="" element={<Navigate to="/inicio" />} />
      </Routes>
    </div>
  );
};

export default DataSection;