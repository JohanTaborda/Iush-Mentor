import { useState } from 'react';
import "./Configuration.css"
import { Paper, Tabs, Tab, Box, Typography, TextField, Button, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const Configuration = () => {
    const [visProfile, setVisProfile] = useState(false);
    const [visPassword, setVisPassword] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [imagen, setImagen] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [profileData, setProfileData] = useState({
        name: 'Usuario',
        lastName: "Usuario",
        email: '',
        program: 'Selecciona un programa'
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [tutorData, setTutorData] = useState({
        reason: '',
        programs: '',
        semester: ''
    });

    const handleTabChange = (event, newValue) => {setTabValue(newValue); };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleTutorDataChange = (e) => {
        const { name, value } = e.target;
        setTutorData({ ...tutorData, [name]: value });
    };


    const handleProfileSubmit = (e) => {
        e.preventDefault();
        
        if (profileData.program === 'Selecciona un programa') {
            toast.error("Por favor selecciona un programa académico.");
            return;
        }
        
        console.log('Guardar perfil:', profileData);
        
        toast.success("Perfil actualizado correctamente");
        setVisProfile(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Las contraseñas no coinciden. Por favor, verifica que sean iguales.");
            return; 
        }
        
        console.log('Cambiar contraseña:', passwordData);
        toast.success("Contraseña actualizada correctamente");
        
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setVisPassword(false);
    };

    const handleTutorSubmit = (e) => {
        e.preventDefault();
        console.log('Solicitud de tutor:', tutorData);
        // Aquí iría la lógica para enviar solicitud de tutor
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();
        console.log('Nueva imagen de perfil:', profileImage);
        // Aquí iría la lógica para subir la imagen
    };


    const handleImagenChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagen(reader.result);
          setProfileImage(file)
        };
        reader.readAsDataURL(file);
      }
    }

    const programas = [ "Selecciona un programa", "Administración de empresas", "Comunicación Organizacional", "Contaduría Pública", "Derecho",
        "Mercadeo", "Negocios Internacionales", "Tecnología en gestión del talento humano", "Tecnología en gestión empresarial", "Tecnología en Gestión de Mercadeo y Ventas",
        "Tecnología en gestión de negocios internacionales","Animación", "Ingeniería Electrónica", "Ingeniería Industrial", "Ingeniería de Sistemas", "Diseño Gráfico",
        "Diseño de Modas", "Tecnología en sistemas", "Realización y producción musical", "Ingeniería en inteligencia de negocios"
    ];

    return (
        <div className='containerConfiguration'>
            <h1 className='titleConfiguration'>Configuración</h1>
            <Paper className='documentation-section'>
                <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" scrollButtons="auto">
                    <Tab className='titleTabs' label="Perfil" />
                    <Tab className='titleTabs' label="Contraseña" />
                    <Tab className='titleTabs' label="Solicitar ser tutor" />
                    <Tab className='titleTabs' label="Imagen de perfil" />
                </Tabs>

                {/* Sección de Perfil */}
                <TabPanel value={tabValue} index={0} >
                    <form onSubmit={handleProfileSubmit}>
                        <div  className="TabPanelProfile">
                            <TextField name='name' onChange={handleProfileChange} defaultValue={profileData.name} label="Nombre Completo" variant="outlined" disabled={!visProfile} required inputProps={{pattern:"^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"}} />
                            <FormControl variant="outlined" fullWidth required disabled={!visProfile}>
                                <InputLabel id="program-label">Programa</InputLabel>
                                <Select labelId="program-label" id="program-select" name="program" value={profileData.program} onChange={handleProfileChange}  label="Programa">
                                    {programas.map((programa, index) => (
                                        <MenuItem key={index} value={programa}>
                                            {programa}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>                          
                            <TextField name='email' onChange={handleProfileChange} defaultValue={profileData.email} type='email' label="Correo Electronico" variant="outlined" disabled={!visProfile} required/>
                        </div>
                        {!visProfile ? (
                            <Button  className='buttonEditProfile' variant="contained" type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation();  setVisProfile(true);  }}>Editar Perfil</Button>
                        ) : (
                            <Button className='buttonEditProfile' type='submit' variant="contained">Guardar</Button>
                        )}
                    </form>
                </TabPanel>

                {/* Sección de Contraseña */}
                <TabPanel value={tabValue} index={1}>
                    <form onSubmit={handlePasswordSubmit}>
                        <div  className="TabPanelProfile">
                            <TextField name='currentPassword' onChange={handlePasswordChange} type='password' label="Contraseña Actual" variant="outlined" disabled={!visPassword} required  inputProps={{ minLength: 6 }}/>
                            <TextField name='newPassword'   onChange={handlePasswordChange}  type='password' label="Nueva Contraseña" variant="outlined" disabled={!visPassword}  required  inputProps={{ minLength: 6 }}/>
                            <TextField name='confirmPassword' onChange={handlePasswordChange} type='password' label="Confirmar Nueva Contraseña" variant="outlined" disabled={!visPassword} required  inputProps={{ minLength: 6 }}/>
                        </div>
                        {!visPassword ? (
                            <Button className='buttonEditProfile' type="button" variant="contained" onClick={(e) => {e.preventDefault(); e.stopPropagation(); setVisPassword(true);}} >Cambiar Contraseña </Button>
                        ) : (
                            <Button className='buttonEditProfile' type='submit' variant="contained">Actualizar</Button>
                        )}
                    </form>
                </TabPanel>

                {/* Sección para solicitar ser tutor */}
                <TabPanel value={tabValue} index={2}>
                <form onSubmit={handleTutorSubmit}>
                        <div  className="TabPanelProfile">
                            <TextField name="reason" onChange={handleTutorDataChange} label="¿Por qué quieres ser tutor?" variant="outlined" required />
                            <TextField name="programs" onChange={handleTutorDataChange} label="Materias que enseñarias (Separadas por comas)" variant="outlined"  required/>                         
                            <TextField name='semester' onChange={handleTutorDataChange} type='number' label="Semestre actual" variant="outlined" required inputProps={{min: 1, max: 10}} />
                        </div>
                            <Button className='buttonEditProfile' type='submit' variant="contained">Enviar Solicitud</Button>
                    </form>
                </TabPanel>

                {/* Sección para subir imagen */}
                <TabPanel value={tabValue} index={3}>
                    <form onSubmit={handleImageSubmit}>
                        <div className='changeImgProfile'>
                            <Avatar src={imagen} sx={{ width: 100, height: 100 }}/>
                            <input accept="image/*" id="imagen-perfil" type="file" style={{ display: 'none' }} onChange={handleImagenChange} />
                            <label htmlFor="imagen-perfil">
                                <Button variant="contained" component="span"> Subir Imagen </Button>
                            </label>
                            <Button className='buttonEditProfile' type='submit' variant="contained">Guardar Imagen</Button>
                        </div>
                    </form>
                </TabPanel>
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false}newestOnTop={false}  closeOnClick rtl={false}
                    draggable pauseOnHover theme="light" />
            </Paper>
            <Paper className="documentation-section" sx={{ mt: 3, p: 2 }}>
                <Typography className='textInfoData' id="titleInfoData" gutterBottom>Información sobre los datos</Typography>
                
                <Typography className='textInfoData' sx={{ mt: 2 }}>Perfil</Typography>
                <Typography className='descriptionInfoData'>
                    • Todos los campos son obligatorios.<br />
                    • El campo de nombre y apellido no admite caracteres especiales ni números; únicamente recibe letras.<br />
                    • El correo electrónico debe tener un formato válido (ejemplo@dominio.com).<br />
                </Typography>

                <Typography className='textInfoData' sx={{ mt: 2 }}>Contraseña</Typography>
                <Typography className='descriptionInfoData'>
                    • La contraseña actual es necesaria para verificar su identidad.<br />
                    • La nueva contraseña debe tener al menos 6 caracteres.<br />
                    • Las contraseñas nuevas deben coincidir.<br />
                </Typography>

                <Typography className='textInfoData' sx={{ mt: 2 }}>Solicitud de tutor</Typography>
                <Typography className='descriptionInfoData'>
                    • Sea específico sobre sus motivaciones y experiencia.<br />
                    • Liste las materias en las que desea ser tutor, separadas por comas.<br />
                    • Indique claramente su semestre actual (debe ser tercero o superior).<br />
                </Typography>

                <Typography className='textInfoData' sx={{ mt: 2 }}>Imagen de perfil</Typography>
                <Typography className='descriptionInfoData'>
                    • Formato permitido: JPG o PNG.<br />
                    • Tamaño máximo: 5 MB.<br />
                </Typography>
            </Paper>

        </div>
    );
};

function TabPanel(props) { // Componente auxiliar para gestionar los paneles de pestañas
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index}  id={`config-tabpanel-${index}`} aria-labelledby={`config-tab-${index}`} {...other} >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default Configuration;