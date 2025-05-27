import React, { useEffect, useState } from 'react'
import './Dashboard.css' 
import Navbar from "../../../Navbar/Navbar.jsx"
import WorkSpace from "../../../WorkSpace/WorkSpace.jsx"
import { useUserStore } from '../../../../../stores/Store'; 

const App = ({ setMainComponent }) => {
  const user = useUserStore((state) => state.user); 
  const rol = user?.userRol || 'aprendiz'; 
  
  const [buttonSelected, setButtonSelected] = useState(() => { return sessionStorage.getItem('optionSelected') || "Inicio"; }); 
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => { 
    const handleResize = () => {setIsMobile(window.innerWidth <= 768); };  
    window.addEventListener("resize", handleResize); 
    handleResize();  
    return () => {window.removeEventListener("resize", handleResize); }; 

  }, []);//Se ejecuta al montarse el componente

  return (
    <div id='WorkSpaceGeneralStyles'> {/*Bloque que almacena los componentes Hijos*/}
      {isMobile ? ( //Si isMobile es true, me muestra el workspace encima del navbar
        <>
           <WorkSpace buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/> 
           <Navbar setButtonSelected={setButtonSelected} setMainComponent={setMainComponent} rol={rol} /> 
        </>
      ) : ( //Si isMobile es False, me muestra el workspace al lado el navbar.
        <>
            <Navbar setButtonSelected={setButtonSelected} setMainComponent={setMainComponent} rol={rol}/> {/*Enviamos mediante props setButtonSelected, para actualizar el valor según el botón seleccionado en el navbar.*/}
            <WorkSpace buttonSelected={buttonSelected} setButtonSelected={setButtonSelected}/> {/*Enviamos mediante props buttonSelected, para permitir la paginación por cada componente*/}
        </>
      )}
    </div>
  )
}

export default App;
