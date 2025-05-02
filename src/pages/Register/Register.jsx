import React, { useState, useEffect } from "react"; //Importamos los hooks
import "./Register.css";
import logo from "../../resources/images/logoAplication/Logo-IushMentor.png"; //Importamos el logo del registro. 
import api from '../../services/Api/axiosConfig.js'; // Importamos la configuración de Axios para realizar solicitudes HTTP

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

    const onSubmit = async (formData) => {
        const { password, confirmPassword, firstName, lastName, email, user_type, program } = formData;
      
        if (password !== confirmPassword) {
          toast.error("Las contraseñas no coinciden");
          return;
        }
      
        try {
            await api.post('/users', {
                username: `${firstName} ${lastName}`,
                email,
                password,
                user_type,  
                program
            });
      
            toast.success("¡Registro completado!");
            setValidate(true);
      
            setTimeout(() => {
                setVisRegister(false);
                navigate("/ingresar");
            }, 5000);
      
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          toast.error("Error al registrar usuario");
        }
    };

    useEffect(() => {
        if (errors.firstName?.type === "required") toast.error("El nombre es obligatorio");
        if (errors.lastName?.type === "required") toast.error("El apellido es obligatorio");
        if (errors.email?.type === "required") toast.error("El correo es obligatorio.");
        if (errors.password?.type === "required") toast.error("La contraseña es obligatoria");
        if (errors.confirmPassword?.type === "required") toast.error("La confirmación de contraseña es obligatoria.");
        if (errors.user_type?.type === "required") toast.error("El rol es obligatorio.");
        if (errors.program?.type === "required") toast.error("El programa es obligatorio.");
    }, [errors]);
      
    const icon_close = () => <IoIosClose className="closeRegister" color="#000" onClick={() => setVisAuth(false)} style={{ display: validate ? "none" : "block" }}  />; //Icono para cerrar el registro.
    
    const programas = [ "Selecciona un programa", "Administración de empresas", "Comunicación Organizacional", "Contaduría Pública", "Derecho",
        "Mercadeo", "Negocios Internacionales", "Tecnología en gestión del talento humano", "Tecnología en gestión empresarial", "Tecnología en Gestión de Mercadeo y Ventas",
        "Tecnología en gestión de negocios internacionales","Animación", "Ingeniería Electrónica", "Ingeniería Industrial", "Ingeniería de Sistemas", "Diseño Gráfico",
        "Diseño de Modas", "Tecnología en sistemas", "Realización y producción musical", "Ingeniería en inteligencia de negocios"
    ];
      
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
                            
                        <input {...register("confirmPassword", { required: true })} placeholder="Confirmar Contraseña" type="password" className={`form--input $selectRol{errors.confirmPassword ? "input-error" : ""}`}/> {/* Validamos la confirmación de la contraseña */}

                        <div className="select-group">
                            <select {...register("user_type", { required: "El rol es obligatorio" })} className={`form--input ${errors.user_type ? "input-error" : ""}`} title="Rol Obligatorio" id="selectRol">
                                <option value="">Selecciona un rol</option>
                                <option value="tutor">Tutor</option>
                                <option value="aprendiz">Aprendiz</option>
                            </select>

                            <select {...register("program", { required: "El programa es obligatorio" })} className={`form--input ${errors.program ? "input-error" : ""}`} title="Programa Obligatorio" id="selectProgram">
                                {programas.map((value, index) => (
                                    <option required key={index} value={value.startsWith("Selecciona") ? "" : value}>{value}</option>
                                ))}
                            </select>
                        </div>
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
