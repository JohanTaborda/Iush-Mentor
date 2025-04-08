import React from "react";
import "./HeaderSection" // Funciones personalizadas para el componente HeaderSection.
import "./HeaderSection.css" // Estilos personalizados para el componente HeaderSection.
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import spanish from "../../../../resources/images/lenguage/spanish.png"
import english from "../../../../resources/images/lenguage/english.png"

import notifications from "./Notifications.json"

//Importamos los iconos.
import { IoIosSearch } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { MdClear,  MdNotificationsNone, MdOutlineNotificationsActive  } from "react-icons/md";
import { FaUser, FaMoon, FaInfoCircle } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { PiBookOpenUserBold } from "react-icons/pi";

const HeaderSection = () => {

    const icon_search = () => <IoIosSearch id="icon__Search" style={{fontSize:"20px", color:"#000"}}/>
    const icon_pencil = () => <GoPencil/>
    const icon_clear = () => <MdClear style={{fontSize:"25px", color:"#000"}}/>
    const icon_notification = () => <MdNotificationsNone style={{fontSize:"30px", color:"#fff"}}/>
    const icon_onNotification = () => <MdOutlineNotificationsActive  style={{fontSize:"30px", color:"#fff"}}/>
    const icon_user = () => <FaUser style={{fontSize:"25px", color:"#fff"}}/>
    const icon_moon = () => <FaMoon style={{fontSize:"23px", color:"#000"}}/>
    const icon_sun = () => <IoSunny style={{fontSize:"30px", color:"#000"}}/>
    const icon_system = () => <FaInfoCircle style={{fontSize:"20px", color:"#000"}}/>
    const icon_notiUser = () => <PiBookOpenUserBold style={{fontSize:"20px", color:"#000"}}/>

    const switche = [
        { iconSpanish: spanish, iconEnglish: english },
        { iconSpanish: spanish, iconEnglish: english }
    ]
      
    return(
        <div className="header__Section">
            <div className="container__Search">
                <div className="input_icons">
                    <span className="span__Search">{icon_search()}</span>
                    <span className="span_Delete">{icon_clear()}</span>
                    <input type="text" className="input__Search" placeholder="Buscar una SubEscuela..."/>
                </div>
                <button className="button--create">{icon_pencil()} Crear Tutoria </button>
            </div>
            <div className="container_buttons">
                <Dropdown>
                    {notifications.length > 0 ? (
                        <Dropdown.Toggle variant="secondary" className="button--notification" >{icon_onNotification()}</Dropdown.Toggle>
                    ) : (
                        <Dropdown.Toggle variant="secondary" className="button--notification" >{icon_notification()}</Dropdown.Toggle>
                    )}

                    <Dropdown.Menu className="container__notifications">
                        <section>
                                <div className="title__notifications">Notificaciones</div>
                                <div className="elements__notifications">
                                    {notifications.length > 0 ? (
                                        <div>
                                            {notifications.map((e, index) => (
                                                <Dropdown.Item className="items__notifications">
                                                    {(e.tpye == "system") ? (
                                                        <span>{icon_system()}</span>
                                                    ) : (
                                                        <span>{icon_notiUser()}</span>
                                                    )}
                                                    <label key={index} className="label__info">{e.text}</label>
                                                </Dropdown.Item>
                                            ))}
                                        </div>
                                    ) : (
                                        <Dropdown.Item className="items__notifications">
                                            <label  className="label__notInfo">No hay notificaciones disponibles</label>
                                        </Dropdown.Item>
                                    )}

                                </div>
                        </section>

                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" className="button--notification" >{icon_user()}</Dropdown.Toggle>

                    <Dropdown.Menu className="container__list" >
                        {switche.map((item, index) => (
                            <Dropdown.Item as="div" key={index} className="switche--color" onClick={(e) => e.stopPropagation()}>
                                <img src={item.iconSpanish} alt="Español - Spanish" className="icons__lenguage" />
                                <Form> <Form.Check type="switch" id="custom-switch"/> </Form>
                                <img src={item.iconEnglish} alt="Ingles - English" className="icons__lenguage"/>
                            </Dropdown.Item>
                        ))}
                            <Dropdown.Item as="div"  className="switche--color" onClick={(e) => e.stopPropagation()}>
                                Ver mi Perfil
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>

        </div>
    )
}

export default HeaderSection;