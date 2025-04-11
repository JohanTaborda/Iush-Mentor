import React, { useState } from "react"; 
import "./Login";  
import "./Login.css";  
import { FaRegEyeSlash } from "react-icons/fa6"; 
import { FaRegEye } from "react-icons/fa"; 
import { GiGraduateCap } from "react-icons/gi"; 
import { Modal } from "bootstrap";
import { IoIosClose } from "react-icons/io";

import { Link } from "react-router-dom";


const Login = ({ setVisRegister, setMainComponent, setVisAuth }) => { 

    const validarUsuario = "iush-mentor@gmail.com";
    const validarContraseña = "iush-mentor";

    const [user, setUser] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errors, setErrors] = useState("");  
    const [showPwd, setShowPwd] = useState(true);  
    const [closeButton, setCloseButton] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password.trim() && !user.trim()) {
            setErrors("Credenciales vacías");
        } else if (!password.trim()) {
            setErrors("Contraseña obligatoria");
        } else if (!user.trim()) {
            setErrors("Correo obligatorio");
        } else if (password !== validarContraseña || user !== validarUsuario) {
            setErrors("Credenciales incorrectas");
        }

        if(user == validarUsuario && password == validarContraseña){ 
            setMainComponent(true)
        }
    };

    const icon__eyeEnable = () => (
        <FaRegEye onClick={() => setShowPwd(!showPwd)} className="icons_eyes" />
    );

    const icon__eyeDisabled = () => (
        <FaRegEyeSlash onClick={() => setShowPwd(!showPwd)} className="icons_eyes" />
    );

    const icon__cap = () => <GiGraduateCap className="icons_eyes" color="blue" />;

    const icon__close = () => <IoIosClose className="icon_close" color="#000" onClick={() => setVisAuth(false)}/>;

    return (
        <>
            <div className="overlay">
                <div className="Login__container">
                    <div className="Login__img">
                        <img src="src/resources/images/logoAplication/Logo-IushMentor.png" 
                             alt="img-mentor" className="img_IUSH" />
                    </div>
                    <div className="Login__welcome">
                        <Link to="/" >{icon__close()}</Link> 
                        <div className="Login_WelcomeInitial">
                            <h3 className="Login_Welcometittle">Bienvenid@s:</h3>
                            <p className="mss_top">Accede a nuestra comunidad de mentores expertos en diseño, tecnología, inteligencia artificial y más. {icon__cap()} </p>
                        </div>

                        <form action="login_formulario" onSubmit={handleSubmit} className="login_forms">
                            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Email" className="input_Credential"/>
                            <div className="container__password">
                                <input type={showPwd ? "password" : "text"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" className="input_Credential"/>
                                <span id="ubicacion__icon">{showPwd ? icon__eyeDisabled() : icon__eyeEnable()}</span>
                            </div>
                            <div>
                                <button id="BtnWelcome" >INGRESAR</button> 
                            </div>
                                <p className="Login_error">{errors}</p>
                            <div className="Login__Register">
                                <p className="Login_not">¿No tienes cuenta? </p>
                                <Link to="/registro"> <label onClick={() => setVisRegister(false)} id="click_register">Regístrate</label> </Link> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default Login;