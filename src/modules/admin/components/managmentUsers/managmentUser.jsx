import React, { useState } from 'react';
import CreateUser from '../createUser/CreateUser';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCreateUser = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Usuario creado con éxito");
        setShowModal(false);
        // Puedes recargar la lista de usuarios aquí si ya la tienes
      } else {
        toast.error(data.error || "No se pudo crear el usuario");
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <div className="user-management">
      <h2>Gestión de Usuarios</h2>
      <button onClick={() => setShowModal(true)}>Crear Nuevo Tutor</button>

    </div>
  );
};

export default UserManagement;

