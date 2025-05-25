import React, { useState, useEffect } from 'react';
import './StudenRequest.css';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentRequest = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    action: null,
    requestId: null
  });
  const [expandedTexts, setExpandedTexts] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userDelete, setUserDelete] = useState(null);
  const [textModal, setTextModal] = useState({
    visible: false,
    title: '',
    content: ''
  });

  // Cargar solicitudes desde el backend
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/tutor-requests');
        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleOpenModal = (id, tipo) => {
    const config = { requestId: id };

    if (tipo === 'aprobar') {
      config.title = 'Aprobar Solicitud';
      config.message = '¿Estás segur@ de que deseas aprobar esta solicitud de tutor?';
      config.action = handleApproveRequest;
    } else if (tipo === 'rechazar') {
      config.title = 'Rechazar Solicitud';
      config.message = '¿Estás segur@ de que deseas rechazar esta solicitud de tutor?';
      config.action = handleRejectRequest;
    } else if (tipo === 'eliminar') {
      config.title = 'Eliminar Solicitud';
      config.message = '¿Estás segur@ de que deseas eliminar esta solicitud de tutor?';
      config.action = handleDeleteRequest;
    }

    setModalConfig(config);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmAction = () => {
    if (modalConfig.action) {
      modalConfig.action(modalConfig.requestId);
    }
    setModalVisible(false);
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/tutor-requests/${requestId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setSolicitudes(solicitudes.map(s =>
          s.id === requestId ? { ...s, status: 'aprobado' } : s
        ));
      }
    } catch (error) {
      console.error('Error al aprobar solicitud:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:3000/tutor-requests/${requestId}/rechazar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setSolicitudes(prev =>
          prev.map(s =>
            s.id === requestId ? { ...s, status: 'rechazado' } : s
          )
        );
        toast.info('Solicitud rechazada');
      } else {
        console.error('Error en la respuesta del servidor al rechazar');
        toast.error('No se pudo rechazar la solicitud');
      }
    } catch (error) {
      console.error('Error al rechazar solicitud:', error);
      toast.error('Error al rechazar la solicitud');
    }
  };


const handleDeleteRequest = async (requestId) => {
  try {
    const response = await fetch(`http://localhost:3000/tutor-requests/${requestId}`, {
      method: "DELETE"
    });
    
    if (response.ok) {
      setSolicitudes(prevSolicitudes => 
        prevSolicitudes.filter(solicitud => solicitud.id !== requestId)
      );
      toast.success('Solicitud eliminada correctamente');
    } else {
      console.error('Error al eliminar la solicitud');
      toast.error('No se pudo eliminar la solicitud');
    }
  } catch (error) {
    console.error('Error al eliminar solicitud:', error);
     toast.error('Error al eliminar la solicitud');
  }
}


const handleExpandText = (id, field, text, username) => {
  // Si estamos en modo móvil o queremos forzar el modal
  setTextModal({
    visible: true,
    title: `Motivo de ${username || 'la solicitud'}`,
    content: text
  });
};

  const renderExpandableText = (text, id, field) => {
  if (!text) return '';
  const maxLength = 23;

  if (text.length <= maxLength) return text;

  return (
    <span>
      {text.substring(0, maxLength)}...{' '}
      <button 
        className="expand-button" 
        onClick={() => {
          const solicitud = solicitudes.find(s => s.id === id);
          const username = solicitud?.usuario?.username || '';
          handleExpandText(id, field, text, username);
        }}
      >
        Ver más
      </button>
    </span>
  );
};

  const solicitudesFiltradas = solicitudes.filter(solicitud =>
    (solicitud?.usuario?.username ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (solicitud?.usuario?.email ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (solicitud?.subjects ?? '').toLowerCase().includes(busqueda.toLowerCase()) ||
    (solicitud?.status ?? '').toLowerCase().includes(busqueda.toLowerCase())
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
        {isLoading ? (
          <div className='loadingComponents'>
            Cargando Solicitudes...
            <BeatLoader color="#184ea5"/>
          </div>
          
        ) : (
            <table className="requests-table">
            <thead>
              <tr>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Semestre</th>
                <th>Motivo</th>
                <th>Enfoque</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.length > 0 ? (
                solicitudesFiltradas.map(solicitud => (
                  <tr key={solicitud.id} className={`estado-${solicitud.status}`}>
                    <td>{solicitud.usuario?.username}</td>
                    <td>{solicitud.usuario?.email}</td>
                    <td>{solicitud.semester}</td>
                    <td className="text-cell">
                      {renderExpandableText(solicitud.reason, solicitud.id, 'reason')}
                    </td>
                    <td>{solicitud.subjects}</td>
                    <td>
                      <span className={`estado-badge ${solicitud.status}`}>
                        {solicitud.status}
                      </span>
                    </td>
                    <td className="options-cell">
                      {solicitud.status === 'pendiente' ? (
                        <>
                          <button
                            className="action-button approve"
                            onClick={() => handleOpenModal(solicitud.id, 'aprobar')}
                            title="Aprobar solicitud"
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="action-button reject"
                            onClick={() => handleOpenModal(solicitud.id, 'rechazar')}
                            title="Rechazar solicitud"
                          >
                            <FaTimes />
                          </button>
                        </>
                      ) : (
                        <span className="status-text">
                          {solicitud.status && (
                            <button 
                              className="action-button reject" 
                              title='Eliminar Solicitud'
                              onClick={() => handleOpenModal(solicitud.id, 'eliminar')}
                            >
                              <FaTrashAlt /> 
                            </button> 
                          )}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-results">
                    No se encontraron solicitudes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">{modalConfig.title}</h2>
            <p className="modal-message">{modalConfig.message}</p>
            <div className="modal-buttons">
              <button className="modal-button cancel" onClick={handleCloseModal}>Cancelar</button>
              <button className="modal-button confirm" onClick={handleConfirmAction}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

    {textModal.visible && (
      <div className="text-modal-overlay" onClick={() => setTextModal({...textModal, visible: false})}>
        <div className="text-modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="text-modal-header">
            <h3>{textModal.title}</h3>
            <button 
              className="text-modal-close"
              onClick={() => setTextModal({...textModal, visible: false})}
            >
              ×
            </button>
          </div>
          <div className="text-modal-content">
            {textModal.content}
          </div>
        </div>
      </div>
    )}

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
    </div>
  );
};

export default StudentRequest;
