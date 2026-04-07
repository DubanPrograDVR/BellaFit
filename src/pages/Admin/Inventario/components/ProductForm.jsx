export default function ProductForm({
  form,
  categorias,
  badges,
  onFieldChange,
  onSubmit,
  onCancel,
  onImageUpload,
  uploadingImage,
  submitLabel,
  getCategoryLabel,
}) {
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onImageUpload(file, (url) => onFieldChange("imagen_url", url));
  };

  return (
    <div className="inv-form">
      <div className="admin-form-grid">
        <div className="admin-form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={form.nombre || ""}
            onChange={(e) => onFieldChange("nombre", e.target.value)}
            placeholder="Ej: Bungee Cord Pro"
          />
        </div>

        <div className="admin-form-group">
          <label>Categoría</label>
          <select
            value={form.categoria || "equipo"}
            onChange={(e) => onFieldChange("categoria", e.target.value)}>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {getCategoryLabel(cat)}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label>Precio</label>
          <input
            type="number"
            min="0"
            value={form.precio || ""}
            onChange={(e) => onFieldChange("precio", e.target.value)}
            placeholder="29990"
          />
        </div>

        <div className="admin-form-group">
          <label>Precio anterior</label>
          <input
            type="number"
            min="0"
            value={form.precio_anterior || ""}
            onChange={(e) => onFieldChange("precio_anterior", e.target.value)}
            placeholder="Opcional"
          />
        </div>

        <div className="admin-form-group">
          <label>Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock ?? ""}
            onChange={(e) => onFieldChange("stock", e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="admin-form-group">
          <label>Stock mínimo (alerta)</label>
          <input
            type="number"
            min="0"
            value={form.stock_minimo ?? "5"}
            onChange={(e) => onFieldChange("stock_minimo", e.target.value)}
          />
        </div>

        <div className="admin-form-group">
          <label>Badge</label>
          <select
            value={form.badge || ""}
            onChange={(e) => onFieldChange("badge", e.target.value)}>
            <option value="">Sin badge</option>
            {badges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
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
            placeholder="Descripción del producto"
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
