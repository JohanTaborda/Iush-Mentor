import React, { useState, useEffect } from 'react';
import './StudenRequest.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

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

  // Cargar solicitudes desde el backend
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch('http://localhost:3000/tutor-requests');
        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al cargar solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleOpenModal = (id, tipo) => {
    const config = { requestId: id };

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
    } else {
      console.error('Error en la respuesta del servidor al rechazar');
    }
  } catch (error) {
    console.error('Error al rechazar solicitud:', error);
  }
};


  const handleExpandText = (id, field) => {
    const key = `${id}-${field}`;
    setExpandedTexts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderExpandableText = (text, id, field) => {
    const key = `${id}-${field}`;
    const isExpanded = expandedTexts[key];
    const maxLength = 50;

    if (!text) return '';
    if (text.length <= maxLength) return text;

    return isExpanded ? (
      <span>
        {text}{' '}
        <button className="expand-button" onClick={() => handleExpandText(id, field)}>Ver menos</button>
      </span>
    ) : (
      <span>
        {text.substring(0, maxLength)}...{' '}
        <button className="expand-button" onClick={() => handleExpandText(id, field)}>Ver más</button>
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
                        {solicitud.status === 'aprobado' ? 'Aprobado' : 'Rechazado'}
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
    </div>
  );
};

export default StudentRequest;
