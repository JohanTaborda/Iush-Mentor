import React, { useState, useEffect } from "react";
import "./Register.css";
import { IoIosClose } from "react-icons/io";

import { useForm } from "react-hook-form";
import logo from "../../resources/images/logoAplication/Logo-IushMentor.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = ({setVisAuth, setVisRegister}) => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [data, setData] = useState("");
    const [validate, setValidate] = useState(false)

    const onSubmit = (formData) => {
        const {password, confirmPassword } = formData;
        if (password !== confirmPassword) { toast.error("Las contraseñas no coinciden");  return; }
        setData(JSON.stringify(formData));
        setValidate(true)
        toast.success("¡Registro completado!");
        setTimeout(() => {
            setVisAuth(false);
        }, 5000);
    };

    useEffect(() => {
        //console.log(data)
    }, [validate])

    useEffect(() => {
        if (errors.firstName) {
            {errors.firstName.type === "pattern" ? toast.error(errors.firstName.message) : toast.error("El nombre es obligatorio y solo se aceptan letras.") }
        }
    
        if (errors.lastName) {
            {errors.lastName.type === "pattern" ? toast.error(errors.lastName.message) : toast.error("El apellido es obligatorio y solo se aceptan letras.")}
        }
    
        if (errors.email?.type === "required") toast.error("El correo es obligatorio.");
        if (errors.password?.type === "required") toast.error("La contraseña es obligatoria y debe ser con más de 8 dígitos.");
        if (errors.password?.type === "minLength") toast.error(errors.password.message);
        if (errors.confirmPassword?.type === "required") toast.error("La confirmación de contraseña es obligatoria.");
    }, [errors]);
    

    const icon_close = () => <IoIosClose className="closeRegister" onClick={() => setVisAuth(false)} />;
    
    return (
        <div className="overlayGeneral">
            <ToastContainer position="bottom-right" autoClose={8000} hideProgressBar className="custom-toast-container"/>
            <div className="containerGeneralOverlay" id="containerRegister">
                <div className="containerForm">
                    <span>{icon_close()}</span>
                    <h4 className="titleRegister">Regístrate: </h4>
                    <form  className="formRegister"
                        onSubmit={handleSubmit(onSubmit)} 
                    >
                        <input   {...register("firstName", { required: "El nombre es obligatorio", pattern: {value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "El nombre solo debe contener letras"}})} 
                            placeholder="Nombre" type="text" className={`form--input ${errors.firstName ? "input-error" : ""}`}/>

                        <input   {...register("lastName", { required: "El apellido es obligatorio", pattern: {value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, message: "El apellido solo debe contener letras"}})} 
                            placeholder="Apellido" type="text" className={`form--input ${errors.lastName ? "input-error" : ""}`} />

                        <input {...register("email", { required: true })}  placeholder="Email"  type="email" className={`form--input ${errors.email ? "input-error" : ""}`}/>

                        <input   {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" } })} 
                            placeholder="Contraseña"  type="password"  className={`form--input ${errors.password ? "input-error" : ""}`}/>
                            
                        <input {...register("confirmPassword", { required: true })} placeholder="Confirmar Contraseña" type="password" className={`form--input ${errors.confirmPassword ? "input-error" : ""}`}/>

                        <input type="submit" value="Crear Cuenta" className="button--Submit" disabled={validate ? true : false} />
                    </form>
                </div>
                <div className="container__logo">
                    <img src={logo} alt="Logo_Iush-mentor" className="imgLogoMentor" />
                </div>
            </div>
        </div>
    );
};

export default Register;
