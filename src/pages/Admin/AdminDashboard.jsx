import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faReceipt,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import "./AdminDashboard.css";

function StatCard({ icon, label, value, color }) {
  return (
    <div className="dash-stat-card">
      <span className={`dash-stat-icon ${color}`}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <div>
        <p className="dash-stat-value">{value}</p>
        <p className="dash-stat-label">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const {
    loading,
    salesData,
    salesView,
    setSalesView,
    totalSales,
    totalStock,
    totalUsers,
    topClasses,
    totalOrders,
    formatPrice,
  } = useAdminDashboard();

  if (loading) {
    return <p className="dash-loading">Cargando dashboard…</p>;
  }

  return (
    <div className="dash-page">
      <div className="dash-header">
        <div>
          <h2 className="admin-page-title">Dashboard</h2>
          <p className="admin-page-subtitle">Resumen de tu negocio</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="dash-stats">
        <StatCard
          icon={faReceipt}
          label="Ventas totales"
          value={formatPrice(totalSales)}
          color="dash-icon-sales"
        />
        <StatCard
          icon={faReceipt}
          label="Órdenes completadas"
          value={totalOrders}
          color="dash-icon-orders"
        />
        <StatCard
          icon={faBoxesStacked}
          label="Stock total"
          value={`${totalStock} uds`}
          color="dash-icon-stock"
        />
        <StatCard
          icon={faTrophy}
          label="Clases este mes"
          value={topClasses.reduce((s, c) => s + c.reservas, 0)}
          color="dash-icon-classes"
        />
        <StatCard
          icon={faUsers}
          label="Usuarios totales"
          value={totalUsers}
          color="dash-icon-users"
        />
      </div>

      {/* Sales Chart */}
      <div className="dash-chart-card">
        <div className="dash-chart-header">
          <h3 className="dash-chart-title">Ventas</h3>
          <div className="dash-chart-toggle">
            <button
              className={salesView === "diario" ? "active" : ""}
              onClick={() => setSalesView("diario")}>
              Diario
            </button>
            <button
              className={salesView === "mensual" ? "active" : ""}
              onClick={() => setSalesView("mensual")}>
              Mensual
            </button>
          </div>
        </div>

        <div className="dash-chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e8b4b8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#e8b4b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e9" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#aaa" }}
                axisLine={{ stroke: "#f0e8e9" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#aaa" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  v >= 1000 ? `${Math.round(v / 1000)}k` : v
                }
              />
              <Tooltip
                formatter={(value) => [formatPrice(value), "Ventas"]}
                contentStyle={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "0.78rem",
                  borderRadius: 8,
                  border: "1px solid #f0e8e9",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#c89099"
                strokeWidth={2}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Classes */}
      <div className="dash-top-classes">
        <h3 className="dash-section-title">
          <FontAwesomeIcon icon={faTrophy} className="dash-trophy-icon" />
          Clases más populares del mes
        </h3>

        {topClasses.length === 0 ? (
          <p className="dash-empty">Sin reservas este mes.</p>
        ) : (
          <div className="dash-classes-list">
            {topClasses.map((cls, i) => (
              <div key={cls.id} className="dash-class-row">
                <span className="dash-class-rank">#{i + 1}</span>
                <div className="dash-class-info">
                  <span className="dash-class-name">{cls.nombre}</span>
                  <span className="dash-class-type">{cls.tipo}</span>
                </div>
                <div className="dash-class-bar-wrapper">
                  <div
                    className="dash-class-bar"
                    style={{
                      width: `${Math.min(100, (cls.reservas / (topClasses[0]?.reservas || 1)) * 100)}%`,
                    }}
                  />
                </div>
                <span className="dash-class-count">
                  {cls.reservas} reserva{cls.reservas !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
