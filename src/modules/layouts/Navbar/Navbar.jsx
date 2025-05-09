import React, { useEffect, useState } from "react";
import "./Navbar.css" 

import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation } from "react-router-dom";
import Logout from "../../../components/Logout/Logout.jsx";

// Iconos para el navbar
import { IoMenu } from "react-icons/io5";
import { IoMdHome, IoMdExit } from "react-icons/io";
import { MdForum, MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { SiCodementor } from "react-icons/si";
import { FaUsers, FaUserGraduate } from "react-icons/fa";

const Navbar = ({setButtonSelected, setMainComponent, rol}) => {
    const location = useLocation();
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const [optionSelected, setOptionSelected] = useState(() => { return sessionStorage.getItem('optionSelected') || "Inicio"; });
    const [visWindowsLogout, setVisWindowsLogout] = useState(false);

    // Funciones para los iconos
    const icon_Menu = () => <IoMenu id="sidebar__iconMenu" onClick={() => setSidebarMinimized(!sidebarMinimized) }/>
    const icon_Home = () => <IoMdHome className="sidebar__icons"/>
    const icon_Forum = () => <HiOutlineUserGroup className="sidebar__icons"/>
    const icon_Opinion = () => <MdForum className="sidebar__icons"/>
    const icon_Tutoring = () => <SiCodementor className="sidebar__icons"/>
    const icon_Exit = () => <IoMdExit className="sidebar__icons"/>
    const icon_Admin = () => <MdAdminPanelSettings className="sidebar__icons"/>
    const icon_Students = () => <FaUsers className="sidebar__icons"/>
    const icon_TutorRequests = () => <FaUserGraduate className="sidebar__icons"/>
    
    // Definimos botones según el rol
    let buttonSections = [];
    
    if (rol === 'administrador') {
        buttonSections = [
            { title: "Estudiantes", icon: icon_Students(), path: "/admin/estudiantes" },
            { title: "Solicitudes", icon: icon_TutorRequests(), path: "/admin/solicitudes" }
        ];
    } else {
        buttonSections = [ 
            { title: "Inicio", icon: icon_Home(), path: "/inicio" },
            { title: "Tutorias", icon: icon_Tutoring(), path: "/tutorias" },
            { title: "Foro", icon: icon_Forum(), path: "/foro" },
            { title: "Danos tu opinión", icon: icon_Opinion() }
        ];
    }
    
    useEffect(() => {
        // Busca la ruta solo si existe en los botones
        const currentRoute = buttonSections.find(item => item.path && location.pathname.startsWith(item.path));
        if (currentRoute) {
            const selectedTitle = currentRoute.title;
            setOptionSelected(selectedTitle);
            setButtonSelected(selectedTitle);
            sessionStorage.setItem('optionSelected', selectedTitle);
            sessionStorage.setItem('setButtonSelected', selectedTitle);
        }else{
                    setOptionSelected(null);
            setButtonSelected(null);
            sessionStorage.removeItem('optionSelected');
        }
    }, [location.pathname, rol]);

    const changeSelectedButton = (type) => { 
        if(type !== "Danos tu opinión") {
            setOptionSelected(type)
            setButtonSelected(type)
            sessionStorage.setItem('setButtonSelected', type);
            sessionStorage.setItem('optionSelected', type);
        } else {
            window.open('https://forms.gle/3qxgAimXt7iTzXiD6', '_blank');
        }
    }
   
    useEffect(() => {
        if (window.innerWidth > 768) return;
        const handleResize = () => { setSidebarMinimized(window.innerWidth <= 768); };
        handleResize();
    }, [])

    return(
        <>
            <nav className={`containerSidebar ${sidebarMinimized ? "sidebarMinimized" : ""}`}>
                <div className="sidebar__elements">
                    <div className="sidebar__header">
                        <h1 className="sidebar__title" style={{display:`${sidebarMinimized ? "none":""}`}}>
                            {rol === 'administrador' ? 'Admin Panel' : 'Iush Mentor'}
                        </h1>
                        {icon_Menu()}
                    </div>
                    <div className="sidebar__buttons">
                        {buttonSections.map((element, index) => (
                            <Tooltip 
                                title={element.title} 
                                key={index} 
                                arrow 
                                disableHoverListener={sidebarMinimized ? false : true} 
                                placement="right" 
                                classes={{ tooltip: "custom-tooltip", arrow: "custom-arrowTooltip" }}
                            > 
                                <Link
                                    to={element.path} 
                                    className={`${element.title == "Danos tu opinión" ? "button--opinionNav" : "sidebar--button"} ${optionSelected == element.title ? "sidebar__button--active" : ""}`} 
                                    id={`${sidebarMinimized ? "sidebar--button__navbarMinized" : ""}`} 
                                    style={{backgroundColor: `${element.title=="Danos tu opinión" ? "transparent" : ""}`, textDecoration: "none"}}
                                    onClick={() => changeSelectedButton(element.title)}
                                >
                                    <span>{element.icon}</span>
                                    <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}}>
                                        {element.title}
                                    </label>
                                </Link>
                            </Tooltip>
                        ))}
                        <button id="sidebar--button__exit" className="sidebar--button" onClick={() => setVisWindowsLogout(true)}>
                            <span>{icon_Exit()}</span>
                            <label className="sidebar--button__Text" style={{display:`${sidebarMinimized ? "none":""}`}}>
                                Cerrar Sesión
                            </label>
                        </button>
                    </div>
                </div>
            </nav>
            {visWindowsLogout && (<Logout setVisWindowsLogout={setVisWindowsLogout} setMainComponent={setMainComponent}/>)}
        </>
    )
}

export default Navbar;