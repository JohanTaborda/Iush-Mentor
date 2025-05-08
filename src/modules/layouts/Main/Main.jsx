// Importa React y hooks necesarios
import React, { useState, useEffect } from "react";

// Importa el store de Zustand para manejar el estado del usuario
import { useUserStore } from "../../../stores/Store.js";

// Importa los componentes principales de la aplicación
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import MainPanel from "./components/MainPanel/MainPanel.jsx";

// Importa estilos globales
import "./Main.css";

// Componente principal de la aplicación
const Main = () => {
  // Extrae el usuario y la función para establecerlo desde el store
  const { user, setUser } = useUserStore();

  // Estado local que determina si se muestra el Dashboard o el MainPanel
  const [mainComponent, setMainComponent] = useState(() => {
    try {
      // Intenta recuperar la sesión desde window.name (persistencia simple)
      const session = JSON.parse(window.name);

      // Si hay datos de usuario, los guarda en el store global
      if (session?.user) {
        setUser(session.user);
      }

      // Devuelve el estado de login guardado, o false si no existe
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
  }, [mainComponent, user]); // Se ejecuta cada vez que cambia el login o el usuario

  // Renderiza el Dashboard si el usuario está logueado, de lo contrario muestra el panel principal
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
