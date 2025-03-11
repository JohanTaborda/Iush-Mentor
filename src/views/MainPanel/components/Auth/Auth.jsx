import React, { useState } from "react";
import "./Auth.css" // Estilos personalizados para el componente Auth.
import "./Auth" // Funciones personalizadas para el componente Auth.

//Importamos los componentes Hijos
import Login from "./Components/Login/Login.jsx"
import Register from "./Components/Register/Register.jsx"

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/

const Auth = ({setMainComponent}) => {
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
                <Login setVisRegister={setVisRegister} setMainComponent={setMainComponent}/>
            )}
        
        </>
    )
}

export default Auth;