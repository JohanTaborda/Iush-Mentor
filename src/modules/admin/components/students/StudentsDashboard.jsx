
import React, { useState, useEffect } from 'react';
import './studentsDashboard.css'; // Importamos los estilos

// Iconos para las acciones
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const StudentsDashboard = () => {
  // Estado para almacenar la lista de estudiantes
  const [estudiantes, setEstudiantes] = useState([]);
  
  // Estado para el estudiante que se está editando
  const [editingId, setEditingId] = useState(null);
  
  // Estado para el formulario de edición
  const [editFormData, setEditFormData] = useState({
    nombreCompleto: '',
    correo: '',
    rol: ''
  });

  // Estado para el filtro de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Cargamos datos de ejemplo al iniciar
  useEffect(() => {
    // Simulamos la carga de datos desde una API
    const datosEjemplo = [
      { id: 1, nombreCompleto: 'Juan Pérez', correo: 'juan.perez@iush.edu.co', rol: 'estudiante' },
      { id: 2, nombreCompleto: 'María López', correo: 'maria.lopez@iush.edu.co', rol: 'estudiante' },
      { id: 3, nombreCompleto: 'Carlos Rodríguez', correo: 'carlos.rodriguez@iush.edu.co', rol: 'tutor' },
      { id: 4, nombreCompleto: 'Ana Gómez', correo: 'ana.gomez@iush.edu.co', rol: 'estudiante' },
      { id: 5, nombreCompleto: 'Pedro Martínez', correo: 'pedro.martinez@iush.edu.co', rol: 'estudiante' },
      { id: 6, nombreCompleto: 'Sofía Ramírez', correo: 'sofia.ramirez@iush.edu.co', rol: 'tutor' },
    ];
    
    setEstudiantes(datosEjemplo);
  }, []);

  // Manejador para iniciar la edición de un estudiante
  const handleEditClick = (estudiante) => {
    setEditingId(estudiante.id);
    
    // Configuramos los valores del formulario con los datos del estudiante
    setEditFormData({
      nombreCompleto: estudiante.nombreCompleto,
      correo: estudiante.correo,
      rol: estudiante.rol
    });
  };

  // Manejador para cancelar la edición
  const handleCancelClick = () => {
    setEditingId(null);
  };

  // Manejador para eliminar un estudiante
  const handleDeleteClick = (estudianteId) => {
    // Confirmamos antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      const nuevosEstudiantes = estudiantes.filter(estudiante => estudiante.id !== estudianteId);
      setEstudiantes(nuevosEstudiantes);
    }
  };

  // Manejador para cambios en el formulario de edición
  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Manejador para guardar los cambios
  const handleSaveClick = (estudianteId) => {
    // Validamos que los campos no estén vacíos
    if (!editFormData.nombreCompleto || !editFormData.correo || !editFormData.rol) {
      alert("Todos los campos son obligatorios");
      return;
    }
    
    // Validamos formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editFormData.correo)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }
    
    // Actualizamos el estado con los nuevos datos
    const nuevosEstudiantes = estudiantes.map(estudiante => {
      if (estudiante.id === estudianteId) {
        return { ...estudiante, ...editFormData };
      }
      return estudiante;
    });
    
    setEstudiantes(nuevosEstudiantes);
    setEditingId(null);
  };

  // Filtrar estudiantes según la búsqueda
  const estudiantesFiltrados = estudiantes.filter(estudiante => 
    estudiante.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
    estudiante.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    estudiante.rol.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Gestión de Estudiantes</h1>
        <div className="dashboard-search">
          <input type="text" placeholder="Buscar por nombre, correo o rol..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesFiltrados.length > 0 ? (
              estudiantesFiltrados.map(estudiante => (
                <tr key={estudiante.id}>
                  <td>
                    {editingId === estudiante.id ? (
                      <input type="text" name="nombreCompleto" value={editFormData.nombreCompleto} onChange={handleEditFormChange} className="edit-input" />
                    ) : (
                      estudiante.nombreCompleto
                    )}
                  </td>
                  <td>
                    {editingId === estudiante.id ? (
                      <input type="email"  name="correo" value={editFormData.correo} onChange={handleEditFormChange} className="edit-input"/>
                    ) : (
                      estudiante.correo
                    )}
                  </td>
                  <td>
                    {editingId === estudiante.id ? (
                      <select  name="rol" value={editFormData.rol} onChange={handleEditFormChange} className="edit-input"  >
                        <option value="estudiante">Estudiante</option>
                        <option value="tutor">Tutor</option>
                        <option value="administrador">Administrador</option>
                      </select>
                    ) : (
                      <span className={`role-badge ${estudiante.rol}`}>  {estudiante.rol} </span>
                    )}
                  </td>
                  <td className="options-cell">
                    {editingId === estudiante.id ? (
                      <>
                        <button 
                          className="action-buttonDashboard save"
                          onClick={() => handleSaveClick(estudiante.id)}
                          title="Guardar cambios"
                        >
                          <FaSave />
                        </button>
                        <button  className="action-buttonDashboard cancel" onClick={handleCancelClick} title="Cancelar edición"> <FaTimes /> </button>
                      </>
                    ) : (
                      <>
                        <button className="action-buttonDashboard edit" onClick={() => handleEditClick(estudiante)} title="Editar estudiante"> <FaEdit /> </button>
                        <button className="action-buttonDashboard delete"onClick={() => handleDeleteClick(estudiante.id)}title="Eliminar estudiante" > <FaTrash /> </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results"> No se encontraron estudiantes con esa búsqueda </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsDashboard;