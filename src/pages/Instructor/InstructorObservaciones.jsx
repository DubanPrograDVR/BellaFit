import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNoteSticky,
  faTrash,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useInstructorObservaciones } from "../../hooks/useInstructorObservaciones";
import "./InstructorPages.css";

export default function InstructorObservaciones() {
  const {
    loading,
    loadingObs,
    schedules,
    selectedSchedule,
    selectSchedule,
    selected,
    observations,
    newNote,
    setNewNote,
    saving,
    addObservation,
    removeObservation,
  } = useInstructorObservaciones();

  if (loading) return <div className="inst-loading-page">Cargando…</div>;

  return (
    <div className="inst-observaciones">
      <div className="inst-header">
        <div>
          <h1 className="inst-title">
            <FontAwesomeIcon icon={faNoteSticky} className="inst-title-icon" />
            Observaciones
          </h1>
          <p className="inst-subtitle">Notas internas sobre tus clases</p>
        </div>
      </div>

      <div className="inst-select-wrap">
        <label className="inst-label">Selecciona una clase</label>
        <select
          value={selectedSchedule || ""}
          onChange={(e) => selectSchedule(e.target.value || null)}
          className="inst-select inst-select-full">
          <option value="">— Seleccionar —</option>
          {schedules.map((s) => (
            <option key={s.id} value={s.id}>
              {s.classes?.nombre} —{" "}
              {new Date(s.fecha + "T12:00:00").toLocaleDateString("es-CL", {
                day: "numeric",
                month: "short",
              })}{" "}
              {s.hora_inicio?.slice(0, 5)}
            </option>
          ))}
        </select>
      </div>

      {selectedSchedule && (
        <>
          {selected && (
            <div className="inst-sel-info">
              <strong>{selected.classes?.nombre}</strong>
              <span>
                {new Date(selected.fecha + "T12:00:00").toLocaleDateString(
                  "es-CL",
                  { weekday: "long", day: "numeric", month: "long" },
                )}{" "}
                · {selected.hora_inicio?.slice(0, 5)} –{" "}
                {selected.hora_fin?.slice(0, 5)}
              </span>
            </div>
          )}

          <div className="inst-obs-form">
            <textarea
              className="inst-textarea"
              placeholder='Escribe una observación… Ej: "María tiene lesión en rodilla izquierda"'
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
            <button
              className="inst-btn"
              onClick={addObservation}
              disabled={saving || !newNote.trim()}>
              <FontAwesomeIcon icon={faPaperPlane} />{" "}
              {saving ? "Guardando…" : "Guardar"}
            </button>
          </div>

          {loadingObs ? (
            <div className="inst-loading-page">Cargando observaciones…</div>
          ) : observations.length === 0 ? (
            <div className="inst-empty">
              No hay observaciones para esta clase aún.
            </div>
          ) : (
            <div className="inst-obs-list">
              {observations.map((obs) => (
                <div key={obs.id} className="inst-obs-card">
                  <p className="inst-obs-text">{obs.contenido}</p>
                  <div className="inst-obs-footer">
                    <span className="inst-obs-date">
                      {new Date(obs.created_at).toLocaleDateString("es-CL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <button
                      className="inst-btn-delete"
                      onClick={() => removeObservation(obs.id)}
                      title="Eliminar">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
