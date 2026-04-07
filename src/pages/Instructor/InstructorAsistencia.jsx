import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faCheck,
  faXmark,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { useInstructorAsistencia } from "../../hooks/useInstructorAsistencia";
import "./InstructorPages.css";

export default function InstructorAsistencia() {
  const {
    loading,
    loadingRes,
    schedules,
    selectedSchedule,
    selectSchedule,
    selected,
    reservations,
    markAttendance,
    markAllAttended,
  } = useInstructorAsistencia();

  if (loading) return <div className="inst-loading-page">Cargando…</div>;

  const pendientes = reservations.filter((r) => r.estado === "confirmada");

  return (
    <div className="inst-asistencia">
      <div className="inst-header">
        <div>
          <h1 className="inst-title">
            <FontAwesomeIcon
              icon={faClipboardCheck}
              className="inst-title-icon"
            />
            Asistencia
          </h1>
          <p className="inst-subtitle">Registra la asistencia de tus alumnas</p>
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

          {pendientes.length > 0 && (
            <button className="inst-btn inst-btn-all" onClick={markAllAttended}>
              <FontAwesomeIcon icon={faCheckDouble} /> Marcar todas como
              asistidas ({pendientes.length})
            </button>
          )}

          {loadingRes ? (
            <div className="inst-loading-page">Cargando reservas…</div>
          ) : reservations.length === 0 ? (
            <div className="inst-empty">
              No hay alumnas inscritas en esta clase.
            </div>
          ) : (
            <div className="inst-attendance-list">
              {reservations
                .filter((r) => r.estado !== "cancelada")
                .map((r) => (
                  <div key={r.id} className="inst-attendance-row">
                    <div className="inst-attendance-info">
                      <span className="inst-alumna-nombre">
                        {r.profiles?.nombre}
                      </span>
                      <span className="inst-alumna-email">
                        {r.profiles?.email}
                      </span>
                    </div>
                    <div className="inst-attendance-actions">
                      <span className={`inst-estado-badge estado-${r.estado}`}>
                        {r.estado}
                      </span>
                      {r.estado === "confirmada" && (
                        <>
                          <button
                            className="inst-btn-att inst-btn-ok"
                            onClick={() => markAttendance(r.id, "asistida")}
                            title="Asistió">
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button
                            className="inst-btn-att inst-btn-no"
                            onClick={() => markAttendance(r.id, "no_asistio")}
                            title="No asistió">
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </>
                      )}
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
