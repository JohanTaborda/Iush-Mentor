import React, { useState } from "react"; 
import "./Login.css";  
import { FaRegEyeSlash } from "react-icons/fa6"; 
import { FaRegEye } from "react-icons/fa"; 
import { GiGraduateCap } from "react-icons/gi"; 
import { Modal } from "bootstrap";
import { IoIosClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



const Login = ({ setVisRegister, setMainComponent, setVisAuth }) => { 

    const [user, setUser] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errors, setErrors] = useState("");  
    const [showPwd, setShowPwd] = useState(true);  
    const [closeButton, setCloseButton] = useState(false);
    const [success, setSuccess] = useState("");  


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user.trim() || !password.trim()) {
            toast.error("Correo y contraseña obligatorios", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user,
                    password: password,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success("¡Bienvenido!", {
                    position: "bottom-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    setMainComponent(true);
                }, 1500);
            } else {
                toast.error("Correo o contraseña incorrectos", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
    
        } catch (error) {
            console.error("Error en login:", error);
            toast.error("Error del servidor", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                    <ToastContainer 
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        closeOnClick
                        pauseOnHover
                        draggable
                    />
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
                                <button id="BtnWelcome" >Ingresar</button> 
                            </div>
                                <p className="Login_error">{errors}</p>
                                <p className="Login_success">{success}</p>
                            <div className="Login__Register">
                                <p className="Login_not">¿No tienes cuenta? </p>
                                <Link to="/registro"> <label onClick={() => setVisRegister(true)} id="click_register">Regístrate</label> </Link> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default Login;