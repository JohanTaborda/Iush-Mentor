import React, { useState } from 'react';
import './CreateUser.css';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Asegúrate de importar los estilos

const CreateUser = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: 'tutor',
    program: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio';
      toast.error('El nombre de usuario es obligatorio');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
      toast.error('El correo electrónico es obligatorio');
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Formato de correo electrónico inválido';
      toast.error('El formato del correo electrónico es inválido');
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      toast.error('La contraseña es obligatoria');
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      toast.error('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      toast.error('Las contraseñas no coinciden');
      isValid = false;
    }

    if (!["tutor", "aprendiz"].includes(formData.user_type)) {
      newErrors.user_type = 'Tipo de usuario inválido';
      toast.error('Tipo de usuario inválido');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...userDataToSend } = formData;

      onSave(userDataToSend)
        .then(() => {
          toast.success('Usuario creado correctamente');
          setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            user_type: 'tutor',
            program: '',
          });
          onClose();
        })
        .catch((error) => {
          toast.error(`Error: ${error?.message || 'No se pudo crear el usuario'}`);
        });
    }
  };

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
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
              title="Solo letras"
              onChange={handleChange}
              className={errors.username ? 'error-input' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error-input' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="user_type">Tipo de Usuario</label>
            <select
              id="user_type"
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              className={errors.user_type ? 'error-input' : ''}
            >
              <option value="tutor">Tutor</option>
            </select>
            {errors.user_type && <span className="error-message">{errors.user_type}</span>}
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-button" id='button--Cancel' onClick={onClose}>Cancelar</button>
            <button type="submit" className="save-button">Guardar Usuario</button>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover
      />
    </div>
  );
};

export default CreateUser;
