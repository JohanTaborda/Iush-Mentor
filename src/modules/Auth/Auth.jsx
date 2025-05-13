// Importa React y hooks necesarios
import React, { useEffect, useState } from "react";

// Importa los estilos específicos del componente Auth
import "./Auth.css";

// Importa los componentes hijos: Login y Register
import Login from "../../pages/Login/Login.jsx";
import Register from "../../pages/Register/Register.jsx";

// Hook de React Router para acceder a la ruta actual
import { useLocation } from "react-router-dom";

// Componente Auth que decide si mostrar el formulario de Login o Registro
const Auth = ({ setMainComponent, setVisAuth }) => {
    // Obtiene la ubicación actual del navegador
    const location = useLocation();

    // Estado para controlar si se muestra el componente de registro
    const [visRegister, setVisRegister] = useState(false);

    // Efecto que se ejecuta cuando cambia la ruta
    useEffect(() => {
        // Si la ruta es "/registro", muestra el componente Register
        setVisRegister(location.pathname === "/registro");
    }, [location.pathname]);

    // Efecto que se ejecuta cuando cambia visRegister (puede usarse para debug)
    useEffect(() => {
        // console.log(visRegister); 
    }, [visRegister]);

    // Renderiza condicionalmente el componente Register o Login
    return (
        <>
            {visRegister ? (
                // Si visRegister es true, muestra el formulario de registro
                <Register setVisAuth={setVisAuth} setVisRegister={setVisRegister} />
            ) : (
                // Si visRegister es false, muestra el formulario de login
                <Login 
                    setVisRegister={setVisRegister} 
                    setMainComponent={setMainComponent} 
                    setVisAuth={setVisAuth} 
                />
            )}
        </>
    );
};

export default Auth;
