import React, { useState } from "react";
import "./Auth.css" // Estilos personalizados para el componente Auth.
import "./Auth.js" // Funciones personalizadas para el componente Auth.

//Importamos los componentes Hijos
import Login from "../../pages/Login/Login.jsx"
import Register from "../../pages/Register/Register.jsx"

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/

const Auth = ({setMainComponent, setVisAuth}) => {
    // Variables.

    // Constantes.
    const [visRegister, setVisRegister] = useState(false);

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Funciones.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
 
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Componente.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------


    return(
        <>
            {visRegister ? (
                <Register/>
            ) : (
                <Login setVisRegister={setVisRegister} setMainComponent={setMainComponent} setVisAuth={setVisAuth} />
            )}
        
        </>
    )
}

export default Auth;