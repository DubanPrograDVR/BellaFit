import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faPen,
  faTrash,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductCard({
  product,
  isEditing,
  editForm,
  onEdit,
  onCancelEdit,
  onFieldChange,
  onSave,
  onDelete,
  confirmDelete,
  onConfirmDelete,
  onStockChange,
  formatPrice,
  getCategoryLabel,
  getCategoryBadgeClass,
  renderEditForm,
}) {
  if (isEditing) {
    return <div className="inv-card editing">{renderEditForm}</div>;
  }

  const lowStock = product.stock <= (product.stock_minimo ?? 5);

  return (
    <div className="inv-card">
      <div className="inv-card-top">
        {product.imagen_url ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="inv-card-img"
          />
        ) : (
          <div className="inv-card-img-placeholder">
            <FontAwesomeIcon icon={faBoxOpen} />
          </div>
        )}

        <div className="inv-card-info">
          <h3 className="inv-card-name">{product.nombre}</h3>
          <div className="inv-card-meta">
            <span
              className={`inv-cat-badge ${getCategoryBadgeClass(product.categoria)}`}>
              {getCategoryLabel(product.categoria)}
            </span>
            {product.badge && (
              <span className="inv-product-badge">{product.badge}</span>
            )}
            {!product.activo && (
              <span className="inv-inactive-badge">Inactivo</span>
            )}
          </div>
        </div>
      </div>

      <div className="inv-card-body">
        <div className="inv-price-row">
          <span className="inv-price">{formatPrice(product.precio)}</span>
          {product.precio_anterior && (
            <span className="inv-price-old">
              {formatPrice(product.precio_anterior)}
            </span>
          )}
        </div>

        <div className={`inv-stock-row${lowStock ? " low" : ""}`}>
          <button
            className="inv-stock-btn"
            onClick={() => onStockChange(product.id, -1)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="inv-stock-value">{product.stock}</span>
          <button
            className="inv-stock-btn"
            onClick={() => onStockChange(product.id, 1)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          {lowStock && <span className="inv-low-label">Stock bajo</span>}
        </div>
      </div>

      <div className="inv-card-actions">
        {confirmDelete ? (
          <>
            <span className="inv-confirm-text">¿Eliminar?</span>
            <button
              className="admin-btn admin-btn-delete"
              onClick={() => onDelete(product.id)}>
              Sí
            </button>
            <button
              className="admin-btn admin-btn-cancel"
              onClick={() => onConfirmDelete(null)}>
              No
            </button>
          </>
        ) : (
          <>
            <button
              className="admin-btn admin-btn-edit"
              onClick={() => onEdit(product)}>
              <FontAwesomeIcon icon={faPen} /> Editar
            </button>
            <button
              className="admin-btn admin-btn-delete"
              onClick={() => onConfirmDelete(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
