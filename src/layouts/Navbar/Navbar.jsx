import React, { useEffect, useState } from "react"; //Importamos los hooks.
import "./Navbar.css" // Estilos personalizados para el componente Navbar.

import Tooltip from '@mui/material/Tooltip'; //De la importación "@mui/material/Tooltip" utilizamos la función del Tooltip, el cual nos sirve para los botones.
import { Link, useLocation } from "react-router-dom"; //Importamos link que nos sirve para Navegar sin recargar y useLocation para saber en que ruta estoy.
//Importamos los componentes Hijos - Ventana Emergentes
import Logout from "../../components/Logout/Logout.jsx"; //Componente para cerrar sesión.

//Iconos para el navbar
import { IoMenu } from "react-icons/io5";
import { IoMdHome, IoMdExit } from "react-icons/io";
import {  MdForum } from "react-icons/md";
import { MdForum } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SiCodementor } from "react-icons/si";

//Recibimos mediante props setButtonSelected, el cual nos permite renderizar el componente seleccionado mediante los botones en el navbar.
const Navbar = ({setButtonSelected, setMainComponent}) => {

    // Constantes.
    const location = useLocation(); // Obtenemos la ubicación actual
    const [sidebarMinimized, setSidebarMinimized] = useState(false); //Constante que permite minimizar el navbar.
    //Constante que permite actualizar el botón seleccionado. Este intenta recuperar el valor guardado en el sessionStorage, si no hay valores, muestra 'Tutorias'
    //usamos sessionStorage para que me guarde el valor de forma temporal, mientras la pestaña este abierta.
    const [optionSelected, setOptionSelected] = useState(() => { return sessionStorage.getItem('optionSelected') || "Inicio"; }); 
    const [visWindowsLogout, setVisWindowsLogout] = useState(false); //Estado que permite la visibilidad de la ventana emergente de Cerrar sesión.

    //Funciones para los iconos
    const icon_Menu = () => <IoMenu id="sidebar__iconMenu" onClick={() => setSidebarMinimized(!sidebarMinimized) }/> //Icono para minimizar la barra.
    const icon_Home = () => <IoMdHome className="sidebar__icons"/> //Icono para el botón de "Tutorias"
    const icon_Forum = () => <HiOutlineUserGroup  className="sidebar__icons"/> //Icono para el botón de Foro
    const icon_Opinion = () => <MdForum  className="sidebar__icons"/> //Icono para el botón de Opinión
    const icon_Tutoring = () => <SiCodementor  className="sidebar__icons"/> //Icono para el botón de "Inicio".
    const icon_Exit = () => <IoMdExit  className="sidebar__icons"/> //Icono para el botón de "Salir".
    
    //Este array de objetos almacena cada uno de los textos e iconos para cada uno de los botones del navbar. 
    const buttonSections = [ //Cada uno de los arrays es un botón.
       {title: "Inicio", icon: icon_Home()},
       {title: "Tutorias", icon: icon_Tutoring()},
       {title: "Foro", icon: icon_Forum()},
       {title: "Danos tu opinión", icon: icon_Opinion()},
    ]
    useEffect(() => {
        // Buscamos la ruta que coincida con el pathname actual
        const currentRoute = buttonSections.find(item => item.path && location.pathname.startsWith(item.path) ) || { title: "inicio" };  // Valor por defecto si no encuentra coincidencia
        
        // Actualizamos todos los estados en una sola operación
        const selectedTitle = currentRoute.title;
        setOptionSelected(selectedTitle);
        setButtonSelected(selectedTitle);
        
        // Actualizamos el sessionStorage una sola vez
        sessionStorage.setItem('optionSelected', selectedTitle);
        sessionStorage.setItem('setButtonSelected', selectedTitle);
    }, [location.pathname]); //Dependencia

    //Este array de objetos almacena cada uno de los textos, iconos y el path para cada uno de los botones del navbar. 
    const buttonSections = [ 
        { title: "Inicio", icon: icon_Home(), path: "/inicio" },
        { title: "Tutorias", icon: icon_Tutoring(), path: "/tutorias" },
        { title: "Foro", icon: icon_Forum(), path: "/foro" },
        { title: "Danos tu opinión", icon: icon_Opinion() }, 
    ]
     
    //Función que permite actualizar el valor de las constantes con el botón seleccionado. Este recibe mediante props 'Type' el cual es el title del array de objetos. 
    const changeSelectedButton = (type) => { 
        if(type !== "Danos tu opinión"){ //Si type es diferente de Perfil y de Notificaciones, guardamos el valor en type, ya que estas dos son ventanas emergentes.
            setOptionSelected(type) //Actualizamos la constante con el nuevo valor del botón seleccionado
            setButtonSelected(type)  //Actualizamos el prop recibido para navegar por las secciones, según el botón seleccionado.
            sessionStorage.setItem('setButtonSelected', type); //En setButtonSelected, mediante el valor que este en 'Type' lo vamos a guardar en el sessionStorage.
            sessionStorage.setItem('optionSelected', type); //En optionSelected, con el valor recibido en 'type' vamos almacenarlo en el sessionStorage.
        }else {
            window.open('https://forms.gle/3qxgAimXt7iTzXiD6', '_blank');
        }
        
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
                                <Link //Hacemos uso del link para Navegar.
                                    to={element.path} 
                                    className={`${element.title == "Danos tu opinión" ? "button--opinionNav" : "sidebar--button"} ${optionSelected == element.title ? "sidebar__button--active" : ""}`} 
                                    id={`${sidebarMinimized ? "sidebar--button__navbarMinized" : ""}`} 
                                    style={{backgroundColor: `${element.title=="Danos tu opinión" ? "transparent" : ""}`, textDecoration: "none"}}
                                    onClick={() => changeSelectedButton(element.title)}
                                >
                                    <span>{element.icon}</span>
                                    <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}} >{element.title}</label>
                                </Link>
                            </Tooltip>

                        ))}
                        <button  id="sidebar--button__exit" className="sidebar--button" onClick={() => setVisWindowsLogout(true)}> {/*Botón que se ubica en la parte inferior del navbar.*/}
                            <span>{icon_Exit()}</span> {/*Mostramos el icono*/}
                            <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}} >Cerrar Sesión</label> {/*Mostramos el titulo, y si la barra esta minimizada lo ocultamos.*/}
                        </button>
                    </div>
                </div>
            </nav>
            {/*Si setVisWindowsLogout es true, renderizamos la ventana emergente y le enviamos el setter para cerrarla después.*/}
            {visWindowsLogout && ( <Logout setVisWindowsLogout={setVisWindowsLogout} setMainComponent={setMainComponent}/>)} 
        </>
    )
}

export default Navbar;
