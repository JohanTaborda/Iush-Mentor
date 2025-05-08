import React, { useState, useEffect } from 'react';
import './StudenRequest.css';
import { FaCheck, FaTimes } from 'react-icons/fa'; 
const StudentRequest = () => {
  // Estado para almacenar las solicitudes de tutorías
  const [solicitudes, setSolicitudes] = useState([]);
  
  // Estado para el modal de confirmación
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    action: null,
    requestId: null
  });

  // Estado para los textos expandidos
  const [expandedTexts, setExpandedTexts] = useState({});

  // Estado para el filtro de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Cargamos datos de ejemplo al iniciar
  useEffect(() => {
    // Simulamos la carga de datos desde una API
    const datosSolicitudes = [
      { 
        id: 1, 
        nombreCompleto: 'Laura Sánchez', 
        correo: 'laura.sanchez@iush.edu.co', 
        semestre: '7', 
        motivo: 'Quiero compartir mis conocimientos y ayudar a otros estudiantes que tienen dificultades con las materias que yo ya he cursado.',
        materias: 'Cálculo I, Álgebra Lineal, Ecuaciones Diferenciales',
        estado: 'pendiente',
        fechaSolicitud: '2025-04-28'
      },
      { 
        id: 2, 
        nombreCompleto: 'Diego Torres', 
        correo: 'diego.torres@iush.edu.co', 
        semestre: '9', 
        motivo: 'Me gustaría reforzar mis conocimientos enseñando a otros y contribuir a la comunidad universitaria.',
        materias: 'Programación I, Estructuras de Datos, Bases de Datos',
        estado: 'pendiente',
        fechaSolicitud: '2025-05-01'
      },
      { 
        id: 3, 
        nombreCompleto: 'Sofía Ramírez', 
        correo: 'sofia.ramirez@iush.edu.co', 
        semestre: '8', 
        motivo: 'Quiero adquirir experiencia docente para mi carrera.',
        materias: 'Física I, Física II, Electromagnetismo',
        estado: 'aprobado',
        fechaSolicitud: '2025-04-15'
      },
      { 
        id: 4, 
        nombreCompleto: 'Carlos Mendoza', 
        correo: 'carlos.mendoza@iush.edu.co', 
        semestre: '6', 
        motivo: 'Considero que tengo aptitudes para la enseñanza y quiero ponerlas en práctica ayudando a mis compañeros.',
        materias: 'Química General, Química Orgánica, Bioquímica',
        estado: 'rechazado',
        fechaSolicitud: '2025-04-10'
      }
    ];
    
    setSolicitudes(datosSolicitudes);
  }, []);

  // Manejador para abrir el modal de confirmación
  const handleOpenModal = (id, tipo) => {
    const config = {
      requestId: id
    };

    if (tipo === 'aprobar') {
      config.title = 'Aprobar Solicitud';
      config.message = '¿Estás seguro de que deseas aprobar esta solicitud de tutoría?';
      config.action = handleApproveRequest;
    } else {
      config.title = 'Rechazar Solicitud';
      config.message = '¿Estás seguro de que deseas rechazar esta solicitud de tutoría?';
      config.action = handleRejectRequest;
    }

    setModalConfig(config);
    setModalVisible(true);
  };

  // Manejador para cerrar el modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Manejador para confirmar la acción del modal
  const handleConfirmAction = () => {
    if (modalConfig.action) {
      modalConfig.action(modalConfig.requestId);
    }
    setModalVisible(false);
  };

  // Manejador para aprobar una solicitud
  const handleApproveRequest = (requestId) => {
    setSolicitudes(solicitudes.map(solicitud => 
      solicitud.id === requestId ? {...solicitud, estado: 'aprobado'} : solicitud
    ));
    // Aquí se podría hacer una llamada a la API para actualizar el estado en el servidor
  };

  // Manejador para rechazar una solicitud
  const handleRejectRequest = (requestId) => {
    setSolicitudes(solicitudes.map(solicitud => 
      solicitud.id === requestId ? {...solicitud, estado: 'rechazado'} : solicitud
    ));
    // Aquí se podría hacer una llamada a la API para actualizar el estado en el servidor
  };

  // Manejador para expandir/colapsar texto
  const handleExpandText = (id, field) => {
    const key = `${id}-${field}`;
    setExpandedTexts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Función para renderizar texto con opción de expandir
  const renderExpandableText = (text, id, field) => {
    const key = `${id}-${field}`;
    const isExpanded = expandedTexts[key];
    const maxLength = 50;

    if (text.length <= maxLength) {
      return text;
    }

    if (isExpanded) {
      return (
        <span>
          {text}{' '}
          <button 
            className="expand-button"
            onClick={() => handleExpandText(id, field)}
          >
            Ver menos
          </button>
        </span>
      );
    }

    return (
      <span>
        {text.substring(0, maxLength)}...{' '}
        <button 
          className="expand-button"
          onClick={() => handleExpandText(id, field)}
        >
          Ver más
        </button>
      </span>
    );
  };

  // Filtrar solicitudes según la búsqueda
  const solicitudesFiltradas = solicitudes.filter(solicitud => 
    solicitud.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
    solicitud.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    solicitud.materias.toLowerCase().includes(busqueda.toLowerCase()) ||
    solicitud.estado.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="request-dashboard">
      <div className="request-header">
        <h1>Solicitudes de Tutoría</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar solicitudes..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Correo</th>
              <th>Semestre</th>
              <th>Motivo</th>
              <th>Materias</th>
              <th>Estado</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesFiltradas.length > 0 ? (
              solicitudesFiltradas.map(solicitud => (
                <tr key={solicitud.id} className={`estado-${solicitud.estado}`}>
                  <td>{solicitud.nombreCompleto}</td>
                  <td>{solicitud.correo}</td>
                  <td>{solicitud.semestre}</td>
                  <td className="text-cell">
                    {renderExpandableText(solicitud.motivo, solicitud.id, 'motivo')}
                  </td>
                  <td>{solicitud.materias}</td>
                  <td>
                    <span className={`estado-badge ${solicitud.estado}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className="options-cell">
                    {solicitud.estado === 'pendiente' && (
                      <>
                        <button 
                          className="action-button approve"
                          onClick={() => handleOpenModal(solicitud.id, 'aprobar')}
                        >
                            <FaCheck />
                        </button>
                        <button 
                          className="action-button reject"
                          onClick={() => handleOpenModal(solicitud.id, 'rechazar')}
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    {(solicitud.estado === 'aprobado' || solicitud.estado === 'rechazado') && (
                      <span className="status-text">
                        {solicitud.estado === 'aprobado' ? 'Aprobado' : 'Rechazado'}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-results">
                  No se encontraron solicitudes con esa búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">{modalConfig.title}</h2>
            <p className="modal-message">{modalConfig.message}</p>
            <div className="modal-buttons">
              <button 
                className="modal-button cancel"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button 
                className="modal-button confirm"
                onClick={handleConfirmAction}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRequest;