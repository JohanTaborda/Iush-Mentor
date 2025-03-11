import React, { useEffect, useState } from "react"; //Importamos los hooks.
import "./Navbar" // Funciones personalizadas para el componente Navbar.
import "./Navbar.css" // Estilos personalizados para el componente Navbar.

import Tooltip from '@mui/material/Tooltip'; //De la importación "@mui/material/Tooltip" utilizamos la función del Tooltip, el cual nos sirve para los botones.

//Importamos los componentes Hijos - Ventana Emergentes
import Profile from "./components/Profile/Profile.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

//Iconos para el navbar
import { IoMenu } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { MdForum } from "react-icons/md";

//Recibimos mediante props setButtonSelected, el cual nos permite renderizar el componente seleccionado mediante los botones en el navbar.
const Navbar = ({setButtonSelected}) => {

    // Variables.

    // Constantes.
    const [sidebarMinimized, setSidebarMinimized] = useState(false); //Constante que permite minimizar el navbar.
    //Constante que permite actualizar el botón seleccionado. Este intenta recuperar el valor guardado en el sessionStorage, si no hay valores, muestra 'Tutorias'
    //usamos sessionStorage para que me guarde el valor de forma temporal, mientras la pestaña este abierta.
    const [optionSelected, setOptionSelected] = useState(() => { return sessionStorage.getItem('optionSelected') || "Tutorias"; }); 
    const [visWindowsProfile, setVisWindowsProfile] = useState(false); //Estado que permite la visibilidad de la ventana emergente de Perfil.
    const [visWindowsNotifications, setVisWindowsNotifications] = useState(false); //Estado que permite la visibilidad de la ventana emergente de Notificaciones.

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
       {title: "Foro", icon: icon_Forum()},
       {title: "Notificaciones", icon: icon_Notification()},
       {title: "Perfil", icon: icon_User()}
    ]

    //Función que permite actualizar el valor de las constantes con el botón seleccionado. Este recibe mediante props 'Type' el cual es el title del array de objetos. 
    const changeSelectedButton = (type) => { 
        if(type !== "Perfil" && type !== "Notificaciones"){ //Si type es diferente de Perfil y de Notificaciones, guardamos el valor en type, ya que estas dos son ventanas emergentes.
            setOptionSelected(type) //Actualizamos la constante con el nuevo valor del botón seleccionado
            setButtonSelected(type)  //Actualizamos el prop recibido para navegar por las secciones, según el botón seleccionado.
            sessionStorage.setItem('setButtonSelected', type); //En setButtonSelected, mediante el valor que este en 'Type' lo vamos a guardar en el sessionStorage.
            sessionStorage.setItem('optionSelected', type); //En optionSelected, con el valor recibido en 'type' vamos almacenarlo en el sessionStorage.
        } 
        setVisWindowsProfile(type == "Perfil")
        setVisWindowsNotifications(type == "Notificaciones")
    }
   
    useEffect(() => { //useEffect que cambia el estado setSidebarMinimized cuando el ancho es menor a 768, para tomar otros estilos el navbar.
        if (window.innerWidth > 768) return; //No se hace nada si el ancho es mayor a 768

        const handleResize = () => { setSidebarMinimized(window.innerWidth <= 768); }; //Si el ancho es menor a 768, actualizamos el setter con verdadero.

        handleResize(); //Cada vez que se redimensiona la pantalla ejecutamos la función para cambiar el estado del setter.
    }, []) //Se ejecuta al montarse el componente

    return(
        <>
            <nav className={`containerSidebar ${sidebarMinimized  ? "sidebarMinimized" : ""}`}> {/*Bloque principal del navbar, si sidebarMinimized es true, la barra se minimiza*/}
                <div className="sidebar__elements"> {/*Contenedor que almacena toda la información del navbar.*/}
                    <div className="sidebar__header"> {/*Bloque principal para el header.*/}
                        <h1 className="sidebar__title" style={{display:`${sidebarMinimized ? "none":""}`}}>Iush Mentor</h1> {/*Titulo del navbar, si sidebarMinimized es true, se oculta el texto*/}
                        {icon_Menu()} {/*Icono del menu, que sirve para minimizar el navbar.*/}
                    </div>
                    <div className="sidebar__buttons"> {/*Bloque que almacena los botones del navbar*/}
                        {buttonSections.map((element, index) => ( //Utilizamos la función map, para que por cada elemento del array de objetos buttonSections, me cree un botón.
                            //Utilizamos la función de tooltip, este se muestra unicamente cuando la barra esta minimizada. Y se muestra a un lado del botón.
                            <Tooltip title={element.title} key={index} arrow disableHoverListener={sidebarMinimized ? false : true} placement="right" classes={{ tooltip: "custom-tooltip", arrow: "custom-arrowTooltip" }}> 
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
            {visWindowsProfile && ( <Profile setVisWindowsProfile={setVisWindowsProfile} />)} {/*Si visWindowsProfile es true, renderizamos la ventana emergente y le enviamos el setter para cerrarla después.*/}
            {visWindowsNotifications && ( <Notifications setVisWindowsNotifications={setVisWindowsNotifications} />)} {/*Si setVisWindowsNotifications es true, renderizamos la ventana emergente y le enviamos el setter para cerrarla después.*/}
        </>
    )
}

export default Navbar;
