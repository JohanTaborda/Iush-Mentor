import React, { useState } from "react";
import "./Login"  // Funciones personalizadas para el componente Login.
import "./Login.css"  // Estilos personalizados para el componente Login.

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
const Login = ({setVisRegister}) => {

    // Variables.

    // Constantes.

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
            <h2>Espacio para trabajar el Login</h2>
            <button onClick={() => setVisRegister(true)}>Register</button>
        </>
    )
}

export default Login;