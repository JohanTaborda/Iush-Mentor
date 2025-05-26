import React from "react";
import "../Subcategories/Subcategories.css";

// Componente funcional que representa una tarjeta de subcategoría
const Subcategories = ({ title, description, icon, onClick }) => {
  return (
    <div className="subcategory-card">
      <div className="subcategory-card__header">
        <span className="subcategory-card__icon">
          {React.createElement(icon)}
        </span>
        <h3 className="subcategory-card__title">{title}</h3>
      </div>
      <p className="subcategory-card__description">{description}</p>
      <button className="subcategory-card__button" onClick={onClick}>
        Ver tutorías
      </button>
    </div>
  );
};

export default Subcategories;
