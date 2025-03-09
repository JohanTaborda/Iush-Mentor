import React, { useState } from 'react'
import './App.css' // Estilos personalizados para el componente App.

//Importamos los componentes Hijos
import Navbar from './components/Navbar/Navbar.jsx'
import WorkSpace from './components/WorkSpace/WorkSpace.jsx'

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
const App = () => {
  
  // Variables.

  // Constantes.
  const[buttonSelected, setButtonSelected] = useState("Tutorias");

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // Funciones.
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  const renderSections = () => {
    switch(buttonSelected){
      
    }
  }

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // Componente.
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  
  return (
    <div id='WorkSpaceGeneralStyles'>
      <Navbar setButtonSelected={setButtonSelected} />
      <WorkSpace/>
    </div>
  )
}

export default App;
