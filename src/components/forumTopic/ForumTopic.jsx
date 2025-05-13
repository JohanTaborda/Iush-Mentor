import { useState, useEffect } from "react";
import "./ForumTopic.css";
import { useForm } from "react-hook-form"; // Manejo de formularios

const ForumTopic = ({onClose}) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([]);

    // Manejar la selección de archivos
    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);
            setValue('files', [...selectedFiles, ...filesArray]);
        }
    };

    // Eliminar un archivo seleccionado
    const removeFile = (indexToRemove) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        setSelectedFiles(updatedFiles);
        setValue('files', updatedFiles);
    };

    const onSubmit = async (formData) => { //En esta función se mandan los valores al backend de los datos registrados. 
        console.log(formData)
        onClose(false)
    };

    return(
        <div className="overlayGeneral" >
            <div className="containerGeneralOverlay" id="container__createTutoring">
                <header className="header_Tutoring">
                    <h1 className="title_Tutoring">Crear Publicación</h1>
                </header>

                <form className="info__formForum" onSubmit={handleSubmit(onSubmit)}>
                    <div className="info--inputs">
                        <h1 className="title__section" id="title_infoBasic">Información Básica:</h1>

                        <label className="label--templateTutoring">Título de la publicación:</label>
                        <input  {...register("title", { required: "El título es obligatorio" })} type="text" className={`inputs--templateTutoring ${errors.title ? "input-error" : ""}`}
                            placeholder="Escribe un título claro y descriptivo" minLength={10}
                        />

                        <label className="label--templateTutoring">Descripción:</label>
                        <textarea {...register("description", { required: "La descripción es obligatoria" })} className={`inputs--templateTutoring textarea--templateTutoring ${errors.description ? "input-error" : ""}`}
                            placeholder="Comparte tu conocimiento, pregunta o reflexión..." minLength={10}
                        />

                        <h1 className="title__section">Archivo:</h1>
                        
                        <div className="file-upload-section">
                            <label htmlFor="file-upload" className="file-upload-label">
                                <div className="upload-btn">
                                    <i className="fas fa-cloud-upload-alt"></i> Subir archivo
                                </div>
                                <input id="file-upload" type="file" onChange={handleFileChange}  className="file-input"accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"/>
                            </label>
                            
                            {selectedFiles.length > 0 && (
                                <div className="selected-files-list">
                                    <h4>Archivos seleccionados:</h4>
                                    <ul>
                                        {selectedFiles.map((file, index) => (
                                            <li key={index}>
                                                {file.name}
                                                <button type="button"  onClick={() => removeFile(index)}className="remove-file-btn">
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="buttons--templateTutoring">
                        <button type="submit" className="button--Tutoring" id="button--Submit">Crear Tema</button>
                        <button type="button" className="button--Tutoring" id="button--Cancel" onClick={() => onClose(false)}>Cancelar</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForumTopic;