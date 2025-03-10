import React, { useState } from "react";
import "./Login"  // Funciones personalizadas para el componente Login.
import "./Login.css"  // Estilos personalizados para el componente Login.

/*
    Descripción.

    Lista de parámetros.

        * Parámetro1 (tipo): Descripción.

    Retornos:

        * retorno1 (tipo): Descripción.
*/
const Login = ({setVisRegister}) => {

    // Variables.

    // Constantes.
    const [visOverlay, setVisOverlay] = useState(false)
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = (e) =>{
        e.preventDefault()

        if(nombre == "" || password || ""){
            setError(true)
            return
        }
    }
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Funciones.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
 
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    // Componente.
    // -----------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------
    
    return(
        <>
            <div className="overlay">
                <div className="Login__container">
                    <div className="Login__img">
                        <img src="src/resources/images/logoAplication/Logo-IushMentor.png" alt="img-mentor" className="img_IUSH" />
                    </div>
                    <div className="Login__welcome">
                                <h2>BIENVENID@S</h2>
                                <h3>Accede a nuestra comunidad de mentores</h3>
                                <form action="login_formulario" onSubmit={handleSubmit}>
                                    <input type="text" value={user} placeholder="Usuario o Email"/>
                                    <input type="password" value={password} placeholder="Contraseña" />
                                    <div>
                                    <button>ingresar</button>
                                    {error && <p>Todos los campos son obligatorios</p>}
                                    <button onClick={() => setVisRegister(true)}>Register</button>
                                    </div>
                                </form>

                    </div>
                </div>
            </div>    

        </>
    )
}

export default Login;