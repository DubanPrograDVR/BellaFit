import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faDumbbell,
  faPercent,
  faUsers,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useInstructorEstadisticas } from "../../hooks/useInstructorEstadisticas";
import "./InstructorPages.css";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="inst-stat-card">
      <div className={`inst-stat-icon ${color}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="inst-stat-info">
        <span className="inst-stat-value">{value}</span>
        <span className="inst-stat-label">{label}</span>
      </div>
    </div>
  );
}

export default function InstructorEstadisticas() {
  const { loading, stats } = useInstructorEstadisticas();

  if (loading)
    return <div className="inst-loading-page">Cargando estadísticas…</div>;
  if (!stats)
    return (
      <div className="inst-empty">No se pudieron cargar las estadísticas.</div>
    );

  return (
    <div className="inst-estadisticas">
      <div className="inst-header">
        <div>
          <h1 className="inst-title">
            <FontAwesomeIcon icon={faChartBar} className="inst-title-icon" />
            Estadísticas
          </h1>
          <p className="inst-subtitle">Resumen de tus últimos 30 días</p>
        </div>
      </div>

      <div className="inst-stats-grid">
        <StatCard
          icon={faDumbbell}
          label="Clases impartidas"
          value={stats.totalClases}
          color="inst-icon-clases"
        />
        <StatCard
          icon={faPercent}
          label="Tasa de asistencia"
          value={`${stats.tasaAsistencia}%`}
          color="inst-icon-asistencia"
        />
        <StatCard
          icon={faUsers}
          label="Alumnas únicas"
          value={stats.alumnosUnicos}
          color="inst-icon-alumnas"
        />
        <StatCard
          icon={faCalendarCheck}
          label="Próxima clase"
          value={stats.proximaClase ? stats.proximaClase.classes?.nombre : "—"}
          color="inst-icon-proxima"
        />
      </div>

      {stats.resumen.length > 0 && (
        <div className="inst-resumen-card">
          <h2 className="inst-resumen-title">Resumen por clase</h2>
          <div className="inst-resumen-table-wrap">
            <table className="inst-resumen-table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Sesiones</th>
                  <th>Inscritas</th>
                  <th>Asistieron</th>
                  <th>% Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {stats.resumen.map((r) => {
                  const pct =
                    r.inscritas > 0
                      ? Math.round((r.asistieron / r.inscritas) * 100)
                      : 0;
                  return (
                    <tr key={r.nombre}>
                      <td className="inst-resumen-nombre">{r.nombre}</td>
                      <td>{r.clases}</td>
                      <td>{r.inscritas}</td>
                      <td>{r.asistieron}</td>
                      <td>
                        <div className="inst-pct-cell">
                          <div className="inst-pct-bar">
                            <div
                              className={`inst-pct-fill ${pct >= 80 ? "high" : pct >= 50 ? "mid" : "low"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
