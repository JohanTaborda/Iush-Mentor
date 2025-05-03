import React, { useEffect, useState } from "react";
import "./HeaderSection.css" // Estilos personalizados para el componente HeaderSection.
import Dropdown from 'react-bootstrap/Dropdown'; //Hacemos uso de los dropdown que nos ofrece bootstrap
import Form from 'react-bootstrap/Form'; //Hacemos uso del switch que nos ofrece bootstrap
import { Link, useLocation } from "react-router-dom"; //Importamos link que nos sirve para Navegar sin recargar y useLocation para saber en que ruta estoy.

import CreateTutoring from "../../../../../components/CreateTutoring/CreateTutoring.jsx"; //Componente que crea las tutorias.
import notifications from "./Notifications.json" //Json para el contenido de las notificaciones
import userDefault from "../../../../../resources/images/User/userDefault.jpeg" //Importamos la foto por defecto del usuario.

//Importamos los iconos.
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { MdClear,  MdNotificationsNone, MdOutlineNotificationsActive, MdOutlineWbSunny  } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { PiBookOpenUserBold } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";

//Recibimos mediante props el botón seleccionado en el navbar. Se utiliza para ocultar y mostrar componentes según la sección seleccionada.
const HeaderSection = ({ buttonSelected, onSearchChange, setButtonSelected }) => {

    //Constantes
    const[dataInput, setDataInput] = useState(""); //Constante que almacena y guarda la palabra copiada en el input de búsqueda
    useEffect(() => {// useEffect que se ejecuta cada vez que cambia el texto del input
        onSearchChange(dataInput); // Le enviamos el texto al padre
    }, [dataInput]); // Solo se ejecuta cuando cambia dataInput

    const[optionSelected, setOptionSelected] = useState(buttonSelected); //Constante que almacena el botón cliqueado en el navbar.
    const[phrasesIndex, setPhrasesIndex] = useState(0); //Estado que guarda el indice de la frase a mostrar
    const[isMobile, setIsMobile] = useState(window.innerWidth <= 447); //Usamos esta constante para validar el tamaño de la pantalla, para tomar diferentes propiedades según sea el caso.  
    const[visCreateTutoring, setVisCreateTutoring] = useState(false); //Constante que permite la visualización de la ventana emergente para crear tutorias.

    //Iconos
    const icon_search = () => <IoIosSearch id="icon__Search" style={{fontSize:"20px", color:"#000"}}/>
    const icon_pencil = () => <GoPencil/>
    const icon_clear = () => <MdClear style={{fontSize:"25px", color:"#000"}} onClick={() => setDataInput("")}/> //Cada vez que se le de clic, se limpia el campo de busqueda. 
    const icon_notification = () => <MdNotificationsNone style={{fontSize:"32px", color:"#fff"}}/>
    const icon_onNotification = () => <MdOutlineNotificationsActive  style={{fontSize:"32px", color:"#fff"}}/>
    const icon_moon = () => <IoMoonOutline style={{fontSize:"25px", color:"#fff"}}/>
    const icon_sun = () => <MdOutlineWbSunny style={{fontSize:"25px", color:"#fff"}}/>
    const icon_system = () => <FaInfoCircle style={{fontSize:"20px", color:"#fff"}}/>
    const icon_notiUser = () => <PiBookOpenUserBold style={{fontSize:"20px", color:"#fff"}}/>
    const icon_settings = () => <LuSettings style={{fontSize:"20px", color:"#fff"}}/>
    const icon_add = () => <IoMdAdd style={{fontSize:"20px", color:"#000"}}/>

    const phrases = [ //Arreglo que almacena las frases a mostrar en 'Inicio', estas se muestran de forma aleatoria, con el indice de phrasesIndex.
        ["¡Bienvenid@ a tu espacio de tutorías!"],
        ["Aprender es mejor acompañado."],
        ["Pregunta, aprende y crece."],
        ["Aquí siempre hay alguien para ayudarte."],
        ["Resolver dudas es el primer paso."],
        ["Compartir saber nos hace mejores."],
        ["Cada tutoría es un nuevo avance."]
    ]    

    useEffect(() => { //Efecto que permite poner de forma aleatoria las frases.
        const interval = setInterval(() => {
            setPhrasesIndex(i => (i + 1) % phrases.length); //Cogemos el indice y le sumamos 1. Luego, le sacamos el modular según la longitud de las frases, (i + 1 -> 2) % 7 = 2.
        }, 10000); //Cambia cada 10 segundos.

        return () => clearInterval(interval); 
    }, [])

    useEffect(() => { //useEffect que cambia el estado setIsMobile cuando el ancho es menor a 447.
        const handleResize = () => setIsMobile(window.innerWidth <= 447);
        window.addEventListener('resize', handleResize); //Window representa la ventana del navegador, usamos el metodo que permite escuchar eventos en la ventana, ponemos el evento resize y la función a ejecutar.
        return () => window.removeEventListener('resize', handleResize); // Limpia el listener cuando el componente se desmonta
    }, []);

    useEffect(() =>{ //Efecto que actualiza con cada cambio en buttonSelected, el nuevo botón cliqueado.
        setOptionSelected(buttonSelected)
    },[buttonSelected]) //Dependencia.


    return(
        <div className="header__Section">
            <div className="container__Search">
                <div className="input_icons" style={{display: `${optionSelected != "Tutorias"  ? "none" : "flex"}`}}>
                    <span className="span__Search" >{icon_search()}</span>
                    <span className="span_Delete" style={{display: `${dataInput == ""  ? "none" : ""}`}} 
                        onClick={() => setDataInput("")} // Al hacer clic, se limpia el input
                        >{icon_clear()} </span>
                     <input
                        type="text" // Tipo de campo: texto
                        className="input__Search" // Clase para aplicar estilos desde CSS
                        placeholder="Buscar una Subescuela..." // Texto que aparece cuando el campo está vacío
                        value={dataInput} // El valor del input lo controla el estado dataInput
                        onChange={(e) => setDataInput(e.target.value)} // Cada vez que el usuario escribe, actualizamos el estado
                        />
                    <button className="button--create" style={{display: `${optionSelected == "Tutorias" ? "flex" : "none"}`}} onClick={() => setVisCreateTutoring(true)}>{icon_pencil()} Crear Tutoria </button>
                </div>
                <button className="button--create" id="button--add" style={{display: `${optionSelected == "Foro" ? "flex" : "none"}`}}>{icon_add()} Publicar Nuevo Hilo </button>
                <span className="title__bienvenida" style={{display: `${optionSelected != "Inicio" ? "none" : "flex"}`}}> {phrases[phrasesIndex]}</span> {/*Mostramos la frase según el indice guardado.*/}

            </div>
            <div className="container_buttons"> {/*Contenedor que almacena el dropdown de Notificaciones y de Perfil. */}
                <Dropdown>
                    {/*Si el json de notificaciones tiene algun valor, se muestra un icono diferente, que informa que hay notificaciones.*/}
                    {notifications.length > 0 ? <Dropdown.Toggle variant="secondary" className="button--notification" >{icon_onNotification()}</Dropdown.Toggle> :  
                        <Dropdown.Toggle variant="secondary" className="button--notification" >{icon_notification()}</Dropdown.Toggle>}

                    <Dropdown.Menu className="container__notifications"> {/*Contenedor que almacena el dropdown de notificaciones */}
                        <section>
                                <div className="title__notifications" style={{borderBottom:"1px solid #fff"}} >Notificaciones</div>
                                <div className="elements__notifications">
                                    {notifications.length > 0 ? ( //Si hay notificaciones hace lo siguiente: 
                                        <div>
                                            {notifications.map((e, index) => (
                                                <Dropdown.Item className="items__notifications" key={index} style={{borderBottom:"1px solid #fff"}} >
                                                    {/*Si el tipo de notificación del json es de sistema, se muestra un icono diferente al de usuario.*/}
                                                    {e.tpye == "system" ? <span>{icon_system()}</span> :  <span>{icon_notiUser()}</span> }
                                                    <label key={index} className="label__info">{e.text}</label> {/*Mostramos el texto de la notificación */}
                                                </Dropdown.Item>
                                            ))}
                                        </div>
                                    ) : ( //Si no hay notificaciones, muestra un mensaje informativo.
                                        <Dropdown.Item className="items__notifications">
                                            <label  className="label__notInfo">No hay notificaciones disponibles</label>
                                        </Dropdown.Item>
                                    )}
                                </div>
                        </section>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown> {/*Bloque para el dropdown de Perfil. */}
                    <Dropdown.Toggle variant="secondary" className="button--profile" >{
                        <img src={userDefault} alt="Foto del Usuario." className="img__user"/>    
                    }</Dropdown.Toggle>
                    <Dropdown.Menu className="container__list" style={{backgroundColor:"#285194"}}>
                             <Dropdown.Item as="div"className="switche--color" onClick={(e) => e.stopPropagation()} style={{borderBottom:"1px solid #fff"}}  >
                                {icon_sun()}
                                <Form> <Form.Check type="switch" id="custom-switch"/> </Form> {/*Switche que permite el cambio de color en la aplicación */}
                                {icon_moon()}
                            </Dropdown.Item>
                            <Dropdown.Item as="div" className="switche--color" style={{backgroundColor: "", cursor: "pointer"}}>
                                <Link to="/perfil/configuracion" onClick={() => setButtonSelected("Configuracion")}> <span className="title__settings" > Configuración {icon_settings()}</span> {/*Apartado de configuración.*/} </Link>
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {visCreateTutoring && (<CreateTutoring closeWindow = {setVisCreateTutoring} />)} {/*Renderizamos el componente que nos permite crear las tutorias. */}
        </div>
    )
}

export default HeaderSection;