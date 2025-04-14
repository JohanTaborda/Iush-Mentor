import React, { useState } from "react";
import "./Main.css" // Estilos personalizados para el componente Main.

//Importamos los componentes Hijos
import App from "./components/App/App.jsx"
import MainPanel from "./components/MainPanel/MainPanel.jsx";


const Main = () => {

    //Constantes
    const[mainComponent, setMainComponent] = useState(false); //Constante que permite el cambio del panel principal al navbar y workspace

    return(
        <>
           {mainComponent ? ( //Si mainComponent es verdadero, se muestra App (Navbar y Workspace), si es falso se muestra MainPanel.
                <App setMainComponent={setMainComponent} />
            ) : (
                <MainPanel setMainComponent={setMainComponent}/>
           )}
        </>
    )
}

export default Main;



