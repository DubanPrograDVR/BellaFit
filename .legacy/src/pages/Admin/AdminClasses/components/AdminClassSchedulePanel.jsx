import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";

export default function AdminClassSchedulePanel({
  classItem,
  classSchedules,
  confirmDeleteScheduleId,
  formatDate,
  formatTime,
  instructors,
  isScheduleEditorOpen,
  onCloseScheduleEditor,
  onConfirmDeleteSchedule,
  onDeleteSchedule,
  onOpenScheduleEditor,
  onSaveSchedule,
  onScheduleFieldChange,
  scheduleEditor,
}) {
  return (
    <div className="admin-class-schedule-panel">
      <div className="admin-class-section-head">
        <h4>
          Agenda
          {classSchedules.length > 0 && (
            <span className="admin-schedule-count">
              — {classSchedules.length} fecha
              {classSchedules.length !== 1 && "s"}
            </span>
          )}
        </h4>

        <button
          className="admin-btn admin-btn-edit"
          onClick={() => onOpenScheduleEditor(classItem.id)}>
          + Agregar
        </button>
      </div>

      {classSchedules.length === 0 ? (
        <p className="admin-class-schedule-empty">Sin fechas programadas.</p>
      ) : (
        <div className="admin-schedule-list">
          {classSchedules.map((schedule) => {
            const occupied = Math.max(
              classItem.capacidad -
                (schedule.cupos_disponibles ?? classItem.capacidad),
              0,
            );

            return (
              <div key={schedule.id} className="admin-schedule-item">
                <div className="admin-schedule-item-content">
                  <span className="admin-schedule-chip">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    {formatDate(schedule.fecha)}
                  </span>

                  <span className="admin-schedule-time">
                    <FontAwesomeIcon icon={faClock} />
                    {formatTime(schedule.hora_inicio)} –{" "}
                    {formatTime(schedule.hora_fin)}
                  </span>

                  <span className="admin-schedule-meta-sep">·</span>

                  <span className="admin-schedule-instructor">
                    {schedule.instructor?.nombre || "Sin instructora"}
                  </span>

                  <span className="admin-schedule-occupancy">
                    {occupied}/{classItem.capacidad}
                  </span>
                </div>

                <div className="admin-actions admin-schedule-actions">
                  {confirmDeleteScheduleId === schedule.id ? (
                    <>
                      <button
                        className="admin-btn admin-btn-danger"
                        onClick={() => onDeleteSchedule(schedule.id)}>
                        Sí
                      </button>
                      <button
                        className="admin-btn admin-btn-cancel"
                        onClick={() => onConfirmDeleteSchedule(null)}>
                        No
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="admin-btn admin-btn-edit"
                        onClick={() =>
                          onOpenScheduleEditor(classItem.id, schedule)
                        }>
                        Editar
                      </button>
                      <button
                        className="admin-btn admin-btn-delete"
                        onClick={() => onConfirmDeleteSchedule(schedule.id)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isScheduleEditorOpen && (
        <div className="admin-schedule-editor">
          <p className="admin-schedule-editor-title">
            {scheduleEditor.scheduleId ? "Editar fecha" : "Nueva fecha"} —{" "}
            {classItem.nombre}
          </p>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={scheduleEditor.form.fecha}
                onChange={(event) =>
                  onScheduleFieldChange("fecha", event.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Hora inicio</label>
              <input
                type="time"
                value={scheduleEditor.form.hora_inicio}
                onChange={(event) =>
                  onScheduleFieldChange("hora_inicio", event.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Hora fin</label>
              <input
                type="time"
                value={scheduleEditor.form.hora_fin}
                onChange={(event) =>
                  onScheduleFieldChange("hora_fin", event.target.value)
                }
              />
            </div>

            <div className="admin-form-group">
              <label>Instructora</label>
              <select
                value={scheduleEditor.form.instructor_id}
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

          <div className="admin-actions">
            <button
              className="admin-btn admin-btn-save"
              onClick={() => onSaveSchedule(classItem)}>
              {scheduleEditor.scheduleId ? "Guardar" : "Agregar"}
            </button>
            <button
              className="admin-btn admin-btn-cancel"
              onClick={onCloseScheduleEditor}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
