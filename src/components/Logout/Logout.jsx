import React, { useEffect } from "react";
import "./Logout" // Funciones personalizadas para el componente Logout.
import "./Logout.css" // Estilos personalizados para el componente Logout.

//Recibimos mediante props los siguientes setter: 
//El primero sirve para cerrar la ventana y seguir dentro de App.
//El segundo sirve para cerrar sesión y mostrar el MainPanel.
const Logout = ({setVisWindowsLogout, setMainComponent}) => {

    const handleCloseWindow = () => { //Función que permite ocultar la ventana emergente
        document.querySelector(".containerGeneralOverlay").classList.add("hidden"); //Con el classList.add() le añadimos una clase al querySelector seleccionado.
        setTimeout(() => { //Indicamos una espera de  0.3 segundos.
            setVisWindowsLogout(false) //Cerramos la ventana emergente.
        }, 300);
    }

    useEffect(() => { //Utilizamos el useEffect para cuando se muestre el componente por primera vez lo haga con una transición segun la clase añadida.
        setTimeout(() => {
            document.querySelector(".containerGeneralOverlay").classList.add("active"); //Con el classList.add() le añadimos una clase al querySelector seleccionado.
        }, 10);
    }, [])

    const handleCloseSesion = () => { //Función que permite cerrar sesión.
        setMainComponent(false);
        setVisWindowsLogout(false);
    }

    return(
        <div className="overlayGeneral"> {/*Bloque principal que contiene el overlay del componente.*/}
            <section  className="containerGeneralOverlay"id="containerGeneralLogout"> {/*Contenedor central, que almacena toda la información interactiva del componente. */}
                <h1 className="Logout__title">¿Desea Cerrar Sesión?</h1>
                <div className="logout__buttons">
                    <button className="buttons--interactive" id="button--cancel" onClick={() => handleCloseWindow()}>Cancelar</button>
                    <button className="buttons--interactive" id="button--acept" onClick={() => handleCloseSesion()}>Aceptar</button>
                </div>
            </section>
        </div>
    )
}

export default Logout;