import React, { useState, useEffect } from "react"; //Importamos los hooks
import "./Register.css";
import logo from "../../resources/images/logoAplication/Logo-IushMentor.png"; //Importamos el logo del registro.

import { IoIosClose } from "react-icons/io"; //Importamos el icono para cerrar el registro.
import { Link } from "react-router-dom"; //Hacemos uso del link para las rutas.
import { useForm } from "react-hook-form"; //Utilizamos useForm, para el formulario de registro.

import { ToastContainer, toast } from "react-toastify"; //Hacemos uso de toastify para las fichas con mensajes importantes.
import "react-toastify/dist/ReactToastify.css"; //Importamos los estilos para las fichas

import { useNavigate } from "react-router-dom"; //Importamos el hook useNavigate para redirigir al usuario a la página de inicio de sesión después de registrarse.

//Recibimos mediante props el estado de la ventana de registro y el estado de la ventana de autenticación.
const Register = ({setVisAuth, setVisRegister}) => {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, watch} = useForm(); //Utilizamos el hook useForm para manejar el formulario de registro.
    const [data, setData] = useState(""); //Guardamos los datos del formulario en el estado data.
    const [validate, setValidate] = useState(false) //Guardamos el estado de la validación del formulario en el estado validate.

    const onSubmit = (formData) => { //Recibimos los datos del formulario al enviar el formulario.
        
        const {password, confirmPassword } = formData; //Desestructuramos los datos del formulario para obtener la contraseña y la confirmación de la contraseña.

        if (password !== confirmPassword) { toast.error("Las contraseñas no coinciden");  return; } //Si las contraseñas no coinciden, mostramos un mensaje de error y salimos de la función.

        setData(JSON.stringify(formData)); //Guardamos los datos del formulario en el estado data en un formato JSON.

        setValidate(true);

        toast.success("¡Registro completado!"); //Mostramos un mensaje de éxito al usuario.

        setTimeout(() => { //Esperamos 5 segundos antes de redirigir al usuario a la página de inicio de sesión.
            setVisRegister(false);
            navigate("/ingresar"); //Redirigimos al usuario a la página de inicio de sesión.
        }, 5000);
    };

    useEffect(() => { //Validamos los errores del formulario y mostramos mensajes de error al usuario.
        if (errors.firstName?.type === "required") toast.error("El nombre es obligatorio") //Validamos el nombre
        if (errors.lastName?.type === "required") toast.error("El apellido es obligatorio") //Validamos el apellido
        if (errors.email?.type === "required") toast.error("El correo es obligatorio."); //Validamos el correo
        if (errors.password?.type === "required") toast.error("La contraseña es obligatoria "); //Validamos la contraseña
        if (errors.confirmPassword?.type === "required") toast.error("La confirmación de contraseña es obligatoria."); //Validamos la confirmación de la contraseña
    }, [errors]); 
    
    const icon_close = () => <IoIosClose className="closeRegister" color="#000" onClick={() => setVisAuth(false)} style={{ display: validate ? "none" : "block" }}  />; //Icono para cerrar el registro.
    
    return (
        <div className="overlayGeneral">
            <ToastContainer position="bottom-right" autoClose={9000} hideProgressBar className="custom-toast-container"/> {/* Contenedor para las fichas de mensajes importantes */}
            <div className="containerGeneralOverlay" id="containerRegister">
                <div className="containerForm">
                    <Link to="/" >{icon_close()}</Link> {/* Icono para cerrar el registro */}
                    <h4 className="titleRegister">Regístrate: </h4>
                    <form  className="formRegister" 
                        onSubmit={handleSubmit(onSubmit)} //Manejamos el evento onSubmit del formulario y llamamos a la función onSubmit al enviar el formulario.
                    > 
                        {/* Inputs del formulario de registro */}
                        <input   {...register("firstName", { required: "El nombre es obligatorio", minLength: {value: 3, message: "Minimo 3 Caracteres" },})} placeholder="Nombre" minLength={3}
                            className={`form--input ${errors.firstName ? "input-error" : ""}`} pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$" title="Solo letras, mínimo 3 caracteres" type="text"/> {/* Validamos el nombre */}

                        <input   {...register("lastName", { required: "El apellido es obligatorio", minLength: {value: 3, message: "Minimo 3 Caracteres" }})} placeholder="Apellido" type="text"
                            minLength={3} title="Solo letras, mínimo 3 caracteres" pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$" className={`form--input ${errors.lastName ? "input-error" : ""}`} /> {/* Validamos el apellido */}

                        <input {...register("email", { required: true })}  placeholder="Email"  type="email" className={`form--input ${errors.email ? "input-error" : ""}`}/> {/* Validamos el correo electrónico */}

                        <input   {...register("password", { required: "La contraseña es obligatoria", minLength: {value: 6, message: "Minimo 6 Caracteres" }})} minLength={6} title="Mínimo 6 caracteres"
                            placeholder="Contraseña"  type="password"  className={`form--input ${errors.password ? "input-error" : ""}`}/> {/* Validamos la contraseña */}
                            
                        <input {...register("confirmPassword", { required: true })} placeholder="Confirmar Contraseña" type="password" className={`form--input ${errors.confirmPassword ? "input-error" : ""}`}/> {/* Validamos la confirmación de la contraseña */}

                        <input type="submit" value="Crear Cuenta" className="button--Submit" disabled={validate ? true : false} /> {/* Botón para enviar el formulario */}
                    </form>
                </div>
                <div className="container__logo">
                    <img src={logo} alt="Logo_Iush-mentor" className="imgLogoMentor" /> {/* Logo de la aplicación */}
                </div>
            </div>
        </div>
    );
};

export default Register;
