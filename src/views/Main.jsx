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
    const[mainComponent, setMainComponent] = useState(false); //Constante que permite el cambio del panel principal al navbar y workspace

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
           {mainComponent ? ( //Si mainComponent es verdadero, se muestra App (Navbar y Workspace), si es falso se muestra MainPanel.
                <App/>
            ) : (
                <MainPanel setMainComponent={setMainComponent}/>
           )}
        </>
    )
}

export default Main;



