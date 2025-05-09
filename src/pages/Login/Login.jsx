// Importa el store de Zustand para manejar el estado del usuario
import { useUserStore } from "../../stores/Store"; 
// Importa React y hooks necesarios
import React, { useState } from "react"; 
// Importa estilos CSS específicos del componente Login
import "./Login.css";  
// Importa íconos para mostrar/ocultar contraseña
import { FaRegEyeSlash } from "react-icons/fa6"; 
import { FaRegEye } from "react-icons/fa"; 
// Ícono decorativo de gorro de graduación
import { GiGraduateCap } from "react-icons/gi"; 
// Importa componente Modal de Bootstrap (aunque no se usa directamente aquí)
import { Modal } from "bootstrap";
// Ícono para cerrar el modal
import { IoIosClose } from "react-icons/io";
// Componente de navegación entre rutas
import { Link } from "react-router-dom";
// Importa funciones y estilos de notificaciones
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Componente funcional Login que recibe funciones para cambiar vistas
const Login = ({ setVisRegister, setMainComponent, setVisAuth }) => { 

    const { setUser: setGlobalUser } = useUserStore(); 
    // Estados locales para manejar inputs y feedback
    const [user, setUser] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errors, setErrors] = useState("");  
    const [showPwd, setShowPwd] = useState(true);  
    const [closeButton, setCloseButton] = useState(false);
    const [success, setSuccess] = useState("");  

    // Función que maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene recarga de página

        // Validación básica de campos vacíos
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
            // Llamada al backend para autenticación
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
                // Si la respuesta es exitosa, guarda los datos del usuario en el store global
                setGlobalUser(data);

                // Notificación de éxito
                    toast.success(`¡Bienvenido! ${data.username} `, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Redirige al componente principal después de un breve delay
                setTimeout(() => {
                    setMainComponent(true);
                }, 1500);
            } else {
                // Notificación de error si las credenciales son incorrectas
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
            // Manejo de errores del servidor
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

    // Funciones auxiliares para mostrar íconos de contraseña
    const icon__eyeEnable = () => (
        <FaRegEye onClick={() => setShowPwd(!showPwd)} className="icons_eyes" />
    );

    const icon__eyeDisabled = () => (
        <FaRegEyeSlash onClick={() => setShowPwd(!showPwd)} className="icons_eyes" />
    );

    // Ícono decorativo de gorro de graduación
    const icon__cap = () => <GiGraduateCap className="icons_eyes" color="blue" />;

    // Ícono para cerrar el modal de login
    const icon__close = () => <IoIosClose className="icon_close" color="#000" onClick={() => setVisAuth(false)}/>;


    // Renderizado del componente
    return (
        <>
            <div className="overlay">
                {/* Contenedor de notificaciones */}
                <ToastContainer 
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                />

                <div className="Login__container">
                    {/* Logo de la aplicación */}
                    <div className="Login__img">
                        <img src="src/resources/images/logoAplication/Logo-IushMentor.png" 
                             alt="img-mentor" className="img_IUSH" />
                    </div>

                    {/* Sección de bienvenida y formulario */}
                    <div className="Login__welcome">
                        <Link to="/" >{icon__close()}</Link> 
                        <div className="Login_WelcomeInitial">
                            <h3 className="Login_Welcometittle">Bienvenid@s:</h3>
                            <p className="mss_top">
                                Accede a nuestra comunidad de mentores expertos en diseño, tecnología, inteligencia artificial y más. {icon__cap()} 
                            </p>
                        </div>

                        {/* Formulario de inicio de sesión */}
                        <form action="login_formulario" onSubmit={handleSubmit} className="login_forms">
                            <input 
                                type="text" 
                                value={user} 
                                onChange={(e) => setUser(e.target.value)} 
                                placeholder="Email" 
                                className="input_Credential"
                            />
                            <div className="container__password">
                                <input 
                                    type={showPwd ? "password" : "text"} 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Contraseña" 
                                    className="input_Credential"
                                />
                                <span id="ubicacion__icon">
                                    {showPwd ? icon__eyeDisabled() : icon__eyeEnable()}
                                </span>
                            </div>

                            <div>
                                <button id="BtnWelcome">Ingresar</button> 
                            </div>

                            {/* Mensajes de error o éxito */}
                            <p className="Login_error">{errors}</p>
                            <p className="Login_success">{success}</p>

                            {/* Enlace para registrarse */}
                            <div className="Login__Register">
                                <p className="Login_not">¿No tienes cuenta? </p>
                                <Link to="/registro"> 
                                    <label onClick={() => setVisRegister(true)} id="click_register">Regístrate</label> 
                                </Link> 
                            </div>
                        </form>
                    </div>
                </div>
            </div>    
        </>
    );
};

export default Login;
