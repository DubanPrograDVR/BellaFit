import { useState, useEffect, useCallback } from "react";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getClasses,
  getInstructors,
  getReservationsBySchedule,
} from "../../lib/admin";
import { useToast } from "../../context/ToastContext";
import "./AdminSchedules.css";

const emptyForm = {
  class_id: "",
  instructor_id: "",
  fecha: "",
  hora_inicio: "",
  hora_fin: "",
};

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [classes, setClasses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [filterClase, setFilterClase] = useState("todos");
  const [filterFecha, setFilterFecha] = useState("");
  /* Reservas expandidas */
  const [expandedId, setExpandedId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);
  const { showToast } = useToast();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [schRes, clsRes, instRes] = await Promise.all([
      getSchedules(),
      getClasses(),
      getInstructors(),
    ]);
    if (schRes.data) setSchedules(schRes.data);
    if (clsRes.data) setClasses(clsRes.data);
    if (instRes.data) setInstructors(instRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ── Filtros ── */
  const filtered = schedules.filter((s) => {
    const matchClase = filterClase === "todos" || s.class_id === filterClase;
    const matchFecha = !filterFecha || s.fecha === filterFecha;
    return matchClase && matchFecha;
  });

  /* ── Crear ── */
  const handleCreate = async () => {
    if (
      !createForm.class_id ||
      !createForm.fecha ||
      !createForm.hora_inicio ||
      !createForm.hora_fin
    ) {
      showToast("Completa clase, fecha y horas", "error");
      return;
    }
    if (createForm.hora_fin <= createForm.hora_inicio) {
      showToast("La hora de fin debe ser mayor a la de inicio", "error");
      return;
    }
    const selected = classes.find((c) => c.id === createForm.class_id);
    const payload = {
      ...createForm,
      instructor_id: createForm.instructor_id || null,
      cupos_disponibles: selected?.capacidad ?? 0,
    };
    const { data, error } = await createSchedule(payload);
    if (error) {
      showToast("Error al crear horario", "error");
      return;
    }
    setSchedules((prev) =>
      [...prev, data].sort((a, b) => a.fecha.localeCompare(b.fecha)),
    );
    setCreateForm(emptyForm);
    setShowCreate(false);
    showToast("Horario creado correctamente");
  };

  /* ── Editar ── */
  const handleEdit = (sch) => {
    setEditingId(sch.id);
    setEditForm({
      class_id: sch.class_id,
      instructor_id: sch.instructor_id || "",
      fecha: sch.fecha,
      hora_inicio: sch.hora_inicio?.slice(0, 5),
      hora_fin: sch.hora_fin?.slice(0, 5),
    });
  };

  const handleSaveEdit = async () => {
    if (editForm.hora_fin <= editForm.hora_inicio) {
      showToast("La hora de fin debe ser mayor a la de inicio", "error");
      return;
    }
    const { data, error } = await updateSchedule(editingId, {
      ...editForm,
      instructor_id: editForm.instructor_id || null,
    });
    if (error) {
      showToast("Error al actualizar horario", "error");
      return;
    }
    setSchedules((prev) => prev.map((s) => (s.id === editingId ? data : s)));
    setEditingId(null);
    showToast("Horario actualizado correctamente");
  };

  /* ── Eliminar ── */
  const handleDelete = async (id) => {
    const { error } = await deleteSchedule(id);
    if (error) {
      showToast("Error al eliminar horario. Puede tener reservas.", "error");
      return;
    }
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setConfirmDelete(null);
    showToast("Horario eliminado correctamente");
  };

  /* ── Expandir reservas ── */
  const toggleReservations = async (scheduleId) => {
    if (expandedId === scheduleId) {
      setExpandedId(null);
      setReservations([]);
      return;
    }
    setExpandedId(scheduleId);
    setLoadingRes(true);
    const { data } = await getReservationsBySchedule(scheduleId);
    setReservations(data || []);
    setLoadingRes(false);
  };

  /* ── Helpers ── */
  const getOccupation = (sch) => {
    const cap = sch.classes?.capacidad || 0;
    const available = sch.cupos_disponibles ?? cap;
    const taken = cap - available;
    const pct = cap > 0 ? Math.round((taken / cap) * 100) : 0;
    return { taken, cap, pct };
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  const formatTime = (t) => (t ? t.slice(0, 5) : "");

  const getTipoBadgeClass = (tipo) => {
    const map = {
      bungee: "badge-bungee",
      yoga: "badge-yoga",
      pilates: "badge-pilates",
      funcional: "badge-funcional",
    };
    return map[tipo] || "badge-otro";
  };

  const estadoBadge = (estado) => {
    const map = {
      confirmada: "estado-confirmada",
      cancelada: "estado-cancelada",
      asistida: "estado-asistida",
      no_asistio: "estado-no-asistio",
    };
    return map[estado] || "";
  };

  if (loading) return <p className="admin-sch-loading">Cargando horarios…</p>;

  return (
    <div className="admin-schedules">
      <div className="admin-sch-header">
        <div>
          <h2 className="admin-page-title">Gestión de Horarios</h2>
          <p className="admin-page-subtitle">
            {schedules.length} horario{schedules.length !== 1 && "s"}{" "}
            programados
          </p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancelar" : "+ Nuevo Horario"}
        </button>
      </div>

      {/* ── Formulario crear ── */}
      {showCreate && (
        <div className="admin-create-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Clase</label>
              <select
                value={createForm.class_id}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, class_id: e.target.value }))
                }>
                <option value="">Seleccionar clase…</option>
                {classes
                  .filter((c) => c.activo)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} ({c.tipo})
                    </option>
                  ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Instructora</label>
              <select
                value={createForm.instructor_id}
                onChange={(e) =>
                  setCreateForm((f) => ({
                    ...f,
                    instructor_id: e.target.value,
                  }))
                }>
                <option value="">Sin asignar</option>
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={createForm.fecha}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, fecha: e.target.value }))
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Hora inicio</label>
              <input
                type="time"
                value={createForm.hora_inicio}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, hora_inicio: e.target.value }))
                }
              />
            </div>
            <div className="admin-form-group">
              <label>Hora fin</label>
              <input
                type="time"
                value={createForm.hora_fin}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, hora_fin: e.target.value }))
                }
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-save" onClick={handleCreate}>
            Crear Horario
          </button>
        </div>
      )}

      {/* ── Filtros ── */}
      <div className="admin-users-filters">
        <select
          className="admin-filter-select"
          value={filterClase}
          onChange={(e) => setFilterClase(e.target.value)}>
          <option value="todos">Todas las clases</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="admin-filter-search"
          value={filterFecha}
          onChange={(e) => setFilterFecha(e.target.value)}
        />
        {filterFecha && (
          <button
            className="admin-btn admin-btn-cancel"
            onClick={() => setFilterFecha("")}
            style={{ marginLeft: "0.5rem" }}>
            Limpiar fecha
          </button>
        )}
      </div>

      {/* ── Tabla ── */}
      {filtered.length === 0 ? (
        <p className="admin-users-empty">No se encontraron horarios.</p>
      ) : (
        <div className="admin-sch-table-wrap">
          <table className="admin-sch-table">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Instructora</th>
                <th>Fecha</th>
                <th>Horario</th>
                <th>Ocupación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sch) => {
                const occ = getOccupation(sch);
                const isEditing = editingId === sch.id;

                return (
                  <tr key={sch.id} className="admin-sch-row-group">
                    {isEditing ? (
                      <>
                        <td>
                          <select
                            value={editForm.class_id}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                class_id: e.target.value,
                              }))
                            }>
                            {classes.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.nombre}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            value={editForm.instructor_id}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                instructor_id: e.target.value,
                              }))
                            }>
                            <option value="">Sin asignar</option>
                            {instructors.map((i) => (
                              <option key={i.id} value={i.id}>
                                {i.nombre}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input
                            type="date"
                            value={editForm.fecha}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                fecha: e.target.value,
                              }))
                            }
                          />
                        </td>
                        <td className="admin-sch-time-cell">
                          <input
                            type="time"
                            value={editForm.hora_inicio}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                hora_inicio: e.target.value,
                              }))
                            }
                          />
                          <span>–</span>
                          <input
                            type="time"
                            value={editForm.hora_fin}
                            onChange={(e) =>
                              setEditForm((f) => ({
                                ...f,
                                hora_fin: e.target.value,
                              }))
                            }
                          />
                        </td>
                        <td>—</td>
                        <td>
                          <div className="admin-actions">
                            <button
                              className="admin-btn admin-btn-save"
                              onClick={handleSaveEdit}>
                              Guardar
                            </button>
                            <button
                              className="admin-btn admin-btn-cancel"
                              onClick={() => setEditingId(null)}>
                              Cancelar
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>
                          <span className="admin-sch-class-name">
                            {sch.classes?.nombre}
                          </span>
                          <span
                            className={`admin-tipo-badge ${getTipoBadgeClass(
                              sch.classes?.tipo,
                            )}`}>
                            {sch.classes?.tipo}
                          </span>
                        </td>
                        <td>
                          {sch.instructor?.nombre || (
                            <span className="admin-sch-unassigned">
                              Sin asignar
                            </span>
                          )}
                        </td>
                        <td>{formatDate(sch.fecha)}</td>
                        <td>
                          {formatTime(sch.hora_inicio)} –{" "}
                          {formatTime(sch.hora_fin)}
                        </td>
                        <td>
                          <div className="admin-occ-wrap">
                            <div className="admin-occ-bar">
                              <div
                                className={`admin-occ-fill${
                                  occ.pct >= 90
                                    ? " full"
                                    : occ.pct >= 60
                                      ? " mid"
                                      : ""
                                }`}
                                style={{ width: `${occ.pct}%` }}
                              />
                            </div>
                            <span className="admin-occ-text">
                              {occ.taken}/{occ.cap}
                            </span>
                          </div>
                        </td>
                        <td>
                          {confirmDelete === sch.id ? (
                            <div className="admin-actions">
                              <button
                                className="admin-btn admin-btn-danger"
                                onClick={() => handleDelete(sch.id)}>
                                Confirmar
                              </button>
                              <button
                                className="admin-btn admin-btn-cancel"
                                onClick={() => setConfirmDelete(null)}>
                                No
                              </button>
                            </div>
                          ) : (
                            <div className="admin-actions">
                              <button
                                className="admin-btn admin-btn-edit"
                                onClick={() => handleEdit(sch)}>
                                Editar
                              </button>
                              <button
                                className="admin-btn admin-btn-delete"
                                onClick={() => setConfirmDelete(sch.id)}>
                                Eliminar
                              </button>
                              <button
                                className="admin-btn admin-btn-view"
                                onClick={() => toggleReservations(sch.id)}>
                                {expandedId === sch.id ? "Cerrar" : "Reservas"}
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Panel reservas expandido ── */}
      {expandedId && (
        <div className="admin-res-panel">
          <h3 className="admin-res-title">Reservas del horario seleccionado</h3>
          {loadingRes ? (
            <p className="admin-res-loading">Cargando reservas…</p>
          ) : reservations.length === 0 ? (
            <p className="admin-res-empty">Sin reservas aún.</p>
          ) : (
            <table className="admin-res-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Fecha reserva</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((r) => (
                  <tr key={r.id}>
                    <td>{r.user?.nombre || "—"}</td>
                    <td>{r.user?.email || "—"}</td>
                    <td>
                      <span
                        className={`admin-estado-badge ${estadoBadge(
                          r.estado,
                        )}`}>
                        {r.estado?.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      {r.created_at
                        ? new Date(r.created_at).toLocaleDateString("es-CL")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
