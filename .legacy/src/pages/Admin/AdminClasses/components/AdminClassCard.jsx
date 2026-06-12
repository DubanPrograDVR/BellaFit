import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import AdminClassEditForm from "./AdminClassEditForm";
import AdminClassSchedulePanel from "./AdminClassSchedulePanel";

export default function AdminClassCard({
  classItem,
  classSchedules,
  classTypes,
  confirmDeleteClassId,
  confirmDeleteScheduleId,
  editForm,
  formatDate,
  formatTime,
  getScheduleCountLabel,
  getTipoBadgeClass,
  instructors,
  isEditing,
  isScheduleEditorOpen,
  onCancelEdit,
  onCloseScheduleEditor,
  onConfirmDeleteClass,
  onConfirmDeleteSchedule,
  onDeleteClass,
  onDeleteSchedule,
  onEdit,
  onEditFieldChange,
  onOpenScheduleEditor,
  onSaveEdit,
  onSaveSchedule,
  onScheduleFieldChange,
  scheduleEditor,
}) {
  const isExpanded = isScheduleEditorOpen;

  return (
    <div
      className={`admin-class-card${
        !classItem.activo && !isEditing ? " inactive" : ""
      }${isEditing ? " editing" : ""}`}>
      {isEditing ? (
        <AdminClassEditForm
          classItem={classItem}
          classTypes={classTypes}
          editForm={editForm}
          onCancel={onCancelEdit}
          onFieldChange={onEditFieldChange}
          onSave={onSaveEdit}
        />
      ) : (
        <>
          <div className="admin-class-top">
            <div className="admin-class-top-left">
              <h3 className="admin-class-name">{classItem.nombre}</h3>
              <span
                className={`admin-tipo-badge ${getTipoBadgeClass(classItem.tipo)}`}>
                {classItem.tipo}
              </span>
              {!classItem.activo && (
                <span className="admin-inactive-badge">Inactiva</span>
              )}
            </div>

            <div className="admin-class-summary-pill">
              {getScheduleCountLabel(classSchedules.length)}
            </div>
          </div>

          {classItem.descripcion && (
            <p className="admin-class-desc">{classItem.descripcion}</p>
          )}

          <div className="admin-class-meta">
            <span className="admin-class-meta-item">
              <FontAwesomeIcon icon={faUsers} />
              {classItem.capacidad} cupos
            </span>
            <span className="admin-class-meta-item">
              <FontAwesomeIcon icon={faStopwatch} />
              {classItem.duracion} min
            </span>
          </div>

          <AdminClassSchedulePanel
            classItem={classItem}
            classSchedules={classSchedules}
            confirmDeleteScheduleId={confirmDeleteScheduleId}
            formatDate={formatDate}
            formatTime={formatTime}
            instructors={instructors}
            isScheduleEditorOpen={isScheduleEditorOpen}
            onCloseScheduleEditor={onCloseScheduleEditor}
            onConfirmDeleteSchedule={onConfirmDeleteSchedule}
            onDeleteSchedule={onDeleteSchedule}
            onOpenScheduleEditor={onOpenScheduleEditor}
            onSaveSchedule={onSaveSchedule}
            onScheduleFieldChange={onScheduleFieldChange}
            scheduleEditor={scheduleEditor}
          />

          <div className="admin-actions admin-class-actions">
            {confirmDeleteClassId === classItem.id ? (
              <>
                <button
                  className="admin-btn admin-btn-danger"
                  onClick={() => onDeleteClass(classItem.id)}>
                  Confirmar
                </button>
                <button
                  className="admin-btn admin-btn-cancel"
                  onClick={() => onConfirmDeleteClass(null)}>
                  No
                </button>
              </>
            ) : (
              <>
                <button
                  className="admin-btn admin-btn-edit"
                  onClick={() => onEdit(classItem)}>
                  Editar clase
                </button>
                <button
                  className="admin-btn admin-btn-delete"
                  onClick={() => onConfirmDeleteClass(classItem.id)}>
                  Eliminar
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
