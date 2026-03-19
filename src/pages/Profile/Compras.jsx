import { Link } from "react-router-dom";
import { formatPrice, formatDate, estadoBadge } from "./utils";
import useCompras from "./hooks/useCompras";

export default function Compras() {
  const { comprasActivas, comprasPasadas } = useCompras();

  return (
    <div className="perfil-compras">
      <h2>Compras Activas</h2>
      {comprasActivas.length === 0 ? (
        <p className="perfil-empty">No tienes compras activas</p>
      ) : (
        <div className="perfil-compras-list">
          {comprasActivas.map((c) => (
            <div key={c.id} className="perfil-compra-card">
              <div className="perfil-compra-info">
                <span className="perfil-compra-tipo">
                  {c.tipo === "plan" ? "📋 Plan" : "📦 Producto"}
                </span>
                <h3>{c.nombre}</h3>
                <p>Comprado el {formatDate(c.fecha_compra)}</p>
                {c.fecha_expiracion && (
                  <p>Vence: {formatDate(c.fecha_expiracion)}</p>
                )}
                {c.tracking && (
                  <p className="perfil-tracking">Tracking: {c.tracking}</p>
                )}
              </div>
              <div className="perfil-compra-right">
                <span className="perfil-compra-precio">
                  {formatPrice(c.precio)}
                </span>
                <span className={`perfil-badge ${estadoBadge(c.estado)}`}>
                  {c.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="perfil-section-subtitle">Compras Pasadas</h2>
      {comprasPasadas.length === 0 ? (
        <p className="perfil-empty">No hay compras anteriores</p>
      ) : (
        <div className="perfil-compras-list">
          {comprasPasadas.map((c) => (
            <div key={c.id} className="perfil-compra-card pasada">
              <div className="perfil-compra-info">
                <span className="perfil-compra-tipo">
                  {c.tipo === "plan" ? "📋 Plan" : "📦 Producto"}
                </span>
                <h3>{c.nombre}</h3>
                <p>Comprado el {formatDate(c.fecha_compra)}</p>
              </div>
              <div className="perfil-compra-right">
                <span className="perfil-compra-precio">
                  {formatPrice(c.precio)}
                </span>
                <span className={`perfil-badge ${estadoBadge(c.estado)}`}>
                  {c.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="perfil-compras-cta">
        <Link to="/tienda" className="perfil-cta-btn">
          Ir a la Tienda
        </Link>
      </div>
    </div>
  );
}
