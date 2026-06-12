import AdminClassCard from "./components/AdminClassCard";
import AdminClassCreateForm from "./components/AdminClassCreateForm";
import AdminClassesFilters from "./components/AdminClassesFilters";
import AdminClassesHeader from "./components/AdminClassesHeader";
import { useAdminClasses } from "./hooks/useAdminClasses";
import "./styles/AdminClasses.css";

export default function AdminClasses() {
  const adminClasses = useAdminClasses();

  if (adminClasses.loading) {
    return <p className="admin-classes-loading">Cargando clases…</p>;
  }

  return (
    <div className="admin-classes">
      <AdminClassesHeader
        showCreate={adminClasses.showCreate}
        totalClasses={adminClasses.classes.length}
        onToggleCreate={adminClasses.toggleCreateForm}
      />

      <div className="admin-classes-guide">
        Las fechas de cada clase se gestionan directamente desde su tarjeta.
      </div>

      {adminClasses.showCreate && (
        <AdminClassCreateForm
          classTypes={adminClasses.classTypes}
          createForm={adminClasses.createForm}
          createScheduleForm={adminClasses.createScheduleForm}
          instructors={adminClasses.instructors}
          onCancel={adminClasses.resetCreateState}
          onCreate={adminClasses.handleCreate}
          onCreateFieldChange={adminClasses.updateCreateFormField}
          onScheduleFieldChange={adminClasses.updateCreateScheduleFormField}
        />
      )}

      <AdminClassesFilters
        classTypes={adminClasses.classTypes}
        filterTipo={adminClasses.filterTipo}
        search={adminClasses.search}
        onFilterTipoChange={adminClasses.setFilterTipo}
        onSearchChange={adminClasses.setSearch}
      />

      {adminClasses.filteredClasses.length === 0 ? (
        <p className="admin-users-empty">No se encontraron clases.</p>
      ) : (
        <div className="admin-classes-grid">
          {adminClasses.filteredClasses.map((classItem) => (
            <AdminClassCard
              key={classItem.id}
              classItem={classItem}
              classSchedules={adminClasses.getClassSchedules(classItem.id)}
              classTypes={adminClasses.classTypes}
              confirmDeleteClassId={adminClasses.confirmDeleteClassId}
              confirmDeleteScheduleId={adminClasses.confirmDeleteScheduleId}
              editForm={adminClasses.editForm}
              formatDate={adminClasses.formatDate}
              formatTime={adminClasses.formatTime}
              getScheduleCountLabel={adminClasses.getScheduleCountLabel}
              getTipoBadgeClass={adminClasses.getTipoBadgeClass}
              instructors={adminClasses.instructors}
              isEditing={adminClasses.editingId === classItem.id}
              isScheduleEditorOpen={
                adminClasses.scheduleEditor.classId === classItem.id
              }
              scheduleEditor={adminClasses.scheduleEditor}
              onCancelEdit={adminClasses.handleCancelEdit}
              onCloseScheduleEditor={adminClasses.closeScheduleEditor}
              onConfirmDeleteClass={adminClasses.markClassForDelete}
              onConfirmDeleteSchedule={adminClasses.markScheduleForDelete}
              onDeleteClass={adminClasses.handleDeleteClass}
              onDeleteSchedule={adminClasses.handleDeleteSchedule}
              onEdit={adminClasses.handleEdit}
              onEditFieldChange={adminClasses.updateEditFormField}
              onOpenScheduleEditor={adminClasses.openScheduleEditor}
              onSaveEdit={adminClasses.handleSaveEdit}
              onSaveSchedule={adminClasses.handleSaveSchedule}
              onScheduleFieldChange={adminClasses.updateScheduleEditorField}
            />
          ))}
        </div>
      )}
    </div>
  );
}
