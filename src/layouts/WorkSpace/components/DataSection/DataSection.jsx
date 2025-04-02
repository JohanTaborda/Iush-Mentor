import React from "react";
import "./DataSection" // Funciones personalizadas para el componente DataSection.
import "./DataSection.css" // Estilos personalizados para el componente DataSection.

//Importamos los componentes Hijos
import Tutoring from "../../../../pages/Tutoring/Tutoring.jsx"
import Routes from "../../../../pages/Routes/Routes.jsx";
import Forum from "../../../../pages/Forum/Forum.jsx";
import Home from "../../../../pages/Home/Home.jsx";

const DataSection = ({buttonSelected}) => {

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

      //Constante que permite la páginación de cada componente, según la opción guardada en buttonSelected, me renderiza dicho componente mediante el switch.
    const renderSections = () => {
    switch(buttonSelected){ //Segun la identidad guardada en el estado buttonSelected, se ejecuta el case y retorna el componente que pertenece a ese botón.
        case "Inicio": return  <Home/>;
        case "Tutorias": return <Tutoring/>;
        case "Mis Rutas": return <Routes/>;
        case "Foro": return <Forum/>;
    }
    }

    return(
        <div className="textSections"> {/*Bloque que almacena el componente renderizado.*/}
            {renderSections()} {/*Llamamos la función para renderizar el componente. */}
        </div>
    )
}

export default DataSection;