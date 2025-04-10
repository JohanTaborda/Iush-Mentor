import React from "react";
import "./CreateTutoring.css" // Estilos personalizados para el componente CreateTutoring.

const CreateTutoring = ({closeWindow}) => {

    // Variables.


    return(
        <div className="overlayGeneral">
            <div className="containerGeneralOverlay" id="container__createTutoring">
                Espacio para trabajar la creación de las tutorias.
                <button onClick={() => closeWindow(false)}>Cerrar</button>
            </div>
        </div>
    )
}

export default CreateTutoring;