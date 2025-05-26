import React, { useEffect, useState } from "react";
import "./Auth.css";
import Login from "../../pages/Login/Login.jsx";
import Register from "../../pages/Register/Register.jsx";
import { useLocation } from "react-router-dom";

// Componente Auth que decide si mostrar el formulario de Login o Registro
const Auth = ({ setMainComponent, setVisAuth }) => {
    const location = useLocation();
    const [visRegister, setVisRegister] = useState(false);

    useEffect(() => {
        setVisRegister(location.pathname === "/registro");
    }, [location.pathname]);

    useEffect(() => {
    }, [visRegister]);

    // Renderiza condicionalmente el componente Register o Login
    return (
        <>
            {visRegister ? (
                <Register setVisAuth={setVisAuth} setVisRegister={setVisRegister} />
            ) : (
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
