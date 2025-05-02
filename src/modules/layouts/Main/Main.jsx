
import React, { useState, useEffect } from "react";// Importamos React y hooks para manejar estados
import { useNavigate } from "react-router-dom";// useNavigate nos permitiría cambiar de ruta 
// Importamos los componentes hijos
import Dashboard from "./components/Dashboard/Dashboard.jsx"; // Componente principal de la aplicación
import MainPanel from "./components/MainPanel/MainPanel.jsx";
import "./Main.css" // Estilos personalizados para el componente Main.

const Main = () => {
  
  // useState con valor inicial derivado de window.name para tener persistencia en la página
  const [mainComponent, setMainComponent] = useState(() => {
    try {
      //Lee el contenido de window.name (lo que guarda entre recargas)
      const session = JSON.parse(window.name);

      // Si existe session y está logueado, devolvemos true
      return session?.loggedIn || false;

    } catch {
      // Si window.name no tiene datos válidos (o da error), asumimos que no está logueado
      return false;
    }
  });
  // Esto asegura que al recargar la página, se recuerde si el usuario estaba logueado

  // Este useEffect se ejecuta cada vez que mainComponent cambie (o al cargar el componente)
  useEffect(() => {
    try {
      const session = JSON.parse(window.name);

      // Guardamos en window.name el estado actualizado del login
      window.name = JSON.stringify({
        ...session,             // Toma todo lo que ya tenía el objeto session, y luego reemplaza la propiedad loggedIn con el valor de mainComponent.
        loggedIn: mainComponent, // Actualiza el estado de login
      });

    } catch {
      // Si window.name estaba vacío o con datos inválidos, lo creamos desde cero
      window.name = JSON.stringify({
        loggedIn: mainComponent,
      });
    }
  }, [mainComponent]); // El efecto se ejecuta solo cuando mainComponent cambia

  return (
    <>
      {mainComponent ? (
        <Dashboard setMainComponent={setMainComponent} />
      ) : (
        <MainPanel setMainComponent={setMainComponent} />
      )}
    </>
  );
};
export default Main;