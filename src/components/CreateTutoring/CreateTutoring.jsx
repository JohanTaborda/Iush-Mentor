import React, { useState, useEffect } from "react";
import "./CreateTutoring.css"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form"; 
import {useMentorStore, useUserStore} from "../../stores/Store"; 
import {useNavigate } from "react-router-dom"; 

const CreateTutoring = ({ closeWindow, tutoringToEdit, onTutoringUpdated }) => {
    const dataUser = useUserStore(state => state.user); 
    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
        defaultValues: {
            title: "",
            description: "",
            capacity: "",
            startDate: "",
            startTime: "",
            endTime: "",
            program: "",
            modality: "",
            link: ""
        }
    });
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    
    // Observadores para campos del formulario
    const startTime = watch("startTime");
    const endTime = watch("endTime");
    const selectedModality = watch("modality");

    // Estado para ancho de la ventana
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Accedemos a las subescuelas desde Zustand
    const { adminSubschools, creativeSubschools } = useMentorStore();

    // Obtenemos todos los títulos de subescuelas combinando ambas listas
    const allSubschoolNames = [...adminSubschools, ...creativeSubschools].map(item => item.title);

    // Cargar datos si estamos editando
    useEffect(() => {
        if (tutoringToEdit) {
            setIsEditing(true);
            
            // Formatear fecha para que sea compatible con input date (YYYY-MM-DD)
            const formattedDate = new Date(tutoringToEdit.date).toISOString().split('T')[0];
            
            // Completar los campos del formulario con los datos de la tutoría a editar
            reset({
                title: tutoringToEdit.title || "",
                description: tutoringToEdit.description || "",
                capacity: tutoringToEdit.capacity || "",
                startDate: formattedDate,
                startTime: tutoringToEdit.start_time || "",
                endTime: tutoringToEdit.end_time || "",
                program: tutoringToEdit.program || "",
                modality: tutoringToEdit.modality || "",
                link: tutoringToEdit.modality === "Virtual" 
                    ? tutoringToEdit.connection_link 
                    : tutoringToEdit.classroom || ""
            });
        } else {
            setIsEditing(false);
            reset();
        }
    }, [tutoringToEdit, reset]);

    // Envío del formulario
    const onSubmit = async (formData) => {
        if (formData.startTime >= formData.endTime) {
            toast.error("La hora de finalización debe ser posterior a la hora de inicio");
            return;
        }

        try {
            // Preparar datos comunes para crear o editar
            const tutoringData = {
                id_tutor: dataUser.userId,
                title: formData.title,
                description: formData.description,
                capacity: formData.capacity,
                date: formData.startDate,
                start_time: formData.startTime,
                end_time: formData.endTime,
                program: formData.program,
                modality: formData.modality,
                connection_link: formData.modality === "Virtual" ? formData.link : null,
                classroom: formData.modality === "Presencial" ? formData.link : null,
            };

            let response;
            
            // Si estamos editando, hacemos un PUT
            if (isEditing && tutoringToEdit) {
                response = await fetch(`http://localhost:3000/tutoring/${tutoringToEdit.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tutoringData),
                });
            } else {
                // Si estamos creando, hacemos un POST
                response = await fetch("http://localhost:3000/tutoring", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tutoringData),
                });
            }

            const data = await response.json();

            if (response.ok) {
                const successMessage = isEditing
                    ? "Tutoría actualizada exitosamente"
                    : "Tutoría creada exitosamente";
                    
                toast.success(successMessage);
                
                // Si estamos editando, notificar al componente padre
                if (isEditing && onTutoringUpdated) {
                    onTutoringUpdated({
                        ...tutoringToEdit,
                        ...tutoringData,
                        id: tutoringToEdit.id,
                        tutor: tutoringToEdit.tutor
                    });
                }
                
                setTimeout(() => {
                    closeWindow(false);
                    // Solo navegamos al inicio si estamos creando desde otra página
                    if (!isEditing) {
                        navigate("/inicio");
                    }
                }, 2000);
            } else {
                const errorMessage = isEditing
                    ? "Error al actualizar tutoría"
                    : "Error al crear tutoría";
                toast.error(data.error || errorMessage);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error de conexión con el servidor");
        }
    };

    // Validación de horas: si la hora de fin es menor a la de inicio, se borra
    useEffect(() => {
        if (startTime && endTime) {
            if (startTime >= endTime) {
                toast.error("La hora de finalización debe ser posterior a la hora de inicio");
                setValue("endTime", ""); // Limpia el valor
            }
        }
    }, [startTime, endTime, setValue]);

    // Escuchar cambios en el tamaño de la ventana para mostrar u ocultar el toast
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mostrar errores cuando cambian
    useEffect(() => {
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
        <div className="overlayGeneral" >
            <div className="containerGeneralOverlay" id="container__createTutoring">
                <header className="header_Tutoring">
                    <h1 className="title_Tutoring">{isEditing ? 'Editar Tutoría' : 'Crear Tutoría'}</h1>
                </header>

                <form className="info__formTutoring" onSubmit={handleSubmit(onSubmit)}>
                    <div className="info--inputs">
                        <h1 className="title__section" id="title_infoBasic">Información Básica:</h1>

                        <label className="label--templateTutoring">Título de la Tutoría</label>
                        <input
                            {...register("title", { required: "El título es obligatorio" })}
                            type="text"
                            className={`inputs--templateTutoring ${errors.title ? "input-error" : ""}`}
                            placeholder="Ej: Hooks en React"
                        />

                        <label className="label--templateTutoring">Descripción</label>
                        <textarea
                            {...register("description", { required: "La descripción es obligatoria" })}
                            className={`inputs--templateTutoring textarea--templateTutoring ${errors.description ? "input-error" : ""}`}
                            placeholder="Descripción de la Tutoría"
                        />

                        <h1 className="title__section">Detalles:</h1>

                        <label className="label--templateTutoring">Capacidad</label>
                        <input
                            {...register("capacity", {
                                required: "La capacidad es obligatoria",
                                valueAsNumber: true,
                            })}
                            type="number"
                            className={`inputs--templateTutoring ${errors.capacity ? "input-error" : ""}`}
                            placeholder="Capacidad de Estudiantes"
                            max={50}
                            min={10}
                        />

                        <label className="label--templateTutoring">Fecha de Inicio</label>
                        <input
                            {...register("startDate", { required: "La fecha de inicio es obligatoria" })}
                            type="date"
                            className={`inputs--templateTutoring ${errors.startDate ? "input-error" : ""}`}
                        />

                        <label className="label--templateTutoring">Hora de Inicio</label>
                        <input
                            {...register("startTime", { required: "La hora de inicio es obligatoria" })}
                            type="time"
                            className={`inputs--templateTutoring ${errors.startTime ? "input-error" : ""}`}
                        />

                        <label className="label--templateTutoring">Hora de Fin</label>
                        <input
                            {...register("endTime", { required: "La hora de fin es obligatoria" })}
                            type="time"
                            className={`inputs--templateTutoring ${errors.endTime ? "input-error" : ""}`}
                        />

                        {/* Dropdown de programas dinámico desde Zustand */}
                        <label className="label--templateTutoring">Programa</label>
                        <select
                            {...register("program", { required: "El programa es obligatorio" })}
                            className={`inputs--templateTutoring ${errors.program ? "input-error" : ""}`}
                        >
                            <option value="">Seleccionar un programa</option>
                            {allSubschoolNames.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>

                        <h1 className="title__section">Modalidad:</h1>

                        <label className="label--templateTutoring">Modalidad</label>
                        <select
                            {...register("modality", { required: "La modalidad es obligatoria" })}
                            className={`inputs--templateTutoring ${errors.modality ? "input-error" : ""}`}
                        >
                            <option value="">Seleccionar Modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                        </select>

                        {/* Campo condicional según modalidad */}
                        {selectedModality && (
                            <>
                                <label className="label--templateTutoring">
                                    {selectedModality === "Presencial" ? "Sala:" : "Enlace:"}
                                </label>
                                <input
                                    {...register("link", { required: "Este campo es obligatorio" })}
                                    type={selectedModality === "Presencial" ? "text" : "url"}
                                    className={`inputs--templateTutoring ${errors.link ? "input-error" : ""}`}
                                    placeholder={selectedModality === "Presencial"
                                        ? "Número o nombre de sala"
                                        : "Enlace para Modalidad Virtual"}
                                />
                            </>
                        )}
                    </div>

                    <div className="buttons--templateTutoring">
                        <button type="submit" className="button--Tutoring" id="button--Submit">
                            {isEditing ? 'Guardar Cambios' : 'Crear Tutoría'}
                        </button>
                        <button 
                            type="button" 
                            className="button--Tutoring" 
                            id="button--CancelTutoring" 
                            onClick={() => closeWindow(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

                {/* Toast sólo si la ventana es ancha */}
                {windowWidth > 600 && (
                    <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar className="custom-toast-containerTemplateTutoring" />
                )}
            </div>
        </div>
    );
};

export default CreateTutoring;