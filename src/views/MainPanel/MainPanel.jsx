import React, { useState } from "react";
import "./MainPanel.css" // Estilos personalizados para el componente MainPanel.
import "./MainPanel" // Funciones personalizadas para el componente MainPanel.

//Importamos los componentes Hijos
import Auth from "./components/Auth/Auth.jsx";

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
const MainPanel = ({setMainComponent}) => {
    // Constantes.
    const[visAuth, setVisAuth] = useState(false);

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
            <div>
                <h1>Espacio para MainPanel</h1>
                <button onClick={() => setVisAuth(true)}>Iniciar Sesión</button>
            </div>
            {visAuth && (
                <Auth/>
            )}
        </>
    )
}

export default MainPanel;