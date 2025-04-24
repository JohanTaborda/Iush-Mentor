import React, { useEffect, useState } from "react";
import "./Auth.css" // Estilos personalizados para el componente Auth.

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


    useEffect(() => {
        //console.log(visRegister)
    }, [visRegister])
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
                <Register setVisAuth={setVisAuth} setVisRegister={setVisRegister}/>
            ) : (
                <Login setVisRegister={setVisRegister} setMainComponent={setMainComponent} setVisAuth={setVisAuth} />
            )}
        
        </>
    )
}

export default Auth;