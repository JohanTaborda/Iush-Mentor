import React, {useState, useEffect} from "react"
import {Calendar as ReactCalendar} from 'react-calendar'; // Renombrado con alias

const Calendar = () => {
    // Añadimos el estado necesario para el calendario
    const [date, setDate] = useState(new Date());
    
    return(
        <ReactCalendar onChange={setDate} value={date} />
    )
}

export default Calendar;