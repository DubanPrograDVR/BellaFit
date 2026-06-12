import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faCalendarCheck,
  faCalendarXmark,
  faBoxOpen,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useAdminNotifications } from "../../../hooks/useAdminNotifications";
import "./styles/Notificaciones.css";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
  });
}

function formatDateTime(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `hace ${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

function NotifSection({ icon, title, count, color, children }) {
  if (count === 0) return null;

  return (
    <div className="notif-section">
      <div className="notif-section-header">
        <span className={`notif-section-icon ${color}`}>
          <FontAwesomeIcon icon={icon} />
        </span>
        <h3 className="notif-section-title">{title}</h3>
        <span className="notif-section-count">{count}</span>
      </div>
      <div className="notif-section-body">{children}</div>
    </div>
  );
}

export default function AdminNotificaciones() {
  const {
    birthdays,
    recentReservations,
    cancelledReservations,
    lowStockProducts,
    newUsers,
    loading,
    totalCount,
  } = useAdminNotifications();

  if (loading) {
    return <p className="notif-loading">Cargando notificaciones…</p>;
  }

  return (
    <div className="notif-page">
      <div className="notif-header">
        <div>
          <h2 className="admin-page-title">Notificaciones</h2>
          <p className="admin-page-subtitle">
            {totalCount > 0
              ? `${totalCount} notificación${totalCount > 1 ? "es" : ""} activa${totalCount > 1 ? "s" : ""}`
              : "Sin notificaciones nuevas"}
          </p>
        </div>
      </div>

      {totalCount === 0 && (
        <div className="notif-empty">
          <p>Todo tranquilo por ahora.</p>
        </div>
      )}

      {/* Cumpleaños próximos */}
      <NotifSection
        icon={faCakeCandles}
        title="Cumpleaños próximos"
        count={birthdays.length}
        color="notif-icon-birthday">
        {birthdays.map((p) => (
          <div key={p.id} className="notif-item">
            <div className="notif-item-main">
              <span className="notif-item-name">{p.nombre}</span>
              <span className="notif-item-detail">{p.email}</span>
            </div>
            <span className="notif-item-meta">
              {p.daysUntil === 0
                ? "¡Hoy!"
                : p.daysUntil === 1
                  ? "Mañana"
                  : `En ${p.daysUntil} días`}
            </span>
          </div>
        ))}
      </NotifSection>

      {/* Reservas recientes */}
      <NotifSection
        icon={faCalendarCheck}
        title="Reservas recientes"
        count={recentReservations.length}
        color="notif-icon-reservation">
        {recentReservations.map((r) => (
          <div key={r.id} className="notif-item">
            <div className="notif-item-main">
              <span className="notif-item-name">
                {r.user?.nombre || "Usuario"}
              </span>
              <span className="notif-item-detail">
                {r.schedule?.classes?.nombre} — {formatDate(r.schedule?.fecha)}{" "}
                {r.schedule?.hora_inicio?.slice(0, 5)}
              </span>
            </div>
            <span className="notif-item-meta">{timeAgo(r.created_at)}</span>
          </div>
        ))}
      </NotifSection>

      {/* Reservas canceladas */}
      <NotifSection
        icon={faCalendarXmark}
        title="Reservas canceladas"
        count={cancelledReservations.length}
        color="notif-icon-cancelled">
        {cancelledReservations.map((r) => (
          <div key={r.id} className="notif-item">
            <div className="notif-item-main">
              <span className="notif-item-name">
                {r.user?.nombre || "Usuario"}
              </span>
              <span className="notif-item-detail">
                {r.schedule?.classes?.nombre} — {formatDate(r.schedule?.fecha)}{" "}
                {r.schedule?.hora_inicio?.slice(0, 5)}
              </span>
            </div>
            <span className="notif-item-meta">{timeAgo(r.created_at)}</span>
          </div>
        ))}
      </NotifSection>

      {/* Stock bajo */}
      <NotifSection
        icon={faBoxOpen}
        title="Stock bajo"
        count={lowStockProducts.length}
        color="notif-icon-stock">
        {lowStockProducts.map((p) => (
          <div key={p.id} className="notif-item">
            <div className="notif-item-main">
              <span className="notif-item-name">{p.nombre}</span>
              <span className="notif-item-detail">{p.categoria}</span>
            </div>
            <span className="notif-item-meta notif-stock-low">
              {p.stock} / mín {p.stock_minimo ?? 5}
            </span>
          </div>
        ))}
      </NotifSection>

      {/* Usuarios nuevos */}
      <NotifSection
        icon={faUserPlus}
        title="Usuarios nuevos"
        count={newUsers.length}
        color="notif-icon-user">
        {newUsers.map((u) => (
          <div key={u.id} className="notif-item">
            <div className="notif-item-main">
              <span className="notif-item-name">{u.nombre}</span>
              <span className="notif-item-detail">{u.email}</span>
            </div>
            <span className="notif-item-meta">
              {formatDateTime(u.created_at)}
            </span>
          </div>
        ))}
      </NotifSection>
    </div>
  );
}
