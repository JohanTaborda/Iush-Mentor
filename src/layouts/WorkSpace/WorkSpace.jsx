import React from "react";
import "./WorkSpace.css" // Estilos personalizados para el componente WorkSpace.

//Importamos los componentes Hijos
import HeaderSection from "./components/HeaderSection/HeaderSection.jsx"; //Componente que muestra el encabezado (filtro), de la aplicación
import DataSection from "./components/DataSection/DataSection.jsx"; //Componente que renderiza las páginas de la aplicación.

//Recibimos desde App.jsx el prop de buttonSelected, el cual almacena el valor del botón seleccionado en el navbar
const WorkSpace = ({buttonSelected}) => {
    // Constantes.

    return(
        <div className="container__Workspace">
            <HeaderSection buttonSelected={buttonSelected}/>
            <DataSection buttonSelected={buttonSelected} />
        </div>
    )
}

export default WorkSpace;