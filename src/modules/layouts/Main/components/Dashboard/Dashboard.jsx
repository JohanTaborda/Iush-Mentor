import React, { useEffect, useState } from 'react'
import './Dashboard.css' // Estilos personalizados para el componente App.

//Importamos los componentes Hijos
import Navbar from "../../../Navbar/Navbar.jsx"
import WorkSpace from "../../../WorkSpace/WorkSpace.jsx"

const App = ({setMainComponent}) => {
  const [rol, setRol] = useState('estudiante');
  // Constantes.
  //Constante que actualiza su estado con el botón seleccionado en el navbar. Este intenta recuperar el valor guardado en el sessionStorage, si no hay valores, muestra 'Tutorias'
  //usamos sessionStorage para que me guarde el valor de forma temporal, mientras la pestaña este abierta.
  const [buttonSelected, setButtonSelected] = useState(() => { return sessionStorage.getItem('optionSelected') || "Inicio"; }); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //Usamos esta constante para validar el tamaño de la pantalla, para tomar diferentes propiedades según sea el caso.

  useEffect(() => { //useEffect que cambia el estado setIsMobile cuando el ancho es menor a 768.
    const handleResize = () => {setIsMobile(window.innerWidth <= 768); };  //Si el ancho es menor a 768, actualizamos el setter con verdadero.
    //Window representa la ventana del navegador, usamos el metodo que permite escuchar eventos en la ventana, ponemos el evento resize y la función a ejecutar.
    window.addEventListener("resize", handleResize); 
    handleResize();  //Cada vez que se redimensiona la pantalla ejecutamos la función para cambiar el estado del setter.
    return () => {window.removeEventListener("resize", handleResize); }; // Limpia el listener cuando el componente se desmonta

  }, []);//Se ejecuta al montarse el componente

  return (
    <div id='WorkSpaceGeneralStyles'> {/*Bloque que almacena los componentes Hijos*/}
      {isMobile ? ( //Si isMobile es true, me muestra el workspace encima del navbar
        <>
           <WorkSpace buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/> {/*Enviamos mediante props buttonSelected, para permitir la paginación por cada componente*/}
           <Navbar setButtonSelected={setButtonSelected} setMainComponent={setMainComponent} rol={rol} /> {/*Enviamos mediante props setButtonSelected, para actualizar el valor según el botón seleccionado en el navbar.*/}
        </>
      ) : ( //Si isMobile es False, me muestra el workspace al ladod el navbar.
        <>
            <Navbar setButtonSelected={setButtonSelected} setMainComponent={setMainComponent} rol={rol}/> {/*Enviamos mediante props setButtonSelected, para actualizar el valor según el botón seleccionado en el navbar.*/}
            <WorkSpace buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/> {/*Enviamos mediante props buttonSelected, para permitir la paginación por cada componente*/}
        </>
      )}
    </div>
  )
}

export default App;
