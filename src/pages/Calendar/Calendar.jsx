import React, { useState, useEffect } from "react";
import { 
  Paper, 
  Typography, 
  Box, 
  Badge, 
  IconButton, 
  Tooltip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { 
  LocalizationProvider, 
  DateCalendar,
  PickersDay
} from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from "date-fns/locale";
import { isSameDay, format } from "date-fns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import TeachingIcon from "@mui/icons-material/PreviewOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useUserStore, useMentorStore } from "../../stores/Store";
import { BeatLoader } from 'react-spinners';
import "./Calendar.css";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tutoringDates, setTutoringDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
    const [allTutorings, setAllTutorings] = useState([]); // Nuevo estado

    const navigate = useNavigate();
    const dataUser = useUserStore(state => state.user);
    const dataTutoring = useMentorStore(value => value.tutoringSessions);

    const updateEventsForDate = (date, tutorings) => {
        const filtered = tutorings.filter(t => 
        t.processedDate.getFullYear() === date.getFullYear() &&
        t.processedDate.getMonth() === date.getMonth() &&
        t.processedDate.getDate() === date.getDate()
        );
        setEventsForSelectedDate(filtered);
    };
  
  // Actualizar eventos cuando cambia la fecha seleccionada
    useEffect(() => {
    if (allTutorings.length > 0) {
        updateEventsForDate(selectedDate, allTutorings);
    }
    }, [selectedDate, allTutorings]);
  
  
    // Obtener tutorías inscritas y creadas
    useEffect(() => {
        const fetchAllTutoringData = async () => {
            setIsLoading(true);
            try {
            let userTutorings = [];
            
            // Lógica condicional según el rol del usuario
            if (dataUser.userRol === "aprendiz") {
                // Si es estudiante, obtener SOLO tutorías inscritas
                const resEnrolled = await fetch(`http://localhost:3000/enrollments/student/${dataUser.userId}`);
                if (resEnrolled.ok) {
                const enrolledData = await resEnrolled.json();
                userTutorings = enrolledData.map(e => ({
                    ...e.tutoria, 
                    enrollmentId: e.id,
                    isEnrolled: true
                }));
                }
            } 
            else if (dataUser.userRol === "tutor") {
                // Si es tutor, obtener SOLO tutorías que creó
                const resTutorings = await fetch("http://localhost:3000/tutoring");
                const tutoringsData = await resTutorings.json();
                userTutorings = tutoringsData
                .filter(t => t.tutor?.username === dataUser.username)
                .map(t => ({...t, isCreated: true}));
            }
            
            // Almacenar todas las tutorías en una variable en memoria
            const processedTutorings = userTutorings.map(t => {
                // Procesar la fecha para crear un objeto Date consistente
                const dateParts = t.date.split('T')[0].split('-');
                const year = parseInt(dateParts[0]);
                const month = parseInt(dateParts[1]) - 1; 
                const day = parseInt(dateParts[2]);
                return {
                ...t,
                processedDate: new Date(year, month, day)
                };
            });
            
            // Extraer fechas únicas para el calendario
            const datesList = processedTutorings.map(t => t.processedDate);
            setTutoringDates(datesList);
            
            // Guardar todas las tutorías procesadas
            setAllTutorings(processedTutorings);
            
            // Filtrar eventos para la fecha inicial seleccionada
            updateEventsForDate(selectedDate, processedTutorings);
            
            } catch (error) {
            console.error("Error al cargar datos de tutorías:", error);
            } finally {
            setIsLoading(false);
            }
        };
        
        fetchAllTutoringData();
    }, []); // Sin dependencia selectedDate, solo se ejecutará una vez
  

  // Componente personalizado para días del calendario
  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    
    // Verificar si hay tutorías en este día
    const hasTutoring = tutoringDates.some(date => 
      isSameDay(date, day)
    );
    
    // Estilos condicionales si es la fecha actual o hay tutorías
    const isSelected = isSameDay(day, selectedDate);
    
    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={hasTutoring ? <EventIcon color="primary" fontSize="small" /> : null}
      >
        <PickersDay 
          {...other} 
          outsideCurrentMonth={outsideCurrentMonth} 
          day={day}
          selected={isSelected}
          sx={{
            ...(isSelected && {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }),
            ...(hasTutoring && !isSelected && {
              border: '2px solid',
              borderColor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
              },
            }),
          }}
        />
      </Badge>
    );
  };

  return (
    <div className="container-general-calendar">
        <Box className="calendar-container">
            <Paper elevation={3} className="calendar-wrapper">
                <Box display="flex" justifyContent="center" alignItems="center" p={2} mb={2}>
                <Typography variant="h4" color="primary" fontWeight="bold" className="titleCalendar">
                    <CalendarMonthIcon fontSize="large" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Calendario de Tutorías
                </Typography>
                <Box width={40}></Box> {/* Espacio para balance visual */}
                </Box>

                <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    {isLoading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                        <BeatLoader color="#184ea5" />
                    </Box>
                    ) : (
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                        <DateCalendar
                        value={selectedDate}
                            onChange={(newDate) => {
                                setSelectedDate(newDate);
                            }}
                        slots={{ day: ServerDay }}
                        sx={{
                            '.MuiPickersCalendarHeader-root': {
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            mb: 1,
                            px: 2,
                            py: 1,
                            },
                            '.MuiDayCalendar-header': {
                            backgroundColor: '#eef2f6',
                            borderRadius: '4px',
                            },
                            '.MuiPickersDay-root': {
                            fontSize: '0.9rem',
                            margin: '2px',
                            },
                            '.MuiPickersDay-today': {
                            border: '2px solid',
                            borderColor: 'secondary.main',
                            }
                        }}
                        />
                    </LocalizationProvider>
                    )}
                </Grid>
                
                <Grid item xs={12} md={5}>
                    <Card elevation={2} sx={{ height: '100%', maxHeight: '455px', overflow: 'auto' }}>
                    <CardContent>
                        <Typography variant="h6" color="primary" gutterBottom fontWeight="bold" className="date__info__calendar">
                            Tutorías: {format(selectedDate, 'PPPP', { locale: es })}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        
                        {eventsForSelectedDate.length > 0 ? (
                        <List>
                            {eventsForSelectedDate.map((tutoring) => (
                            <ListItem 
                                key={tutoring.id} 
                                sx={{ 
                                mb: 1, 
                                bgcolor: tutoring.isEnrolled ? '#e3f2fd' : '#e8f5e9',
                                borderRadius: '8px',
                                '&:hover': {
                                    bgcolor: tutoring.isEnrolled ? '#bbdefb' : '#c8e6c9',
                                }
                                }}
                            >
                                <ListItemIcon>
                                {tutoring.isEnrolled ? (
                                    <SchoolIcon color="primary" />
                                ) : (
                                    <TeachingIcon color="success" />
                                )}
                                </ListItemIcon>
                                <ListItemText
                                primary={tutoring.title}
                                secondary={
                                    <>
                                    <Typography variant="body2" component="span" display="block">
                                        {tutoring.start_time} - {tutoring.end_time}
                                    </Typography>
                                    <Typography variant="body2" component="span" display="block">
                                        {tutoring.modality} • {tutoring.modality === "Virtual" ? "Enlace" : tutoring.classroom}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {tutoring.isEnrolled && "Tutor"} • {tutoring.tutor?.username}
                                    </Typography>
                                    </>
                                }
                                />
                            </ListItem>
                            ))}
                        </List>
                        ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="300px">
                            <CalendarMonthIcon fontSize="large" color="disabled" />
                            <Typography variant="body1" color="text.secondary" mt={2}>
                                No hay tutorías programadas para este día.
                            </Typography>
                        </Box>
                        )}
                    </CardContent>
                    </Card>
                </Grid>
                </Grid>
            </Paper>
            </Box>
    </div>
  );
};

export default Calendar;