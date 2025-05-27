// Importación de hooks y componentes necesarios
import { useState } from 'react';
import "./Configuration.css"
import { Paper, Tabs, Tab, Box, Typography, TextField, Button, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import {useUserStore} from "../../stores/Store"

const Configuration = () => {
    // Estados para controlar la visibilidad de secciones
    const [visProfile, setVisProfile] = useState(false);
    const [visPassword, setVisPassword] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    // Estados para manejar imagen de perfil
    const [imagen, setImagen] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const programas = [ "Selecciona un programa", "Administración de Empresas", "Comunicación Organizacional",  "Contaduría Pública",  "Derecho", "Mercadeo",  "Negocios Internacionales",
        "Talento Humano",  "Gestión Empresarial", "Mercadeo y Ventas", "Gestión Internacional", "Animación", "Ing. Electrónica", "Ing. Industrial", "Ing.Sistemas", "Diseño Gráfico", "Diseño de Modas",
        "Tec. en Sistemas", "Producción Musical",  "Inteligencia de Negocios"
    ];

    // Obtener datos del usuario desde el store global
    const dataUser = useUserStore(state => state.user);

    // Estado para los datos del perfil que cargan antes de editar
    const [profileData, setProfileData] = useState({
        name: dataUser.username || "",
        email: dataUser.email || "",
        program: dataUser.program && programas.includes(dataUser.program) ? dataUser.program : "Selecciona un programa"
    });

    // Estado para los datos de cambio de contraseña
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Estado para los datos de solicitud de tutor
    const [tutorData, setTutorData] = useState({
        reason: '',
        subjects: '',
        semester: ''
    });

    // Función para actualizar el perfil del usuario conexión con el backend
    const updateProfile = async () => {
        try {
            const response = await fetch(`http://localhost:3000/users/${dataUser.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: profileData.name,
                    email: profileData.email,
                    program: profileData.program
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido");
            }

            const updatedUser = await response.json();

            // Actualizar el estado global combinando los datos existentes con los actualizados
            useUserStore.setState(state => ({ 
                user: { 
                    ...state.user, 
                    username: updatedUser.username,
                    email: updatedUser.email,
                    program: updatedUser.program 
                } 
            }));

            toast.success("Perfil actualizado correctamente");
            setVisProfile(false);
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    // Cambiar de pestaña
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Manejar cambios en los campos del perfil
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    // Manejar cambios en los campos de contraseña
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    // Manejar cambios en los campos de solicitud de tutor
    const handleTutorDataChange = (e) => {
        const { name, value } = e.target;
        setTutorData({ ...tutorData, [name]: value });
    };
    

    // Enviar formulario de perfil
    const handleProfileSubmit = (e) => {
        e.preventDefault();

        if (profileData.program === 'Selecciona un programa') {
            toast.error("Por favor selecciona un programa académico.");
            return;
        }

        updateProfile();
    };

    // Enviar formulario de cambio de contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();


    // Verificar si las contraseñas coinciden
    if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("Las contraseñas no coinciden. Por favor, verifica que sean iguales.");
        return;
    }

    try {
        // Realizar la solicitud para cambiar la contraseña
        const response = await fetch(`http://localhost:3000/users/${dataUser.userId}}/change-password`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            })
        });

        // Obtener el resultado de la solicitud
        const result = await response.json();

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(result.error || "Error al cambiar la contraseña");
        }

        // Mostrar mensaje de éxito
        toast.success("Contraseña actualizada correctamente");

        // Limpiar campos
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setVisPassword(false);
    } catch (error) {
        // Manejo de errores
        toast.error(`Error: ${error.message}`);
    }
};

    // Enviar solicitud de tutor
    const handleTutorSubmit = async (e) => {

            e.preventDefault();
                console.log("Datos que se envían al backend:", {
                reason: tutorData.reason,
                subjects: tutorData.subjects,
                semester: tutorData.semester,
                userId: dataUser.userId
            });
            try {
                const response = await fetch('http://localhost:3000/tutor-requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    reason: tutorData.reason,
                    subjects: tutorData.subjects,
                    semester: tutorData.semester,
                    userId: dataUser.userId
                })
                });

                const result = await response.json();
                console.log("Respuesta del backend:", result); 

                if (!response.ok) {
                toast.error(result.error || "Error al enviar la solicitud");
                return;
                }

                toast.success("Solicitud enviada correctamente");
                setTutorData({
                reason: '',
                subjects: '',
                semester: ''
                });
            } catch (error) {
                toast.error("Error inesperado: " + error.message);
            }
            };

    // Enviar imagen de perfil
    const handleImageSubmit = async (e) => {
        e.preventDefault();

        if (!profileImage) {
            toast.error("Primero selecciona una imagen");
            return;
        }

        const formData = new FormData();
        formData.append("profileImage", profileImage);

        try {
            const response = await fetch(`http://localhost:3000/users/${dataUser.userId}/profile-image`, {
            method: "PUT",
            body: formData
            });

            const result = await response.json();

            if (!response.ok) {
            throw new Error(result.error || "Error al subir la imagen");
            }

            toast.success("Imagen de perfil actualizada");

            //Actualiza la imagen en pantalla
            setImagen(`http://localhost:3000/uploads/${result.profileImage}`);

            // Actualiza el store global para que persista tras recargar
            useUserStore.setState({
            user: { ...dataUser, profileImage: result.profileImage }
            });

        } catch (error) {
            toast.error("Error: " + error.message);
        }
    };

    // Manejar cambio de imagen de perfil
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagen(reader.result);
                setProfileImage(file);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
    <div className='containerConfiguration'>
        {/* Título principal de la sección de configuración */}
        <h1 className='titleConfiguration'>Configuración</h1>

        {/* Contenedor principal con pestañas */}
        <Paper className='documentation-section'>
            {/* Navegación por pestañas */}
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" scrollButtons="auto">
                <Tab className='titleTabs' label="Perfil" />
                <Tab className='titleTabs' label="Contraseña" />
                {/* Mostrar esta pestaña solo si el usuario no es tutor */}
                <Tab
                    className='titleTabs'
                    label="Solicitar ser tutor"
                    style={{ display: `${dataUser.userRol === "aprendiz" ? "block" : "none"}` }}
                />
                <Tab className='titleTabs' label="Imagen de perfil" />
            </Tabs>

            {/* Panel de contenido para la pestaña "Perfil" */}
            <TabPanel value={tabValue} index={0}>
                <form onSubmit={handleProfileSubmit}>
                    <div className="TabPanelProfile">
                        {/* Campo para el nombre completo */}
                        <TextField
                            name="name"
                            defaultValue={dataUser.username}
                            onChange={handleProfileChange}
                            label="Nombre Completo"
                            variant="outlined"
                            disabled={!visProfile} // Solo editable si se activa edición
                            required
                            inputProps={{ pattern: "^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$" }} // Validación de solo letras y espacios
                        />

                        {/* Selector de programa académico */}
                        <FormControl variant="outlined" fullWidth required disabled={!visProfile}>
                            <InputLabel id="program-label">Programa</InputLabel>
                            <Select
                                labelId="program-label"
                                id="program-select"
                                name="program"
                                value={profileData.program}
                                onChange={handleProfileChange}
                                label="Programa"
                            >
                                {/* Lista de programas disponibles */}
                                {programas.map((programa, index) => (
                                    <MenuItem key={index} value={programa}>
                                        {programa}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Campo para el correo electrónico */}
                        <TextField
                            name='email'
                            onChange={handleProfileChange}
                            defaultValue={dataUser.email}
                            type='email'
                            label="Correo Electrónico"
                            variant="outlined"
                            disabled={!visProfile}
                            required
                        />
                    </div>

                    {/* Botón para editar o guardar el perfil */}
                    {!visProfile ? (
                        <Button
                            className='buttonEditProfile'
                            variant="contained"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setVisProfile(true); // Activar modo edición
                            }}
                        >
                            Editar Perfil
                        </Button>
                    ) : (
                        <Button className='buttonEditProfile' type='submit' variant="contained">
                            Guardar
                        </Button>
                    )}
                </form>
            </TabPanel>

                    {/* Sección de Contraseña */}
                <TabPanel value={tabValue} index={1}>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="TabPanelProfile">
                            {/* Campo para la contraseña actual */}
                            <TextField
                                name='currentPassword'
                                onChange={handlePasswordChange}
                                type='password'
                                label="Contraseña Actual"
                                variant="outlined"
                                disabled={!visPassword}
                                required
                                inputProps={{ minLength: 6 }}
                            />
                            {/* Campo para la nueva contraseña */}
                            <TextField
                                name='newPassword'
                                onChange={handlePasswordChange}
                                type='password'
                                label="Nueva Contraseña"
                                variant="outlined"
                                disabled={!visPassword}
                                required
                                inputProps={{ minLength: 6 }}
                            />
                            {/* Campo para confirmar la nueva contraseña */}
                            <TextField
                                name='confirmPassword'
                                onChange={handlePasswordChange}
                                type='password'
                                label="Confirmar Nueva Contraseña"
                                variant="outlined"
                                disabled={!visPassword}
                                required
                                inputProps={{ minLength: 6 }}
                            />
                        </div>

                        {/* Botón para activar edición o enviar formulario */}
                        {!visPassword ? (
                            <Button
                                className='buttonEditProfile'
                                type="button"
                                variant="contained"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setVisPassword(true);
                                }}
                            >
                                Cambiar Contraseña
                            </Button>
                        ) : (
                            <Button className='buttonEditProfile' type='submit' variant="contained">
                                Actualizar
                            </Button>
                        )}
                    </form>
                </TabPanel>

                {/* Sección para solicitar ser tutor */}
                <TabPanel value={tabValue} index={2}>
                    <form onSubmit={handleTutorSubmit}>
                        <div className="TabPanelProfile">
                            <TextField
                                name="reason"
                                onChange={handleTutorDataChange}
                                label="¿Por qué quieres ser tutor?"
                                inputProps={{ maxLength: 100 }}
                                variant="outlined"
                                required
                            />
                            <FormControl variant="outlined" fullWidth required>
                                <InputLabel id="program-focus-label">Programa de enfoque:</InputLabel>
                                <Select
                                    labelId="program-focus-label"
                                    id="program-focus-select"
                                    name="subjects"
                                    onChange={handleTutorDataChange}
                                    label="Programa de enfoque:"
                                >
                                    {programas.filter(programa => programa !== "Selecciona un programa").map((programa, index) => (
                                        <MenuItem key={index} value={programa}>
                                            {programa}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                name='semester'
                                onChange={handleTutorDataChange}
                                type='number'
                                label="Semestre actual"
                                variant="outlined"
                                required
                                inputProps={{ min: 1, max: 10 }}
                            />
                        </div>
                        <Button className='buttonEditProfile' type='submit' variant="contained">
                            Enviar Solicitud
                        </Button>
                    </form>
                </TabPanel>

                {/* Sección para subir imagen */}
                <TabPanel value={tabValue} index={3}>
                    <form onSubmit={handleImageSubmit}>
                        <div className='changeImgProfile'>
                            {/* Vista previa de la imagen seleccionada */}
                            <Avatar src={imagen} sx={{ width: 100, height: 100 }} />
                            {/* Input oculto para seleccionar archivo */}
                            <input
                                accept="image/*"
                                id="imagen-perfil"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImagenChange}
                            />
                            {/* Botón para abrir el selector de archivos */}
                            <label htmlFor="imagen-perfil">
                                <Button variant="contained" className='buttonEditProfile' component="span">
                                    Subir Imagen
                                </Button>
                            </label>
                            {/* Botón para guardar la imagen */}
                            <Button className='buttonEditProfile' type='submit' variant="contained">
                                Guardar Imagen
                            </Button>
                        </div>
                    </form>
                </TabPanel>

                {/* Contenedor de notificaciones */}
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Paper>

            {/* Información adicional sobre los datos */}
            <Paper className="documentation-section" sx={{ mt: 3, p: 2 }}>
                <Typography className='textInfoData' id="titleInfoData" gutterBottom>
                    Información sobre los datos
                </Typography>

                {/* Información sobre el perfil */}
                <Typography className='textInfoData' sx={{ mt: 2 }}>Perfil</Typography>
                <Typography className='descriptionInfoData'>
                    • Todos los campos son obligatorios.<br />
                    • El campo de nombre y apellido no admite caracteres especiales ni números; únicamente recibe letras.<br />
                    • El correo electrónico debe tener un formato válido (ejemplo@dominio.com).<br />
                </Typography>

                {/* Información sobre la contraseña */}
                <Typography className='textInfoData' sx={{ mt: 2 }}>Contraseña</Typography>
                <Typography className='descriptionInfoData'>
                    • La contraseña actual es necesaria para verificar su identidad.<br />
                    • La nueva contraseña debe tener al menos 6 caracteres.<br />
                    • Las contraseñas nuevas deben coincidir.<br />
                </Typography>

                {/* Información sobre solicitud de tutor (solo si no es tutor) */}
                <div style={{ display: `${dataUser.userRol === "aprendiz" ? "block" : "none"}` }}>
                    <Typography className='textInfoData' sx={{ mt: 2 }}>Solicitud de tutor</Typography>
                    <Typography className='descriptionInfoData'>
                        • Sea específico sobre sus motivaciones y experiencia.<br />
                        • Liste las materias en las que desea ser tutor, separadas por comas.<br />
                        • Indique claramente su semestre actual (debe ser tercero o superior).<br />
                    </Typography>
                </div>

                {/* Información sobre imagen de perfil */}
                <Typography className='textInfoData' sx={{ mt: 2 }}>Imagen de perfil</Typography>
                <Typography className='descriptionInfoData'>
                    • Formato permitido: JPG o PNG.<br />
                    • Tamaño máximo: 5 MB.<br />
                </Typography>
            </Paper>
        </div>
    );
};

// Componente auxiliar para gestionar los paneles de pestañas
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`config-tabpanel-${index}`}
            aria-labelledby={`config-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Exportación del componente principal para su uso en otras partes de la aplicación
export default Configuration;