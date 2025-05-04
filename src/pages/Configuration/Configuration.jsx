import { useState } from 'react';
import "./Configuration.css"
import { Container, Paper, Tabs, Tab, Box, Typography, TextField, Button, Grid, Avatar } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const Configuration = () => {
    const [tabValue, setTabValue] = useState(0);
    const [profileData, setProfileData] = useState({
        name: 'Usuario',
        email: 'usuario@example.com',
        program: 'Ingeniería de Software',
        semester: '5'
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [tutorData, setTutorData] = useState({
        motivation: '',
        experience: '',
        subjects: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        console.log('Guardar perfil:', profileData);
        // Aquí iría la lógica para guardar los datos del perfil
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log('Cambiar contraseña:', passwordData);
        // Aquí iría la lógica para cambiar la contraseña
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


    return (
        <div className='containerConfiguration'>
            <Paper >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                   
                >
                    <Tab className='titleTabs' label="Perfil" />
                    <Tab className='titleTabs' label="Contraseña" />
                    <Tab className='titleTabs' label="Solicitar ser tutor" />
                    <Tab className='titleTabs' label="Imagen de perfil" />
                </Tabs>

                {/* Sección de Perfil */}
                <TabPanel value={tabValue} index={0}>
                    Hola a todos
                </TabPanel>

                {/* Sección de Contraseña */}
                <TabPanel value={tabValue} index={1}>
                   Espacio para la contraseña
                </TabPanel>

                {/* Sección para solicitar ser tutor */}
                <TabPanel value={tabValue} index={2}>
                    Espacio para solicitar ser tutor
                </TabPanel>

                {/* Sección para subir imagen */}
                <TabPanel value={tabValue} index={3}>
                   Espacio para la imagen de perfil
                </TabPanel>
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

export default Configuration;