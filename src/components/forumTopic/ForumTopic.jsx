import { useState, useEffect } from "react";
import "./ForumTopic.css";
import { useForm } from "react-hook-form"; // Manejo de formularios

const ForumTopic = ({onClose}) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileError, setFileError] = useState("");
    
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // Máximo 5 MB
    const MAX_FILES = 3; //Máximo 3 archivos.

    // Manejar la selección de archivos
    const handleFileChange = (e) => {
        setFileError("");
        
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            
            // Verificar si no excedemos el número máximo de archivos
            if (selectedFiles.length + filesArray.length > MAX_FILES) {
                setFileError(`No puedes subir más de ${MAX_FILES} archivos`);
                return;
            }
            
            // Verificar tamaño de cada archivo
            const validFiles = filesArray.filter(file => {
                if (file.size > MAX_FILE_SIZE) {
                    setFileError(`El archivo "${file.name}" excede el límite de 5MB`);
                    return false;
                }
                return true;
            });
            
            if (validFiles.length > 0) {
                setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
                setValue('files', [...selectedFiles, ...validFiles]);
            }
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
                <input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileChange} 
                    className="file-input"
                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    multiple
                    disabled={selectedFiles.length >= MAX_FILES}
                />
            </label>
            
            {fileError && <p className="file-error-message">{fileError}</p>}
            
            <div className="file-limits-info" style={{fontFamily:"Outfit", fontSize: "16.3px"}}>
                <small>Máximo 3 archivos. </small> 
                <small>Tamaño máximo por archivo: 5MB.</small> <br />
                <small>Formatos permitidos: imágenes, PDF, documentos Office, texto.</small>
            </div>
            
            {selectedFiles.length > 0 && (
                <div className="selected-files-list">
                    <h4>Archivos seleccionados: ({selectedFiles.length}/{MAX_FILES})</h4>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>
                                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                <button type="button" onClick={() => removeFile(index)} className="remove-file-btn">
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