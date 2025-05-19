import { useState, useEffect } from 'react';
import './studentsDashboard.css'; 
import CreateUser from '../createUser/CreateUser'; 
import api from '../../../../services/Api/axiosConfig.js';
import { BeatLoader } from 'react-spinners'; 

import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';

const StudentsDashboard = () => {
  // Estado para almacenar la lista de todos los usuarios
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Estado para el formulario de edición
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    userRol: '',
    program: ''
  });

  useEffect(() => {   // Efecto para cargar todos los usuarios al montar el componente
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/users');
        setUsersData(response.data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAllUsers();
  }, []);

  // Manejador para iniciar la edición de un estudiante
  const handleEditClick = (estudiante) => {
    /*setEditingId(estudiante.userId);
      
      // Configuramos los valores del formulario con los datos del usuario
      setEditFormData({
        username: estudiante.username,
        email: estudiante.email,
        userRol: estudiante.userRol
      });
    */
  };

  // Manejador para cancelar la edición
  const handleCancelClick = () => {
    setEditingId(null);
  };

  // Manejador para eliminar un estudiante
  const handleDeleteClick = async (estudianteId) => {

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
  const handleSaveClick = async (estudianteId) => {

  };
  
  // Manejador para crear un nuevo usuario
  const handleCreateUser = async (userData) => {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.error}`);
      return;
    }

    const newUser = await response.json();

    // Aquí deberías agregarlo al estado si lo necesitas
    alert(newUser.message || "Usuario creado correctamente");

    setIsCreateModalOpen(false);
  } catch (error) {
    console.error("Error en la petición:", error);
    alert("Error al crear el usuario");
  }
};

  // Filtrar usuarios según la búsqueda
  const usuariosFiltrados = usersData.filter(usuario => 
    usuario.username?.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.user_type?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Gestión de Usuarios</h1>
        <div className="dashboard-search">
          <input type="text" placeholder="Buscar por nombre, correo o rol..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className='loadingComponents'>
            Cargando Usuarios...
            <BeatLoader color="#184ea5"/>
          </div>
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Programa</th>
                <th>Rol</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody className='ejemplo'>
              {usuariosFiltrados.length > 0 ? (
                usuariosFiltrados.map(estudiante => (
                  <tr key={estudiante.userId}>
                    <td>
                      {editingId === estudiante.userId ? (
                        <input type="text" name="username" value={editFormData.username} onChange={handleEditFormChange} className="edit-input"  />
                      ) : (
                        estudiante.username
                      )}
                    </td>
                    <td>
                      {editingId === estudiante.userId ? (
                        <input type="email"  name="email" value={editFormData.email} onChange={handleEditFormChange} className="edit-input"/>
                      ) : (
                        estudiante.email
                      )}
                    </td>
                                        <td>
                      {editingId === estudiante.userId ? (
                        <input type="text"  name="program" value={editFormData.program} onChange={handleEditFormChange} className="edit-input"/>
                      ) : (
                        estudiante.program || "Sin programa"
                      )}
                    </td>
                    <td>
                      {editingId === estudiante.userId ? (
                        <select  name="userRol" value={editFormData.user_type} onChange={handleEditFormChange} className="edit-input"
                        >
                          <option value="estudiante">Aprendiz</option>
                          <option value="tutor">Tutor</option>
                          <option value="administrador">Administrador</option>
                        </select>
                      ) : (
                        <span className={`role-badge ${estudiante.user_type}`}>{estudiante.user_type}</span>
                      )}
                    </td>
                    <td className="options-cell">
                      {editingId === estudiante.userId ? (
                        <>
                          <button className="action-buttonDashboard save"onClick={() => handleSaveClick(estudiante.userId)} title="Guardar cambios">
                            <FaSave />
                          </button>
                          <button  className="action-buttonDashboard cancel" onClick={handleCancelClick} title="Cancelar edición"> 
                            <FaTimes /> 
                          </button>
                        </>
                      ) : (
                        estudiante.user_type !== "administrador" && (
                          <>
                            <button  className="action-buttonDashboard edit" onClick={() => handleEditClick(estudiante)}  title="Editar estudiante">  <FaEdit />  </button>
                            <button  className="action-buttonDashboard delete" onClick={() => handleDeleteClick(estudiante.userId)} title="Eliminar estudiante"  > <FaTrash />  </button>
                          </>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-results"> No se encontraron usuarios con esa búsqueda</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Botón flotante para agregar nuevo usuario */}
      <button className="floating-buttonAdmin" onClick={() => setIsCreateModalOpen(true)} title="Crear nuevo usuario"> <FaPlus /> </button>
      
      {/* Modal de creación de usuario */}
      <CreateUser 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateUser}
      />
    </div>
  );
};

export default StudentsDashboard;