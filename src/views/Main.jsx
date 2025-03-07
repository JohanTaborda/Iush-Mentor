import React, { useState } from "react";
import "./Main.css" // Estilos personalizados para el componente Main.
import "./Main" // Funciones personalizadas para el componente Main.

//Importamos los componentes Hijos
import App from "./App/App.jsx"
import MainPanel from "./MainPanel/MainPanel.jsx";

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
const Main = () => {

    //Constantes
    const[mainComponent, setMainComponent] = useState(false);

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
           {mainComponent ? (
                <App/>
            ) : (
                <MainPanel setMainComponent={setMainComponent}/>
           )}
        </>
    )
}

export default Main;



