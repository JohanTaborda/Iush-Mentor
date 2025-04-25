import React, { useEffect, useState } from "react";
import "./Auth.css" // Estilos personalizados para el componente Auth.

//Importamos los componentes Hijos
import Login from "../../pages/Login/Login.jsx"
import Register from "../../pages/Register/Register.jsx"

import { useLocation } from "react-router-dom";


const Auth = ({setMainComponent, setVisAuth}) => {
    // Constantes.
    const location = useLocation();
    const [visRegister, setVisRegister] = useState(false);

    useEffect(() => {
        setVisRegister(location.pathname === "/registro");
    }, [location.pathname]);
      

    useEffect(() => {
        //console.log(visRegister)
    }, [visRegister])

    return(
        <>
            {visRegister ? (
                <Register setVisAuth={setVisAuth} setVisRegister={setVisRegister}/>
            ) : (
                <Login setVisRegister={setVisRegister} setMainComponent={setMainComponent} setVisAuth={setVisAuth} />
            )}
        
        </>
    )
}

export default Auth;