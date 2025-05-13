import React from 'react';
import './ModalDelete.css';

const ModalDelete = ({ title, description, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-dialog-backdrop">
      <div className="delete-dialog-wrapper">
        <div className="delete-dialog-head">
          <h2>{title}</h2>
        </div>
        
        <div className="delete-dialog-content">
          <p>{description}</p>
        </div>
        
        <div className="delete-dialog-actions">
          <button className="delete-dialog-btn-secondary" onClick={onCancel}> Cancelar </button>
          <button className="delete-dialog-btn-primary" onClick={onConfirm}> Confirmar  </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;