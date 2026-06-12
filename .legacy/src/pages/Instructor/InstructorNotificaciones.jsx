import {
  faBell,
  faBirthdayCake,
  faCalendarCheck,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInstructorNotificaciones } from "../../hooks/useInstructorNotificaciones";

// ── Helpers de formato ──

function formatFecha(fecha) {
  if (!fecha) return "";
  const [y, m, d] = fecha.split("-");
  return `${d}/${m}/${y}`;
}

function formatHora(hora) {
  if (!hora) return "";
  return hora.slice(0, 5);
}

function timeAgo(createdAt) {
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora mismo";
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

// ── Componente ──

export default function InstructorNotificaciones() {
  const {
    birthdays,
    schedules,
    newScheduleIds,
    loadingBirthdays,
    loadingSchedules,
  } = useInstructorNotificaciones();

  return (
    <div className="inst-notif-page">
      {/* Header */}
      <div className="inst-header">
        <div>
          <h2 className="inst-title">
            <span className="inst-title-icon">
              <FontAwesomeIcon icon={faBell} />
            </span>
            Notificaciones
          </h2>
          <p className="inst-subtitle">
            Clases asignadas y cumpleaños próximos de alumnas
          </p>
        </div>
      </div>

      {/* Grid de secciones */}
      <div className="inst-notif-grid">
        {/* ── Sección: Clases asignadas ── */}
        <section className="inst-notif-section">
          <div className="inst-notif-section-header">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="inst-notif-section-icon"
            />
            <span className="inst-notif-section-title">Clases Asignadas</span>
            {schedules.length > 0 && (
              <span className="inst-notif-count">{schedules.length}</span>
            )}
          </div>

          {loadingSchedules ? (
            <p className="inst-loading-page">Cargando clases…</p>
          ) : schedules.length === 0 ? (
            <div className="inst-notif-empty">
              <FontAwesomeIcon icon={faCalendarDays} />
              <p>No tienes clases asignadas aún</p>
            </div>
          ) : (
            <ul className="inst-notif-list">
              {schedules.map((s) => (
                <li
                  key={s.id}
                  className={`inst-notif-item${newScheduleIds.has(s.id) ? " inst-notif-item--new" : ""}`}>
                  <div className="inst-notif-item-body">
                    <span className="inst-notif-item-name">
                      {s.classes?.nombre || "Clase"}
                    </span>
                    {s.classes?.tipo && (
                      <span className="inst-notif-tipo">{s.classes.tipo}</span>
                    )}
                    <span className="inst-notif-item-date">
                      <FontAwesomeIcon icon={faCalendarDays} />
                      {formatFecha(s.fecha)} · {formatHora(s.hora_inicio)}
                    </span>
                  </div>
                  <div className="inst-notif-item-meta">
                    {newScheduleIds.has(s.id) && (
                      <span className="inst-notif-badge-new">NUEVO</span>
                    )}
                    <span className="inst-notif-time">
                      {timeAgo(s.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ── Sección: Cumpleaños próximos ── */}
        <section className="inst-notif-section">
          <div className="inst-notif-section-header">
            <FontAwesomeIcon
              icon={faBirthdayCake}
              className="inst-notif-section-icon inst-notif-section-icon--birthday"
            />
            <span className="inst-notif-section-title">
              Cumpleaños Próximos
            </span>
            {birthdays.length > 0 && (
              <span className="inst-notif-count inst-notif-count--birthday">
                {birthdays.length}
              </span>
            )}
          </div>

          {loadingBirthdays ? (
            <p className="inst-loading-page">Cargando cumpleaños…</p>
          ) : birthdays.length === 0 ? (
            <div className="inst-notif-empty">
              <FontAwesomeIcon icon={faBirthdayCake} />
              <p>Sin cumpleaños en los próximos 7 días</p>
            </div>
          ) : (
            <ul className="inst-notif-list">
              {birthdays.map((b) => (
                <li key={b.id} className="inst-notif-item">
                  <div className="inst-notif-item-body">
                    <span className="inst-notif-item-name">{b.nombre}</span>
                  </div>
                  <div className="inst-notif-item-meta">
                    {b.daysUntil === 0 ? (
                      <span className="inst-notif-badge-today">¡Hoy! 🎂</span>
                    ) : (
                      <span className="inst-notif-days">
                        en {b.daysUntil} día{b.daysUntil !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
