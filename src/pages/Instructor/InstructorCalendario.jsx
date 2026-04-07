import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faUsers,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useInstructorCalendario } from "../../hooks/useInstructorCalendario";
import "./InstructorPages.css";

const tipoBadge = {
  bungee: "tipo-bungee",
  yoga: "tipo-yoga",
  pilates: "tipo-pilates",
  funcional: "tipo-funcional",
  otro: "tipo-otro",
};

export default function InstructorCalendario() {
  const {
    loading,
    grupos,
    tipos,
    filterTipo,
    setFilterTipo,
    expandedId,
    toggleExpand,
    reservations,
    loadingReservations,
  } = useInstructorCalendario();

  if (loading)
    return <div className="inst-loading-page">Cargando calendario…</div>;

  return (
    <div className="inst-calendario">
      <div className="inst-header">
        <div>
          <h1 className="inst-title">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="inst-title-icon"
            />
            Mi Calendario
          </h1>
          <p className="inst-subtitle">Tus próximas clases programadas</p>
        </div>
        <div className="inst-filters">
          <select
            value={filterTipo}
            onChange={(e) => setFilterTipo(e.target.value)}
            className="inst-select">
            <option value="todos">Todas las clases</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {grupos.length === 0 && (
        <div className="inst-empty">
          No tienes clases programadas próximamente.
        </div>
      )}

      {grupos.map((grupo) => (
        <div key={grupo.label} className="inst-grupo">
          <h2 className="inst-grupo-label">{grupo.label}</h2>
          <div className="inst-cards-grid">
            {grupo.items.map((s) => {
              const capacidad = s.classes?.capacidad || 0;
              const ocupados = capacidad - (s.cupos_disponibles ?? 0);
              const pct = capacidad > 0 ? (ocupados / capacidad) * 100 : 0;
              const isExpanded = expandedId === s.id;

              return (
                <div key={s.id} className="inst-cal-card">
                  <div
                    className="inst-cal-card-main"
                    onClick={() => toggleExpand(s.id)}>
                    <div className="inst-cal-card-top">
                      <span className="inst-cal-nombre">
                        {s.classes?.nombre}
                      </span>
                      <span
                        className={`inst-tipo-badge ${tipoBadge[s.classes?.tipo] || "tipo-otro"}`}>
                        {s.classes?.tipo}
                      </span>
                    </div>
                    <div className="inst-cal-card-info">
                      <span>
                        <FontAwesomeIcon icon={faClock} />{" "}
                        {s.hora_inicio?.slice(0, 5)} – {s.hora_fin?.slice(0, 5)}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faCalendarDays} />{" "}
                        {new Date(s.fecha + "T12:00:00").toLocaleDateString(
                          "es-CL",
                          { weekday: "short", day: "numeric", month: "short" },
                        )}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faUsers} /> {ocupados}/
                        {capacidad}
                      </span>
                    </div>
                    <div className="inst-ocupacion-bar">
                      <div
                        className={`inst-ocupacion-fill ${pct >= 90 ? "full" : pct >= 60 ? "mid" : ""}`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                    <span className="inst-expand-icon">
                      <FontAwesomeIcon
                        icon={isExpanded ? faChevronUp : faChevronDown}
                      />
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="inst-cal-card-detail">
                      <h4>
                        Alumnas inscritas (
                        {
                          reservations.filter((r) => r.estado !== "cancelada")
                            .length
                        }
                        )
                      </h4>
                      {loadingReservations ? (
                        <p className="inst-loading-small">Cargando…</p>
                      ) : reservations.filter((r) => r.estado !== "cancelada")
                          .length === 0 ? (
                        <p className="inst-empty-small">
                          Sin inscripciones aún
                        </p>
                      ) : (
                        <ul className="inst-alumnas-list">
                          {reservations
                            .filter((r) => r.estado !== "cancelada")
                            .map((r) => (
                              <li key={r.id}>
                                <span className="inst-alumna-nombre">
                                  {r.profiles?.nombre}
                                </span>
                                <span
                                  className={`inst-estado-badge estado-${r.estado}`}>
                                  {r.estado}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
