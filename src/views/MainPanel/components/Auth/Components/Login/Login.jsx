import React, { useState } from "react"; // Para utilizar React
import "./Login"  // Funciones personalizadas para el componente Login.
import "./Login.css"  // Estilos personalizados para el componente Login.
import { FaRegEyeSlash } from "react-icons/fa6"; // Importar icono de ojo cerrado
import { FaRegEye } from "react-icons/fa"; // Importar Icono de ojo abierto
import { GiGraduateCap } from "react-icons/gi"; // Importar Icono de graduación

const Login = ({setVisRegister,setMainComponent}) => { //Lo que permite que el botón iniciar sesión funcione

    // Variables.
    const validasrUsuario = "iush-mentor@gmail.com" // correo para inicira sesión
    const validarContraseña = "iush-mentor"// correo para iniciar sesión
    // Constantes.
    const [visOverlay, setVisOverlay] = useState(false) // Overlay para la vista del Login
    const [user, setUser] = useState("") // estado para inicializar el usuario
    const [password, setPassword] = useState("") // estado para inicializar la contraseña
    const [error, setError] = useState(false) // estado para inicializar error
    const [showPwd, setShowPdw] = useState(true)//Estado para inicializar la función para que cambie l ojo y la forma de digitar la contraseña
    const handleSubmit = (e) =>{ //Para manejar el formulario 
        e.preventDefault()

        if(user == "" || password == ""){ // sentencia para definir si el usuario o la contraseña estan vacios
            setError(true) // Si hay algun campo vacio el setError se vuelve verdadero
            return
        }
        if(user == validasrUsuario && password == validarContraseña){ //Permite validar la informacion para poder que se ingrese al Navbar
            setMainComponent(true) // si se cumple la sentencia se sigue al Navbar
        }
    }

    const icon__eyeEnable = () => <FaRegEye onClick={() => setShowPdw(!showPwd)} className="icons_eyes"/> // función donde se da a conocer que si se le da click al ojo va a cambiar de icono por el ojo cerrado ademas que se muestra el icono
    const icon__eyeDisabled = () => <FaRegEyeSlash onClick={() => setShowPdw(!showPwd)} className="icons_eyes"/> // función donde se da a conocer que si se le da click al ojo va a cambiar de icono por el ojo abierto ademas que se muestra el icono
    const icon__cap = () => < GiGraduateCap className="icons_eyes" color="blue"/> // se muestra el logo de la graduación con su respectivo color
    
    return(
        <>
            <div className="overlay"> {/* contenedor donde se encuentra el overlay*/}
                <div className="Login__container"> {/*contenedor donde se encuentra el login */}
                    <div className="Login__img"> {/* contenedor donde se muestra la imagen */}
                        <img src="src/resources/images/logoAplication/Logo-IushMentor.png" alt="img-mentor" className="img_IUSH" /> {/* se agrega la imagen al login con su respectiva clase*/}
                    </div>
                    <div className="Login__welcome"> {/*contenedor de la parte derecha del ogin, quiere decir la de bienvenida */}
                                <div className="Login_WelcomeInitial"> {/* contenedor donde se muestra la parte inicial del login*/}
                                    <h3 className="Login_Welcometittle">Bienvenid@s:</h3>
                                    <p className="mss_top">Accede a nuestra comunidad de mentores expertos en diseño, tecnología, inteligencia artificial y más. {icon__cap()} </p> {/*Aca se esra invocando el icono de graduacion */}
                                </div>
                                <form action="login_formulario" onSubmit={handleSubmit} className="login_forms"> {/* Aca se inicializa el formulario y se llama la función handlesubmit para que se reinicie el formulario*/}
                                    <input type="email" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Email" className="" id="LoginInput"/> {/* esta linea de codigo nos dice que estamos inicializando el input y que tipo de dato se debe digitar, ademas el e.target.value es para que se guarden los datos que se digitan*/}
                                    <div className="container__password"> {/* contenedor que se hace para poder posicionar el icono del ojo y donde esta la parte de la password*/}
                                        <input type={!showPwd ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"className="input__password" id="LoginInput"/> {/*En esta linea se hace una sentencia para que en el input se pueda cambiar la forma de ver los datos, ya sea que el usuario lo quiera ver con puntos o la contraseña en si*/}
                                        <span id="ubicacion__icon">{ !showPwd ? icon__eyeEnable(): icon__eyeDisabled() } </span> {/* aca se hace la funcion para permitir que el icono vaya cambiando de forma a medida que se le da click, tambien se cambia el formato en el que se ve la contraseña*/}
                                    </div>
                                    <div> {/* se inicia contenedor para mejorar la imagen visualmente del boton*/}
                                    <button id="BtnWelcome">INGRESAR</button> 
                                    {error && <p className="Login_error">Todos los campos son obligatorios</p>} {/* sentencia donde se muestra el error si algun campo de los input, sea email o password estan vacios*/}
                                    </div> {/* contenedor para darle una mejor organizacion al apartado registro*/}
                                    <div className="Login__Register">
                                        <p className="Login_not">¿No tienes cuenta? </p>
                                    <a onClick={() => setVisRegister(false)} id="click_register" >Registráte</a> {/*donde se muestra el apartado de registrarse y muestra a donde se redirecciona al darle click ese apartado */}
                                    </div>                                    
                                </form>
                                
                    </div>
                </div>
            </div>    

        </>
    )
}

export default Login;