import React, { useState, useEffect } from "react";
import { useUserStore } from "../../../stores/Store.js";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import MainPanel from "./components/MainPanel/MainPanel.jsx";
import "./Main.css";

// Componente principal de la aplicación
const Main = () => {
  const { user, setUser } = useUserStore();

  const [mainComponent, setMainComponent] = useState(() => {
    try {
      const session = JSON.parse(window.name);
      if (session?.user) {
        setUser(session.user);
      }

      return session?.loggedIn || false;
    } catch {
      // Si ocurre un error al parsear, se asume que no hay sesión activa
      return false;
    }
  });

  // Efecto que sincroniza el estado de sesión con window.name
  useEffect(() => {
    try {
      // Intenta mantener los datos anteriores y actualiza login y usuario
      const session = JSON.parse(window.name);
      window.name = JSON.stringify({
        ...session,
        loggedIn: mainComponent,
        user: user,
      });
    } catch {
      // Si no hay datos previos, crea un nuevo objeto de sesión
      window.name = JSON.stringify({
        loggedIn: mainComponent,
        user: user,
      });
    }
  }, [mainComponent, user]); 

  return (
    <>
    
      {mainComponent && user ? (
        <Dashboard setMainComponent={setMainComponent} />
      ) : (
        <MainPanel setMainComponent={setMainComponent} />
      )}
    </>
  );
};

export default Main;
