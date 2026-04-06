export default function AdminClassesFilters({
  search,
  filterTipo,
  classTypes,
  onSearchChange,
  onFilterTipoChange,
}) {
  return (
    <div className="admin-users-filters">
      <input
        type="text"
        className="admin-filter-search"
        placeholder="Buscar por nombre…"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        className="admin-filter-select"
        value={filterTipo}
        onChange={(event) => onFilterTipoChange(event.target.value)}>
        <option value="todos">Todos los tipos</option>
        {classTypes.map((classType) => (
          <option key={classType} value={classType}>
            {classType.charAt(0).toUpperCase() + classType.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
