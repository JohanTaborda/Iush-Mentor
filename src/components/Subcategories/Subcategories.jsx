// Importa React para poder usar JSX y componentes
import React from "react";

// Importa los estilos específicos del componente
import "../Subcategories/Subcategories.css";

// Componente funcional que representa una tarjeta de subcategoría
// Recibe props: título, descripción, ícono y una función onClick
const Subcategories = ({ title, description, icon, onClick }) => {
  return (
    <div className="subcategory-card">
      <div className="subcategory-card__header">
        {/* Renderiza dinámicamente el ícono usando React.createElement */}
        <span className="subcategory-card__icon">
          {React.createElement(icon)}
        </span>

        {/* Muestra el título de la subcategoría */}
        <h3 className="subcategory-card__title">{title}</h3>
      </div>

      {/* Muestra la descripción de la subcategoría */}
      <p className="subcategory-card__description">{description}</p>

      {/* Botón que ejecuta la función onClick al hacer clic */}
      <button className="subcategory-card__button" onClick={onClick}>
        Ver tutorías
      </button>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otras partes de la app
export default Subcategories;
