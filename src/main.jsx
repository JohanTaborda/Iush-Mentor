import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./resources/stylesGeneral/stylesGeneral.css"
import "./resources/stylesGeneral/stylesGeneral.css" //Importamos Estilos Generales.

import "./resources/stylesGeneral/stylesGeneral.css"

//Hacemos uso de Boostrap 5
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Main from './views/Main.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Main />
    </StrictMode>
)
