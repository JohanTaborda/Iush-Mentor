import React, { useState, useEffect } from "react"; 
import "./Register.css";
import logo from "../../resources/images/logoAplication/Logo-IushMentor.png";  
import api from '../../services/Api/axiosConfig.js'; 
import { BeatLoader } from "react-spinners";
import { IoIosClose } from "react-icons/io"; 
import { Link } from "react-router-dom"; 
import { useForm } from "react-hook-form"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom"; 

//Recibimos mediante props el estado de la ventana de registro y el estado de la ventana de autenticación.
const Register = ({setVisAuth, setVisRegister}) => {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues: {
            user_type: 'aprendiz'  // Valor por defecto para user_type
        }
    });   
    const [validate, setValidate] = useState(false) //Guardamos el estado de la validación del formulario en el estado validate.

    const onSubmit = async (formData) => {
        const { password, confirmPassword, firstName, lastName, email, program, user_type } = formData;
      
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
      
            toast.success("¡Registro completado!", {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setValidate(true);
      
            setTimeout(() => {
                setVisRegister(false);
                navigate("/ingresar");
            }, 1200);
      
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
        if (errors.program?.type === "required") toast.error("El programa es obligatorio.");
    }, [errors]);
      
    const icon_close = () => <IoIosClose className="closeRegister" color="#000" onClick={() => setVisAuth(false)} style={{ display: validate ? "none" : "block" }}  />; 
    
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

                            <select {...register("program", { required: "El programa es obligatorio" })} className={`form--input ${errors.program ? "input-error" : ""}`} title="Programa Obligatorio" id="selectProgram">
                                {programas.map((value, index) => (
                                    <option required key={index} value={value.startsWith("Selecciona") ? "" : value}>{value}</option>
                                ))}
                            </select>
                        </div>
                        <button  type="submit"  className="button--Submit"  disabled={validate}>
                            {validate ? ( <BeatLoader color="#ffffff" size={5} />
                            ) : ( "Crear Cuenta"  )}
                        </button>                   
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
