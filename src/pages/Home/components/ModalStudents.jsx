import './ModalStudents.css';

const ModalStudents = ({ students, onClose }) => {
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h3 className="modal-title">Estudiantes inscritos</h3>

        {students.length > 0 ? (
          <>
            <p className="students-count">{students.length} estudiante{students.length > 1 ? 's' : ''} inscrito{students.length > 1 ? 's' : ''}:</p>
            <ul className="students-list">
              {students.map((enr, index) => (
                <li key={enr.id}>
                  {index + 1}. <strong>{enr.aprendiz?.username}</strong> - {enr.aprendiz?.email}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No hay estudiantes inscritos.</p>
        )}

        <div className="modal-button-container">
          <button className="custom-close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalStudents;