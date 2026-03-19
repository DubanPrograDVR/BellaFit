import { formatDate } from "./utils";
import useResumen from "./hooks/useResumen";

export default function Resumen({ profile, dbProfile }) {
  const { stats } = useResumen();

  return (
    <div className="perfil-resumen">
      <div className="perfil-resumen-header">
        <div className="perfil-avatar-lg">
          {profile.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2>{profile.nombre}</h2>
          <p className="perfil-email">{dbProfile.email}</p>
          <span className="perfil-plan-badge">
            {dbProfile.roles?.nombre || "cliente"}
          </span>
        </div>
      </div>

      <div className="perfil-info-grid">
        <div className="perfil-info-item">
          <span className="perfil-info-label">Teléfono</span>
          <span className="perfil-info-value">{profile.telefono}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Dirección</span>
          <span className="perfil-info-value">{profile.direccion}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">RUT</span>
          <span className="perfil-info-value">{dbProfile.rut || "—"}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Fecha de nacimiento</span>
          <span className="perfil-info-value">
            {dbProfile.fecha_nacimiento
              ? formatDate(dbProfile.fecha_nacimiento)
              : "—"}
          </span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Miembro desde</span>
          <span className="perfil-info-value">
            {formatDate(dbProfile.created_at)}
          </span>
        </div>
      </div>

      <div className="perfil-stats">
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{stats.comprasActivasCount}</span>
          <span className="perfil-stat-label">Compras activas</span>
        </div>
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{stats.comprasPasadasCount}</span>
          <span className="perfil-stat-label">Compras pasadas</span>
        </div>
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{stats.pagosCount}</span>
          <span className="perfil-stat-label">Pagos realizados</span>
        </div>
      </div>
    </div>
  );
}
