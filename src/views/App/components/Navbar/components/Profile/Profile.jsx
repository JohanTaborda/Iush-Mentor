import React from "react";
import "./Profile" // Funciones personalizadas para el componente Profile.
import "./Profile.css" // Estilos personalizados para el componente Profile.

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/

//Recibimos mediante props el setter que nos permite cerrar la ventana emergente.
const Profile = ({setVisWindowsProfile}) => {

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

    return(
        <>
           <div className="overlayGeneral"> {/*Bloque principal que contiene el overlay del componente.*/}
                <div className="containerGeneralOverlay"> {/*Contenedor central, que almacena toda la información interactiva del componente. */}
                    Espacio para trabajar la ventana emergente de Perfil. {/*Mensaje del espacio de trabajo */}
                    <button onClick={() => setVisWindowsProfile(false)}>Cerrar</button> {/*Botón que permite cambiar el estado del setter recibido por props para cerrar la ventana. */}
                </div>
           </div>
        </>
    )
}

export default Profile;