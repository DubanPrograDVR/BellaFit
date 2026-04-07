import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

export default function PackCard({
  pack,
  isEditing,
  onEdit,
  onDelete,
  confirmDelete,
  onConfirmDelete,
  formatPrice,
  getProductName,
  renderEditForm,
}) {
  if (isEditing) {
    return <div className="inv-card editing">{renderEditForm}</div>;
  }

  const items = pack.pack_items || [];

  return (
    <div className="inv-card">
      <div className="inv-card-top">
        {pack.imagen_url ? (
          <img
            src={pack.imagen_url}
            alt={pack.nombre}
            className="inv-card-img"
          />
        ) : (
          <div className="inv-card-img-placeholder">
            <FontAwesomeIcon icon={faBoxesStacked} />
          </div>
        )}
        <div className="inv-card-info">
          <h3 className="inv-card-name">{pack.nombre}</h3>
          {!pack.activo && <span className="inv-inactive-badge">Inactivo</span>}
        </div>
      </div>

      <div className="inv-card-body">
        <div className="inv-price-row">
          <span className="inv-price">{formatPrice(pack.precio)}</span>
        </div>

        {items.length > 0 && (
          <ul className="inv-pack-items">
            {items.map((pi) => (
              <li key={pi.product_id}>
                {pi.cantidad}× {pi.product?.nombre || getProductName(pi.product_id)}
              </li>
            ))}
          </ul>
        )}

        {pack.descripcion && (
          <p className="inv-card-desc">{pack.descripcion}</p>
        )}
      </div>

      <div className="inv-card-actions">
        {confirmDelete ? (
          <>
            <span className="inv-confirm-text">¿Eliminar?</span>
            <button
              className="admin-btn admin-btn-delete"
              onClick={() => onDelete(pack.id)}>
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
            <button className="admin-btn admin-btn-edit" onClick={() => onEdit(pack)}>
              <FontAwesomeIcon icon={faPen} /> Editar
            </button>
            <button
              className="admin-btn admin-btn-delete"
              onClick={() => onConfirmDelete(pack.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
