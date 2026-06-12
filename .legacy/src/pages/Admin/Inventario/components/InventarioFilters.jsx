export default function InventarioFilters({
  search,
  filterCategoria,
  categorias,
  onSearchChange,
  onFilterChange,
  getCategoryLabel,
  showCategoryFilter,
}) {
  return (
    <div className="admin-users-filters">
      <input
        type="text"
        className="admin-filter-search"
        placeholder="Buscar por nombre…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {showCategoryFilter && (
        <select
          className="admin-filter-select"
          value={filterCategoria}
          onChange={(e) => onFilterChange(e.target.value)}>
          <option value="todos">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {getCategoryLabel(cat)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
