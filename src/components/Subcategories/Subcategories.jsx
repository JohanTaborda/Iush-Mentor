// Importa React y el archivo de estilos CSS específico para el componente
import React from "react";
import "../Subcategories/Subcategories.css";

// Componente funcional que recibe props: título, descripción e ícono
const Subcategories = ({ title, description, icon }) => {
  return (
    // Tarjeta principal de subcategoría
    <div className="subcategory-card">
      
      {/* Encabezado: ícono y título del programa */}
      <div className="subcategory-card__header">
        <span className="subcategory-card__icon">{icon}</span>
        <h3 className="subcategory-card__title">{title}</h3>
      </div>
      
      {/* Descripción breve del programa */}
      <p className="subcategory-card__description">{description}</p>
      
      {/* Botón para ver tutorías disponibles (a futuro será funcional) */}
      <button className="subcategory-card__button">Ver tutorías</button>
    </div>
  );
};

// Exporta el componente para que pueda usarse en otros archivos
export default Subcategories;
