import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function AlertsPanel({
  lowStockProducts,
  onStockChange,
  formatPrice,
  getCategoryLabel,
}) {
  if (lowStockProducts.length === 0) {
    return (
      <div className="inv-alerts-empty">
        <p>Sin alertas de stock bajo.</p>
      </div>
    );
  }

  return (
    <div className="inv-alerts">
      <div className="inv-alerts-banner">
        <FontAwesomeIcon icon={faTriangleExclamation} />
        <span>
          {lowStockProducts.length} producto
          {lowStockProducts.length > 1 ? "s" : ""} con stock bajo
        </span>
      </div>

      <div className="inv-alerts-list">
        {lowStockProducts.map((p) => (
          <div key={p.id} className="inv-alert-row">
            <div className="inv-alert-info">
              <span className="inv-alert-name">{p.nombre}</span>
              <span className="inv-alert-cat">
                {getCategoryLabel(p.categoria)}
              </span>
            </div>

            <div className="inv-alert-stock">
              <button
                className="inv-stock-btn"
                onClick={() => onStockChange(p.id, -1)}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="inv-stock-value low">{p.stock}</span>
              <button
                className="inv-stock-btn"
                onClick={() => onStockChange(p.id, 1)}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span className="inv-stock-min">
                mín: {p.stock_minimo ?? 5}
              </span>
            </div>

            <span className="inv-alert-price">{formatPrice(p.precio)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
