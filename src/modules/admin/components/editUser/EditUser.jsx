import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { TextField, MenuItem, Select, FormControl } from '@mui/material';

const EditUser = ({ isOpen, onClose, onSave, userData }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    program: '',
    user_type: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        program: userData.program || '',
        user_type: userData.user_type || ''
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(userData.id, formData);
    };

  if (!isOpen) return null;

  // Lista de programas académicos
  const programas = [ "Selecciona un programa", "Administración de empresas", "Comunicación Organizacional", "Contaduría Pública", "Derecho",
        "Mercadeo", "Negocios Internacionales", "Tecnología en gestión del talento humano", "Tecnología en gestión empresarial", "Tecnología en Gestión de Mercadeo y Ventas",
        "Tecnología en gestión de negocios internacionales","Animación", "Ingeniería Electrónica", "Ingeniería Industrial", "Ingeniería de Sistemas", "Diseño Gráfico",
        "Diseño de Modas", "Tecnología en sistemas", "Realización y producción musical", "Ingeniería en inteligencia de negocios"
  ];

  return (
    <div className="edit-user-overlay">
      <div className="edit-user-content">
        <div className="edit-user-header">
          <h2>Editar Usuario</h2>
          <button className="edit-user-close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="edit-user-form-group">
            <label htmlFor="username">Nombre Completo</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="edit-user-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="edit-user-form-group">
            <label htmlFor="program">Programa</label>
            <FormControl fullWidth variant="outlined" className="edit-user-select">
              <Select
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Selecciona un programa' }}
                className="select-program"
              >
                <MenuItem value="" disabled>
                  <em>Selecciona un programa</em>
                </MenuItem>
                {programas.map((programa) => (
                  <MenuItem key={programa} value={programa}>
                    {programa}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          
        <div className="edit-user-form-group">
            <label htmlFor="user_type">Rol</label>
            <select
                id="user_type"
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                required
            >
                <option value="">Selecciona un rol</option>
                <option value="aprendiz">Aprendiz</option>
                <option value="tutor">Tutor</option>
            </select>
        </div>
          
          <div className="edit-user-actions">
            <button type="button" className="edit-user-cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="edit-user-save-btn">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;