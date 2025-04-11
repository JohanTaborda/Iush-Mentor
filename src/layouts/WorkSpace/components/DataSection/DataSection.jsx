import React, { useEffect } from "react";
import "./DataSection";
import "./DataSection.css";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; //Navigate redirecciona automáticamente.

//Importamos los componentes Hijos
import Tutoring from "../../../../pages/Tutoring/Tutoring.jsx";
import Forum from "../../../../pages/Forum/Forum.jsx";
import Home from "../../../../pages/Home/Home.jsx";

const DataSection = ({ buttonSelected }) => {

  const navigate = useNavigate();

  useEffect(() => { //Efecto que permite navegar entre las rutas según el botón seleccionado
    switch (buttonSelected) {
      case "Inicio": navigate("/inicio"); break;
      case "Tutorias": navigate("/tutorias"); break;
      case "Foro": navigate("/foro"); break;
    }
  }, [buttonSelected, navigate]); //Dependencia
  

  return (
    <Routes> {/*Rutas generales */}
      <Route path="/inicio" element={<Home />} /> {/*Rutas especificas.*/}
      <Route path="/tutorias" element={<Tutoring />} />
      <Route path="/foro" element={<Forum />} />
      <Route path="*" element={<Navigate to="/inicio" />} /> {/*Ruta por defecto al iniciar sesión*/}
    </Routes>
  );
};

export default DataSection;
