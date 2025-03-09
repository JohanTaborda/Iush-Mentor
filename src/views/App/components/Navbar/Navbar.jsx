import React, { useState } from "react"; //Importamos los hooks.
import "./Navbar" // Funciones personalizadas para el componente Navbar.
import "./Navbar.css" // Estilos personalizados para el componente Navbar.

import Tooltip from '@mui/material/Tooltip'; //De la importación "@mui/material/Tooltip" utilizamos la función del Tooltip, el cual nos sirve para los botones.

//Iconos para el navbar
import { IoMenu } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { MdForum } from "react-icons/md";
/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
//Recibimos setButtonSelected, el cual nos permite renderizar el componente seleccionado mediante los botones en el navbar.
const Navbar = ({setButtonSelected}) => {

    // Variables.

    // Constantes.
    const [sidebarMinimized, setSidebarMinimized] = useState(false); //Constante que permite minimizar el navbar.
    const [optionSelected, setOptionSelected] = useState("Tutorias"); //Constante que permite actualizar el botón seleccionado.

    //Funciones para los iconos
    const icon_Menu = () => <IoMenu id="sidebar__iconMenu" onClick={() => setSidebarMinimized(!sidebarMinimized) }/> //Icono para minimizar la barra.
    const icon_Home = () => <IoMdHome className="sidebar__icons"/> //Icono para el botón de "Tutorias"
    const icon_Chart = () => <FaChartLine  className="sidebar__icons"/> //Icono para el botón de "Mis Rutas"
    const icon_Calendar = () => <FaCalendarAlt  className="sidebar__icons"/> //Icono para el botón de "Calendario"
    const icon_Notification = () => <MdNotificationsActive  className="sidebar__icons"/> //Icono para el botón de "Notificaciones"
    const icon_Forum = () => <HiOutlineUserGroup  className="sidebar__icons"/> //Icono para el botón de Foro
    const icon_User = () => <FaUser  className="sidebar__icons"/> //Icono para el botón de Perfil
    const icon_Opinion = () => <MdForum  className="sidebar__icons"/> //Icono para el botón de Opinión

    //Este array de objetos almacena cada uno de los textos e iconos para cada uno de los botones del navbar. 
    const buttonSections = [ //Cada uno de los arrays es un botón.
       {title: "Tutorias", icon: icon_Home()},
       {title: "Mis Rutas", icon: icon_Chart()},
       {title: "Calendario", icon: icon_Calendar()},
       {title: "Notificaciones", icon: icon_Notification()},
       {title: "Foro", icon: icon_Forum()},
       {title: "Perfil", icon: icon_User()}
    ]

    //Función que permite actualizar el valor de las constantes con el botón seleccionado. Este recibe mediante props 'Type' el cual es el title del array de objetos. 
    const changeSelectedButton = (type) => { 
        setOptionSelected(type) //Actualizamos la constante con el nuevo valor del botón seleccionado
        setButtonSelected(type) //Actualizamos la prop recibida para navegar por las secciones, según el botón seleccionado.
    }
   
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Componente.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------

    return(
        <nav className={`containerSidebar ${sidebarMinimized ? "sidebarMinimized" : ""}`}> {/*Bloque principal del navbar, si sidebarMinimized es true, la barra se minimiza*/}
            <div className="sidebar__elements"> {/*Contenedor que almacena toda la información del navbar.*/}
                <div className="sidebar__header"> {/*Bloque principal para el header.*/}
                    <h1 className="sidebar__title" style={{display:`${sidebarMinimized ? "none":""}`}}>Iush Mentor</h1> {/*Titulo del navbar, si sidebarMinimized es true, se oculta el texto*/}
                    {icon_Menu()} {/*Icono del menu, que sirve para minimizar el navbar.*/}
                </div>
                <div className="sidebar__buttons"> {/*Bloque que almacena los botones del navbar*/}
                    {buttonSections.map((element, index) => ( //Utilizamos la función map, para que por cada elemento del array de objetos buttonSections, me cree un botón.
                        //Utilizamos la función de tooltip, este se muestra unicamente cuando la barra esta minimizada. Y se muestra a un lado del botón.
                        <Tooltip title={element.title}  key={index} arrow  disableHoverListener={sidebarMinimized ? false : true} placement="right"> 
                            <button 
                                key={index} 
                                className={`sidebar--button ${optionSelected == element.title ? "sidebar__button--active" : ""}`} //Si el condicional es true, el botón se activa, osea se pone blanco total.
                                id={`${sidebarMinimized ? "sidebar--button__navbarMinized" : ""}`} //Si la barra esta minimizada, se da un ID, para manipular otros estilos.
                                onClick={() => changeSelectedButton(element.title)} //onclick que manda por parametros 'element.title' para actualizar las constantes.
                            >
                                <span>{element.icon}</span> {/*Mostramos el icono guardado en el array de objetos. */}
                                <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}} >{element.title}</label> {/*Mostramos el titulo, y si la barra esta minimizada lo ocultamos.*/}
                            </button>
                        </Tooltip>
                    ))}
                    <button  id="sidebar--button__opinion" className="sidebar--button" > {/*Botón que se ubica en la parte inferior del navbar.*/}
                        <span>{icon_Opinion()}</span> {/*Mostramos el icono*/}
                        <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}} >Danos tu Opinión</label> {/*Mostramos el titulo, y si la barra esta minimizada lo ocultamos.*/}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
