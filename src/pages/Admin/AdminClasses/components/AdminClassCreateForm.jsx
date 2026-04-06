export default function AdminClassCreateForm({
  classTypes,
  createForm,
  createScheduleForm,
  instructors,
  onCreateFieldChange,
  onScheduleFieldChange,
  onCreate,
  onCancel,
}) {
  return (
    <div className="admin-create-form">
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={createForm.nombre}
            onChange={(event) =>
              onCreateFieldChange("nombre", event.target.value)
            }
            placeholder="Ej: Bungee Power"
          />
        </div>

        <div className="admin-form-group">
          <label>Tipo</label>
          <select
            value={createForm.tipo}
            onChange={(event) =>
              onCreateFieldChange("tipo", event.target.value)
            }>
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
            value={createForm.capacidad}
            onChange={(event) =>
              onCreateFieldChange("capacidad", event.target.value)
            }
            placeholder="20"
          />
        </div>

        <div className="admin-form-group">
          <label>Duración (min)</label>
          <input
            type="number"
            min="1"
            value={createForm.duracion}
            onChange={(event) =>
              onCreateFieldChange("duracion", event.target.value)
            }
            placeholder="60"
          />
        </div>

        <div className="admin-form-group admin-form-full">
          <label>Descripción</label>
          <textarea
            value={createForm.descripcion}
            onChange={(event) =>
              onCreateFieldChange("descripcion", event.target.value)
            }
            placeholder="Descripción de la clase"
            rows={2}
          />
        </div>
      </div>

      <div className="admin-inline-panel">
        <div className="admin-inline-panel-header">
          <p className="admin-inline-panel-kicker">Opcional</p>
          <h3>Primera fecha</h3>
          <p>Puedes programar la primera fecha ahora o hacerlo después.</p>
        </div>

        <div className="admin-form-grid admin-schedule-grid">
          <div className="admin-form-group">
            <label>Fecha</label>
            <input
              type="date"
              value={createScheduleForm.fecha}
              onChange={(event) =>
                onScheduleFieldChange("fecha", event.target.value)
              }
            />
          </div>

          <div className="admin-form-group">
            <label>Hora inicio</label>
            <input
              type="time"
              value={createScheduleForm.hora_inicio}
              onChange={(event) =>
                onScheduleFieldChange("hora_inicio", event.target.value)
              }
            />
          </div>

          <div className="admin-form-group">
            <label>Hora fin</label>
            <input
              type="time"
              value={createScheduleForm.hora_fin}
              onChange={(event) =>
                onScheduleFieldChange("hora_fin", event.target.value)
              }
            />
          </div>

          <div className="admin-form-group">
            <label>Instructora</label>
            <select
              value={createScheduleForm.instructor_id}
              onChange={(event) =>
                onScheduleFieldChange("instructor_id", event.target.value)
              }>
              <option value="">Sin asignar</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-save" onClick={onCreate}>
          Crear clase
        </button>
        <button className="admin-btn admin-btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
