import React from 'react';
import './ModalStudents.css';

const ModalStudents = ({ students, onClose }) => {
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h3 className="modal-title">Estudiantes inscritos</h3>
        <ul className="students-list">
          {students.length > 0 ? (
            students.map(enr => (
              <li key={enr.id}>
                <strong>{enr.aprendiz?.username}</strong> - {enr.aprendiz?.email}
              </li>
            ))
          ) : (
            <p>No hay estudiantes inscritos.</p>
          )}
        </ul>
        <div className="modal-button-container">
          <button className="custom-close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalStudents;