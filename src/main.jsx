import { createRoot } from 'react-dom/client'
import "./resources/stylesGeneral/stylesGeneral.css" 

//Hacemos uso de Boostrap 5
import 'bootstrap/dist/css/bootstrap.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter } from 'react-router-dom'; 

import Main from './modules/layouts/Main/Main';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Main />
    </BrowserRouter>
)
