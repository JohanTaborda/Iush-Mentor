import React, { useState } from 'react';
import './CreateUser.css';
import { FaTimes } from 'react-icons/fa';

const CreateUser = ({ isOpen, onClose, onSave }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    rol: 'estudiante'
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.nombreCompleto.trim()) {
      newErrors.nombreCompleto = 'El nombre completo es obligatorio';
    }
    
    // Validar correo
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Formato de correo electrónico inválido';
    }
    
    // Validar contraseña
    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      // Limpiar el formulario después de guardar
      setFormData({
        nombreCompleto: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        rol: 'estudiante'
      });
    }
  };

  // Si no está abierto, no renderizar
  if (!isOpen) return null;

  return (
    <div className="create-user-overlay">
      <div className="create-user-modal">
        <div className="create-user-header">
          <h2>Crear Nuevo Usuario</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="create-user-form">
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre Completo</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              className={errors.nombreCompleto ? 'error-input' : ''}
            />
            {errors.nombreCompleto && <span className="error-message">{errors.nombreCompleto}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error-input' : ''}
            />
            {errors.correo && <span className="error-message">{errors.correo}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className={errors.contrasena ? 'error-input' : ''}
            />
            {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              className={errors.confirmarContrasena ? 'error-input' : ''}
            />
            {errors.confirmarContrasena && <span className="error-message">{errors.confirmarContrasena}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="rol">Rol del Usuario</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
            >
              <option value="estudiante">Estudiante</option>
              <option value="tutor">Tutor</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          
          <div className="form-buttons">
            <button type="button" className="cancel-button" onClick={onClose}> Cancelar </button>
            <button type="submit" className="save-button"> Guardar Usuario </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;