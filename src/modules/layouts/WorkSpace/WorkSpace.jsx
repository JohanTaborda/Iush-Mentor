import { React, useState } from "react";
import "./WorkSpace.css" // Estilos personalizados para el componente WorkSpace.

//Importamos los componentes Hijos
import HeaderSection from "./components/HeaderSection/HeaderSection.jsx"; //Componente que muestra el encabezado (filtro), de la aplicación
import DataSection from "./components/DataSection/DataSection.jsx"; //Componente que renderiza las páginas de la aplicación.

//Recibimos desde App.jsx el prop de buttonSelected, el cual almacena el valor del botón seleccionado en el navbar
const WorkSpace = ({buttonSelected, setButtonSelected}) => {
    // Constantes.
    const [searchTerm, setSearchTerm] = useState(""); // Estado que almacena el texto que el usuario escribe en el buscador

    return (
        <div className="container__Workspace">
          {/* Renderizamos el componente HeaderSection (input) */}
          {/* Le enviamos 2 cosas por props:
              - buttonSelected: que ya venía desde App.jsx
              - onSearchChange: le pasamos la función setSearchTerm, 
                para que HeaderSection pueda decirle a WorkSpace cuál es el texto escrito */}
          <HeaderSection 
            buttonSelected={buttonSelected} 
            setButtonSelected = {setButtonSelected}
            onSearchChange={setSearchTerm} 
          />
      
          {/* Renderizamos el componente DataSection (fichas/carruseles) */}
          {/* También le enviamos 2 props:
              - buttonSelected: que ya usaba
              - searchTerm: el valor que escribió el usuario en el input
                Esto le permite a DataSection saber qué texto se está buscando */}
          <DataSection 
            buttonSelected={buttonSelected} 
            searchTerm={searchTerm}
          />
        </div>
      );
    }      

export default WorkSpace;