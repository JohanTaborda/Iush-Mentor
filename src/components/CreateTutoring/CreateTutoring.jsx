import React, {useState, useEffect} from "react";
import "./CreateTutoring.css"; // Estilos personalizados para el componente CreateTutoring.
import { ToastContainer, toast } from "react-toastify"; //Hacemos uso de toastify para las fichas con mensajes importantes.
import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form"; // Utilizamos useForm para manejar el formulario.

const CreateTutoring = ({ closeWindow }) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm(); // Hook para manejar el formulario.
    const startTime = watch("startTime"); // Observamos el valor de la hora de inicio
    const endTime = watch("endTime"); // Observamos el valor de la hora final
    const selectedModality = watch("modality"); // Observamos la modalidad seleccionada
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    const onSubmit = (formData) => { 
        // Validación adicional antes de enviar
        if (formData.startTime >= formData.endTime) {
            toast.error("La hora de finalización debe ser posterior a la hora de inicio");
            return;
        }
        
        toast.success("Tutoría creada exitosamente"); 
        setTimeout(() => {
            closeWindow(false); // Cerramos la ventana.
        }, 3000);
    };

    
    useEffect(() => {// Validación de horas cuando cambian
        if (startTime && endTime) {
            if (startTime >= endTime) {
                toast.error("La hora de finalización debe ser posterior a la hora de inicio"); // La hora de inicio es mayor o igual que la hora final
                setValue("endTime", ""); // Limpiamos el valor de la hora final
            }
        }
    }, [startTime, endTime, setValue]);

    useEffect(() => { // Efecto para manejar el cambio de tamaño de la ventana
        const handleResize = () => {setWindowWidth(window.innerWidth); };
        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize);};
    }, []);

    
    useEffect(() => {// Efecto para mostrar errores cuando cambian
        // Validación de errores para cada campo
        if (errors.title) toast.error(errors.title.message);
        if (errors.description) toast.error(errors.description.message);
        if (errors.capacity) toast.error(errors.capacity.message);
        if (errors.startDate) toast.error(errors.startDate.message);
        if (errors.startTime) toast.error(errors.startTime.message);
        if (errors.endTime) toast.error(errors.endTime.message);
        if (errors.program) toast.error(errors.program.message);
        if (errors.modality) toast.error(errors.modality.message);
        if (errors.link) toast.error(errors.link.message);
    }, [errors]);
    
    return (
        <div className="overlayGeneral">
            <div className="containerGeneralOverlay" id="container__createTutoring">
                <header className="header_Tutoring">
                    <h1 className="title_Tutoring">Crear Tutoría</h1>
                </header>
                <form className="info__formTutoring" onSubmit={handleSubmit(onSubmit)}>
                    <div className="info--inputs">
                        <h1 className="title__section" id="title_infoBasic">Información Básica:</h1>
                        <label className="label--templateTutoring">Título de la Tutoría</label>
                        <input {...register("title", { required: "El título es obligatorio" })} type="text" className={`inputs--templateTutoring ${errors.title? "input-error" : ""}`} placeholder="Ej: Hooks en React" />

                        <label className="label--templateTutoring">Descripción</label>
                        <textarea {...register("description", { required: "La descripción es obligatoria" })} className={`inputs--templateTutoring textarea--templateTutoring ${errors.description? "input-error" : ""}`}placeholder="Descripción de la Tutoría" />

                        <h1 className="title__section">Detalles:</h1>
                        <label className="label--templateTutoring">Capacidad</label>
                        <input  {...register("capacity", { required: "La capacidad es obligatoria", valueAsNumber: true })}  type="number" className={`inputs--templateTutoring ${errors.capacity? "input-error" : ""}`} placeholder="Capacidad de Estudiantes" max={50} min={10} />

                        <label className="label--templateTutoring">Fecha de Inicio</label>
                        <input {...register("startDate", { required: "La fecha de inicio es obligatoria" })} type="date" className={`inputs--templateTutoring ${errors.startDate? "input-error" : ""}`} />

                        <label className="label--templateTutoring">Hora de Inicio</label>
                        <input {...register("startTime", { required: "La hora de inicio es obligatoria" })} type="time" className={`inputs--templateTutoring ${errors.startTime? "input-error" : ""}`} />

                        <label className="label--templateTutoring">Hora de Fin</label>
                        <input {...register("endTime", { required: "La hora de inicio es obligatoria" })} type="time" className={`inputs--templateTutoring ${errors.endTime? "input-error" : ""}`} />

                        <label className="label--templateTutoring">Programa</label>
                        <select {...register("program", { required: "El programa es obligatorio" })} className={`inputs--templateTutoring ${errors.program? "input-error" : ""}`}>
                            <option value="">Seleccionar un programa</option>
                            <option value="Ing.Sistemas">Ing.sistemas</option>
                            <option value="Derecho">Derecho</option>
                            <option value="Animación">Animación</option>
                        </select>
                       
                        <h1 className="title__section">Modalidad:</h1>
                        <label className="label--templateTutoring">Modalidad</label> 
                        <select {...register("modality", { required: "La modalidad es obligatoria" })} className={`inputs--templateTutoring ${errors.modality? "input-error" : ""}`}>
                            <option value="">Seleccionar Modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                        </select>

                        {selectedModality && (
                            <>
                                <label className="label--templateTutoring">{selectedModality === "Presencial" ? "Sala:" : "Enlace:"}</label>
                                <input {...register("link", { required: "Este campo es obligatorio" })} type={selectedModality === "Presencial" ? "text" : "url"} 
                                    className={`inputs--templateTutoring ${errors.link? "input-error" : ""}`} 
                                    placeholder={selectedModality === "Presencial" ? "Número o nombre de sala" : "Enlace para Modalidad Virtual"} 
                                />
                            </>
                        )}
                    
                    </div>

                    <div className="buttons--templateTutoring">
                        <button type="submit" className="button--Tutoring" id="button--Submit">Crear Tutoría</button>
                        <button type="button" className="button--Tutoring" id="button--Cancel" onClick={() => closeWindow(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
                {windowWidth > 600 && (
                    <ToastContainer position="bottom-right"  autoClose={3000}  hideProgressBar  className="custom-toast-containerTemplateTutoring"/>
                )}       
            </div>
    );
};

export default CreateTutoring;                       