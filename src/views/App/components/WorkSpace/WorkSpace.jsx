import React from "react";
import "./WorkSpace.css" // Estilos personalizados para el componente WorkSpace.
import "./WorkSpace" // Funciones personalizadas para el componente WorkSpace.

//Importamos los componentes Hijos
import Tutoring from "./components/Tutoring/Tutoring.jsx";
import Routes from "./components/Routes/Routes.jsx";
import Forum from "./components/Forum/Forum.jsx";
import Calendar from "./components/Calendar/Calendar.jsx";

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/

//Recibimos desde App.jsx el prop de buttonSelected, el cual almacena el valor del botón seleccionado en el navbar
const WorkSpace = ({buttonSelected}) => {
    // Variables.

    // Constantes.


    //Constante que permite la páginación de cada componente, según la opción guardada en buttonSelected, me renderiza dicho componente mediante el switch.
    const renderSections = () => {
        switch(buttonSelected){ //Segun la identidad guardada en el estado buttonSelected, se ejecuta el case y retorna el componente que pertenece a ese botón.
          case "Tutorias": return <Tutoring/>;
          case "Mis Rutas": return <Routes/>;
          case "Foro": return <Forum/>;
          case "Calendario": return <Calendar/>;
        }
    }

    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Componente.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------

    return(
        <div className="textSections"> {/*Bloque que almacena el componente renderizado.*/}
            {renderSections()} {/*Llamamos la función para renderizar el componente. */}
        </div>
    )
}

export default WorkSpace;