import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function PackForm({
  form,
  products,
  onFieldChange,
  onSubmit,
  onCancel,
  onImageUpload,
  uploadingImage,
  onAddItem,
  onRemoveItem,
  onUpdateItemQty,
  submitLabel,
  getProductName,
  formatPrice,
}) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageUpload(file, (url) => onFieldChange("imagen_url", url));
  };

  const selectedIds = new Set((form.items || []).map((i) => i.product_id));
  const availableProducts = products.filter((p) => !selectedIds.has(p.id));

  return (
    <div className="inv-form">
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label>Nombre del pack</label>
          <input
            type="text"
            value={form.nombre || ""}
            onChange={(e) => onFieldChange("nombre", e.target.value)}
            placeholder="Ej: Pack Principiante"
          />
        </div>

        <div className="admin-form-group">
          <label>Precio del pack</label>
          <input
            type="number"
            min="0"
            value={form.precio || ""}
            onChange={(e) => onFieldChange("precio", e.target.value)}
            placeholder="49990"
          />
        </div>

        {form.activo !== undefined && (
          <div className="admin-form-group">
            <label>Estado</label>
            <select
              value={form.activo ? "true" : "false"}
              onChange={(e) =>
                onFieldChange("activo", e.target.value === "true")
              }>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        )}

        <div className="admin-form-group admin-form-full">
          <label>Descripción</label>
          <textarea
            value={form.descripcion || ""}
            onChange={(e) => onFieldChange("descripcion", e.target.value)}
            rows={2}
            placeholder="Descripción del pack"
          />
        </div>

        <div className="admin-form-group admin-form-full">
          <label>Imagen</label>
          <div className="inv-image-upload">
            {form.imagen_url && (
              <img
                src={form.imagen_url}
                alt="Preview"
                className="inv-image-preview"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFile} />
            {uploadingImage && <span className="inv-uploading">Subiendo…</span>}
          </div>
        </div>
      </div>

      {/* Pack items */}
      <div className="inv-pack-editor">
        <label>Productos del pack</label>

        {(form.items || []).length > 0 && (
          <ul className="inv-pack-items-edit">
            {form.items.map((item) => (
              <li key={item.product_id} className="inv-pack-item-row">
                <span className="inv-pack-item-name">
                  {getProductName(item.product_id)}
                </span>
                <div className="inv-qty-control">
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateItemQty(item.product_id, item.cantidad - 1)
                    }>
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    type="button"
                    onClick={() =>
                      onUpdateItemQty(item.product_id, item.cantidad + 1)
                    }>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <button
                  type="button"
                  className="inv-pack-remove"
                  onClick={() => onRemoveItem(item.product_id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {availableProducts.length > 0 && (
          <select
            className="inv-pack-add-select"
            value=""
            onChange={(e) => {
              if (e.target.value) onAddItem(e.target.value);
            }}>
            <option value="">+ Agregar producto</option>
            {availableProducts.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} — {formatPrice(p.precio)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="admin-actions">
        <button className="admin-btn admin-btn-save" onClick={onSubmit}>
          {submitLabel}
        </button>
        <button className="admin-btn admin-btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
