export default function AdminClassEditForm({
  classItem,
  classTypes,
  editForm,
  onFieldChange,
  onSave,
  onCancel,
}) {
  return (
    <div className="admin-class-edit">
      <div className="admin-class-edit-header">
        <p className="admin-inline-panel-kicker">Editando</p>
        <h3 className="admin-class-edit-title">{classItem.nombre}</h3>
      </div>

      <div className="admin-form-grid admin-class-edit-grid">
        <div className="admin-form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={editForm.nombre || ""}
            onChange={(event) => onFieldChange("nombre", event.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>Tipo</label>
          <select
            value={editForm.tipo || "bungee"}
            onChange={(event) => onFieldChange("tipo", event.target.value)}>
            {classTypes.map((classType) => (
              <option key={classType} value={classType}>
                {classType.charAt(0).toUpperCase() + classType.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Capacidad</label>
          <input
            type="number"
            min="1"
            value={editForm.capacidad || ""}
            onChange={(event) => onFieldChange("capacidad", event.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>Duración (min)</label>
          <input
            type="number"
            min="1"
            value={editForm.duracion || ""}
            onChange={(event) => onFieldChange("duracion", event.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>Estado</label>
          <select
            value={editForm.activo ? "true" : "false"}
            onChange={(event) =>
              onFieldChange("activo", event.target.value === "true")
            }>
            <option value="true">Activa</option>
            <option value="false">Inactiva</option>
          </select>
        </div>

        <div className="admin-form-group admin-form-full">
          <label>Descripción</label>
          <textarea
            value={editForm.descripcion || ""}
            onChange={(event) =>
              onFieldChange("descripcion", event.target.value)
            }
            rows={2}
          />
        </div>
      </div>

      <div className="admin-actions admin-class-edit-actions">
        <button className="admin-btn admin-btn-save" onClick={onSave}>
          Guardar
        </button>
        <button className="admin-btn admin-btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
