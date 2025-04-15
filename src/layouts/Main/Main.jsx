// Importamos React y el hook useState para manejar el estado
import React, { useState } from "react";
// Importamos useEffect para ejecutar efectos secundarios (como guardar info)
import { useEffect } from "react";
// useNavigate nos permitiría cambiar de ruta (aunque no lo usamos aún aquí)
import { useNavigate } from "react-router-dom";
// Importamos los componentes hijos
import App from "./components/App/App.jsx";
import MainPanel from "./components/MainPanel/MainPanel.jsx";


// Componente principal que decidirá qué mostrar: App o MainPanel según Login
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
        <App setMainComponent={setMainComponent} />
      ) : (
        <MainPanel setMainComponent={setMainComponent} />
      )}
    </>
  );
};
export default Main;