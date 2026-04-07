export default function InventarioHeader({
  tab,
  onTabChange,
  lowStockCount,
  onCreateProduct,
  onCreatePack,
  showCreateProduct,
  showCreatePack,
  productCount,
  packCount,
}) {
  return (
    <div className="inv-header">
      <div>
        <h2 className="admin-page-title">Inventario</h2>
        <p className="admin-page-subtitle">
          {productCount} productos · {packCount} packs
        </p>
      </div>

      <div className="inv-header-actions">
        {tab === "productos" && (
          <button className="admin-btn-primary" onClick={onCreateProduct}>
            {showCreateProduct ? "Cancelar" : "+ Producto"}
          </button>
        )}
        {tab === "packs" && (
          <button className="admin-btn-primary" onClick={onCreatePack}>
            {showCreatePack ? "Cancelar" : "+ Pack"}
          </button>
        )}
      </div>

      <div className="inv-tabs">
        <button
          className={`inv-tab${tab === "productos" ? " active" : ""}`}
          onClick={() => onTabChange("productos")}>
          Productos
        </button>
        <button
          className={`inv-tab${tab === "packs" ? " active" : ""}`}
          onClick={() => onTabChange("packs")}>
          Packs
        </button>
        <button
          className={`inv-tab${tab === "alertas" ? " active" : ""}`}
          onClick={() => onTabChange("alertas")}>
          Alertas
          {lowStockCount > 0 && (
            <span className="inv-tab-badge">{lowStockCount}</span>
          )}
        </button>
      </div>
    </div>
  );
}
