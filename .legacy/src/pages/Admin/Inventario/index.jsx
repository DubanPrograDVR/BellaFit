import { useInventario } from "./hooks/useInventario";
import InventarioHeader from "./components/InventarioHeader";
import InventarioFilters from "./components/InventarioFilters";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import PackCard from "./components/PackCard";
import PackForm from "./components/PackForm";
import AlertsPanel from "./components/AlertsPanel";
import "./styles/Inventario.css";

export default function AdminInventario() {
  const inv = useInventario();

  if (inv.loading) {
    return <p className="inv-loading">Cargando inventario…</p>;
  }

  return (
    <div className="inv-page">
      <InventarioHeader
        tab={inv.tab}
        onTabChange={inv.setTab}
        lowStockCount={inv.lowStockProducts.length}
        onCreateProduct={inv.toggleCreateProduct}
        onCreatePack={inv.toggleCreatePack}
        showCreateProduct={inv.showCreateProduct}
        showCreatePack={inv.showCreatePack}
        productCount={inv.products.length}
        packCount={inv.packs.length}
      />

      {inv.tab !== "alertas" && (
        <InventarioFilters
          search={inv.search}
          filterCategoria={inv.filterCategoria}
          categorias={inv.categorias}
          onSearchChange={inv.setSearch}
          onFilterChange={inv.setFilterCategoria}
          getCategoryLabel={inv.getCategoryLabel}
          showCategoryFilter={inv.tab === "productos"}
        />
      )}

      {/* Create forms */}
      {inv.showCreateProduct && (
        <div className="inv-create-wrapper">
          <h3 className="inv-section-title">Nuevo producto</h3>
          <ProductForm
            form={inv.createProductForm}
            categorias={inv.categorias}
            badges={inv.badges}
            onFieldChange={inv.updateCreateProductField}
            onSubmit={inv.handleCreateProduct}
            onCancel={inv.toggleCreateProduct}
            onImageUpload={inv.handleImageUpload}
            uploadingImage={inv.uploadingImage}
            submitLabel="Crear producto"
            getCategoryLabel={inv.getCategoryLabel}
          />
        </div>
      )}

      {inv.showCreatePack && (
        <div className="inv-create-wrapper">
          <h3 className="inv-section-title">Nuevo pack</h3>
          <PackForm
            form={inv.createPackForm}
            products={inv.products}
            onFieldChange={inv.updateCreatePackField}
            onSubmit={inv.handleCreatePack}
            onCancel={inv.toggleCreatePack}
            onImageUpload={inv.handleImageUpload}
            uploadingImage={inv.uploadingImage}
            onAddItem={inv.addPackItem}
            onRemoveItem={inv.removePackItem}
            onUpdateItemQty={inv.updatePackItemQty}
            submitLabel="Crear pack"
            getProductName={inv.getProductName}
            formatPrice={inv.formatPrice}
          />
        </div>
      )}

      {/* Products grid */}
      {inv.tab === "productos" && (
        <div className="inv-grid">
          {inv.filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isEditing={inv.editingProductId === product.id}
              editForm={inv.editProductForm}
              onEdit={inv.editProduct}
              onCancelEdit={inv.cancelEditProduct}
              onFieldChange={inv.updateEditProductField}
              onSave={inv.handleSaveProduct}
              onDelete={inv.handleDeleteProduct}
              confirmDelete={inv.confirmDeleteProductId === product.id}
              onConfirmDelete={inv.setConfirmDeleteProductId}
              onStockChange={inv.handleStockChange}
              formatPrice={inv.formatPrice}
              getCategoryLabel={inv.getCategoryLabel}
              getCategoryBadgeClass={inv.getCategoryBadgeClass}
              renderEditForm={
                <ProductForm
                  form={inv.editProductForm}
                  categorias={inv.categorias}
                  badges={inv.badges}
                  onFieldChange={inv.updateEditProductField}
                  onSubmit={inv.handleSaveProduct}
                  onCancel={inv.cancelEditProduct}
                  onImageUpload={inv.handleImageUpload}
                  uploadingImage={inv.uploadingImage}
                  submitLabel="Guardar"
                  getCategoryLabel={inv.getCategoryLabel}
                />
              }
            />
          ))}
          {inv.filteredProducts.length === 0 && (
            <p className="inv-empty">No se encontraron productos.</p>
          )}
        </div>
      )}

      {/* Packs grid */}
      {inv.tab === "packs" && (
        <div className="inv-grid">
          {inv.filteredPacks.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
              isEditing={inv.editingPackId === pack.id}
              onEdit={inv.editPackStart}
              onDelete={inv.handleDeletePack}
              confirmDelete={inv.confirmDeletePackId === pack.id}
              onConfirmDelete={inv.setConfirmDeletePackId}
              formatPrice={inv.formatPrice}
              getProductName={inv.getProductName}
              renderEditForm={
                <PackForm
                  form={inv.editPackForm}
                  products={inv.products}
                  onFieldChange={inv.updateEditPackField}
                  onSubmit={inv.handleSavePack}
                  onCancel={inv.cancelEditPack}
                  onImageUpload={inv.handleImageUpload}
                  uploadingImage={inv.uploadingImage}
                  onAddItem={inv.addEditPackItem}
                  onRemoveItem={inv.removeEditPackItem}
                  onUpdateItemQty={inv.updateEditPackItemQty}
                  submitLabel="Guardar"
                  getProductName={inv.getProductName}
                  formatPrice={inv.formatPrice}
                />
              }
            />
          ))}
          {inv.filteredPacks.length === 0 && (
            <p className="inv-empty">No se encontraron packs.</p>
          )}
        </div>
      )}

      {/* Alerts */}
      {inv.tab === "alertas" && (
        <AlertsPanel
          lowStockProducts={inv.lowStockProducts}
          onStockChange={inv.handleStockChange}
          formatPrice={inv.formatPrice}
          getCategoryLabel={inv.getCategoryLabel}
        />
      )}
    </div>
  );
}
