import React, { useEffect, useState } from "react";
import "./HeaderSection.css";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import notifications from "./Notifications.json";
import Avatar from "@mui/material/Avatar";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { GoPencil } from "react-icons/go";
import { MdClear, MdNotificationsNone, MdOutlineNotificationsActive, MdOutlineWbSunny, } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { PiBookOpenUserBold } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";

import { useUserStore } from "../../../../../stores/Store.js";

const HeaderSection = ({ buttonSelected, onSearchChange, setButtonSelected}) => {
  const [dataInput, setDataInput] = useState("");
  const [optionSelected, setOptionSelected] = useState(buttonSelected);
  const [phrasesIndex, setPhrasesIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 447);
  const [dataUser, setDataUser] = useState(useUserStore(state => state.user));

  useEffect(() => {
    onSearchChange(dataInput);
  }, [dataInput, onSearchChange]);

  // Iconos
  const icon_search = () => (
    <IoIosSearch
      id="icon__Search"
      style={{ fontSize: "20px", color: "#000" }}
    />
  );
  const icon_pencil = () => <GoPencil />;
  const icon_clear = () => (
    <MdClear
      style={{ fontSize: "25px", color: "#000" }}
      onClick={() => setDataInput("")}
    />
  );
  const icon_notification = () => (
    <MdNotificationsNone style={{ fontSize: "32px", color: "#fff" }} />
  );
  const icon_onNotification = () => (
    <MdOutlineNotificationsActive style={{ fontSize: "32px", color: "#fff" }} />
  );
  const icon_moon = () => (
    <IoMoonOutline style={{ fontSize: "25px", color: "#fff" }} />
  );
  const icon_sun = () => (
    <MdOutlineWbSunny style={{ fontSize: "25px", color: "#fff" }} />
  );
  const icon_system = () => (
    <FaInfoCircle style={{ fontSize: "20px", color: "#fff" }} />
  );
  const icon_notiUser = () => (
    <PiBookOpenUserBold style={{ fontSize: "20px", color: "#fff" }} />
  );
  const icon_settings = () => (
    <LuSettings style={{ fontSize: "20px", color: "#fff" }} />
  );
  const icon_add = () => (
    <IoMdAdd style={{ fontSize: "20px", color: "#000" }} />
  );

  const phrases = [
    ["¡Bienvenid@ a tu espacio de tutorías!"],
    ["Aprender es mejor acompañado."],
    ["Pregunta, aprende y crece."],
    ["Aquí siempre hay alguien para ayudarte."],
    ["Resolver dudas es el primer paso."],
    ["Compartir saber nos hace mejores."],
    ["Cada tutoría es un nuevo avance."],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrasesIndex((i) => (i + 1) % phrases.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 447);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setOptionSelected(buttonSelected);
  }, [buttonSelected]);

  const stringAvatar = (name) => {
    if (!name || name.split(' ').length < 2) return { children: 'U' };
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  };

  return (
    <div className="header__Section">
      <div className="container__Search">
        <div className="input_icons" style={{display: `${optionSelected !== "Tutorias" ? "none" : "flex"}`}}>
          <span className="span__Search">{icon_search()}</span>
          <span 
            className="span_Delete" 
            style={{
              display: `${dataInput === "" ? "none" : ""}`, 
              right: `${dataUser.userRol === "tutor" ? "5px" : "5px"}`
            }}
            onClick={() => setDataInput("")}
          >
            {icon_clear()}
          </span>
          <input
            type="text"
            className="input__Search"
            placeholder="Buscar una Subescuela..."
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
          />
        </div>
        <span 
          className="title__bienvenida" 
          style={{display: `${optionSelected !== "Inicio" ? "none" : "flex"}`}}
        >
          {phrases[phrasesIndex]}
        </span>
      </div>
      
      <div className="container_buttons">
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className="button--notification">
            {notifications.length > 0 ? icon_onNotification() : icon_notification()}
          </Dropdown.Toggle>

          <Dropdown.Menu className="container__notifications">
            <section>
              <div className="title__notifications" style={{borderBottom: "1px solid #fff"}}>
                Notificaciones
              </div>
              <div className="elements__notifications">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((e, index) => (
                      <Dropdown.Item
                        className="items__notifications"
                        key={index}
                        style={{ borderBottom: "1px solid #fff" }}
                      >
                        {e.tpye === "system" ? (
                          <span>{icon_system()}</span>
                        ) : (
                          <span>{icon_notiUser()}</span>
                        )}
                        <label key={index} className="label__info">
                          {e.text}
                        </label>
                      </Dropdown.Item>
                    ))}
                  </div>
                ) : (
                  <Dropdown.Item className="items__notifications">
                    <label className="label__notInfo">
                      No hay notificaciones disponibles
                    </label>
                  </Dropdown.Item>
                )}
              </div>
            </section>
          </Dropdown.Menu>
        </Dropdown>
        
        <Dropdown>
          <Dropdown.Toggle variant="secondary" className="button--profile">
            <Avatar
              src={
                dataUser?.profileImage
                  ? `http://localhost:3000/uploads/${dataUser.profileImage}`
                  : undefined
              }
              alt={dataUser?.username}
            >
              {!dataUser?.profileImage &&
                stringAvatar(dataUser.username).children}
            </Avatar>
          </Dropdown.Toggle>
          
          <Dropdown.Menu
            className="container__list"
            style={{ backgroundColor: "#285194" }}
          >
            <Dropdown.Item
              as="div"
              className="switche--color"
              onClick={(e) => e.stopPropagation()}
              style={{ borderBottom: "1px solid #fff" }}
            >
              {icon_sun()}
              <Form>
                <Form.Check type="switch" id="custom-switch" />
              </Form>
              {icon_moon()}
            </Dropdown.Item>
            <Link to="#" onClick={() => setButtonSelected("Configuracion")}>
              <Dropdown.Item
                as="div"
                className="switche--color"
                style={{ cursor: "pointer" }}
              >
                <span className="title__settings">
                  Configuración {icon_settings()}
                </span>
              </Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderSection;