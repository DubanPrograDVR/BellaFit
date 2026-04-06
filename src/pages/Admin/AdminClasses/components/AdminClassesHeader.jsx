export default function AdminClassesHeader({
  totalClasses,
  showCreate,
  onToggleCreate,
}) {
  return (
    <div className="admin-classes-header">
      <div>
        <h2 className="admin-page-title">Gestión de Clases</h2>
        <p className="admin-page-subtitle">
          {totalClasses} clase{totalClasses !== 1 && "s"} registradas
        </p>
      </div>

      <button className="admin-btn-primary" onClick={onToggleCreate}>
        {showCreate ? "Cancelar" : "+ Nueva Clase"}
      </button>
    </div>
  );
}
