import { useState, useEffect, useCallback } from "react";
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../../lib/admin";
import { useToast } from "../../context/ToastContext";
import "./AdminClasses.css";

const TIPOS_CLASE = ["bungee", "yoga", "pilates", "funcional", "otro"];

const emptyForm = {
  nombre: "",
  tipo: "bungee",
  descripcion: "",
  capacidad: "",
  duracion: "",
};

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { showToast } = useToast();

  const fetchClasses = useCallback(async () => {
    setLoading(true);
    const { data } = await getClasses();
    if (data) setClasses(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const filtered = classes.filter((c) => {
    const matchSearch =
      !search || c.nombre?.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === "todos" || c.tipo === filterTipo;
    return matchSearch && matchTipo;
  });

  // ── Crear ──
  const handleCreate = async () => {
    if (
      !createForm.nombre.trim() ||
      !createForm.capacidad ||
      !createForm.duracion
    ) {
      showToast("Completa nombre, capacidad y duración", "error");
      return;
    }
    const { data, error } = await createClass({
      ...createForm,
      capacidad: parseInt(createForm.capacidad),
      duracion: parseInt(createForm.duracion),
    });
    if (error) {
      showToast("Error al crear clase", "error");
      return;
    }
    setClasses((prev) => [data, ...prev]);
    setCreateForm(emptyForm);
    setShowCreate(false);
    showToast("Clase creada correctamente");
  };

  // ── Editar ──
  const handleEdit = (cls) => {
    setEditingId(cls.id);
    setEditForm({
      nombre: cls.nombre,
      tipo: cls.tipo,
      descripcion: cls.descripcion || "",
      capacidad: cls.capacidad,
      duracion: cls.duracion,
      activo: cls.activo,
    });
  };

  const handleSaveEdit = async () => {
    const { data, error } = await updateClass(editingId, {
      ...editForm,
      capacidad: parseInt(editForm.capacidad),
      duracion: parseInt(editForm.duracion),
    });
    if (error) {
      showToast("Error al actualizar clase", "error");
      return;
    }
    setClasses((prev) => prev.map((c) => (c.id === editingId ? data : c)));
    setEditingId(null);
    showToast("Clase actualizada correctamente");
  };

  // ── Eliminar ──
  const handleDelete = async (id) => {
    const { error } = await deleteClass(id);
    if (error) {
      showToast(
        "Error al eliminar clase. Puede tener horarios asociados.",
        "error",
      );
      return;
    }
    setClasses((prev) => prev.filter((c) => c.id !== id));
    setConfirmDelete(null);
    showToast("Clase eliminada correctamente");
  };

  const getTipoBadgeClass = (tipo) => {
    const map = {
      bungee: "badge-bungee",
      yoga: "badge-yoga",
      pilates: "badge-pilates",
      funcional: "badge-funcional",
    };
    return map[tipo] || "badge-otro";
  };

  if (loading) return <p className="admin-classes-loading">Cargando clases…</p>;

  return (
    <div className="admin-classes">
      <div className="admin-classes-header">
        <div>
          <h2 className="admin-page-title">Gestión de Clases</h2>
          <p className="admin-page-subtitle">
            {classes.length} clase{classes.length !== 1 && "s"} registradas
          </p>
        </div>
        <button
          className="admin-btn-primary"
          onClick={() => setShowCreate(!showCreate)}>
          {showCreate ? "Cancelar" : "+ Nueva Clase"}
        </button>
      </div>

      {/* ── Formulario crear ── */}
      {showCreate && (
        <div className="admin-create-form">
          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={createForm.nombre}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, nombre: e.target.value }))
                }
                placeholder="Ej: Bungee Power"
              />
            </div>
            <div className="admin-form-group">
              <label>Tipo</label>
              <select
                value={createForm.tipo}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, tipo: e.target.value }))
                }>
                {TIPOS_CLASE.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-form-group">
              <label>Capacidad</label>
              <input
                type="number"
                min="1"
                value={createForm.capacidad}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, capacidad: e.target.value }))
                }
                placeholder="Ej: 15"
              />
            </div>
            <div className="admin-form-group">
              <label>Duración (min)</label>
              <input
                type="number"
                min="1"
                value={createForm.duracion}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, duracion: e.target.value }))
                }
                placeholder="Ej: 60"
              />
            </div>
            <div className="admin-form-group admin-form-full">
              <label>Descripción</label>
              <textarea
                value={createForm.descripcion}
                onChange={(e) =>
                  setCreateForm((f) => ({ ...f, descripcion: e.target.value }))
                }
                placeholder="Descripción de la clase…"
                rows={3}
              />
            </div>
          </div>
          <button className="admin-btn admin-btn-save" onClick={handleCreate}>
            Crear Clase
          </button>
        </div>
      )}

      {/* ── Filtros ── */}
      <div className="admin-users-filters">
        <input
          type="text"
          className="admin-filter-search"
          placeholder="Buscar por nombre…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="admin-filter-select"
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value)}>
          <option value="todos">Todos los tipos</option>
          {TIPOS_CLASE.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ── Cards ── */}
      {filtered.length === 0 ? (
        <p className="admin-users-empty">No se encontraron clases.</p>
      ) : (
        <div className="admin-classes-grid">
          {filtered.map((cls) => (
            <div
              key={cls.id}
              className={`admin-class-card${!cls.activo ? " inactive" : ""}`}>
              {editingId === cls.id ? (
                <div className="admin-class-edit">
                  <div className="admin-form-grid">
                    <div className="admin-form-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        value={editForm.nombre}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, nombre: e.target.value }))
                        }
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Tipo</label>
                      <select
                        value={editForm.tipo}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, tipo: e.target.value }))
                        }>
                        {TIPOS_CLASE.map((t) => (
                          <option key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label>Capacidad</label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.capacidad}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            capacidad: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Duración (min)</label>
                      <input
                        type="number"
                        min="1"
                        value={editForm.duracion}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            duracion: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Estado</label>
                      <select
                        value={editForm.activo ? "true" : "false"}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            activo: e.target.value === "true",
                          }))
                        }>
                        <option value="true">Activa</option>
                        <option value="false">Inactiva</option>
                      </select>
                    </div>
                    <div className="admin-form-group admin-form-full">
                      <label>Descripción</label>
                      <textarea
                        value={editForm.descripcion}
                        onChange={(e) =>
                          setEditForm((f) => ({
                            ...f,
                            descripcion: e.target.value,
                          }))
                        }
                        rows={2}
                      />
                    </div>
                  </div>
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
                </div>
              ) : (
                <>
                  <div className="admin-class-top">
                    <div>
                      <h3 className="admin-class-name">{cls.nombre}</h3>
                      <span
                        className={`admin-tipo-badge ${getTipoBadgeClass(cls.tipo)}`}>
                        {cls.tipo}
                      </span>
                      {!cls.activo && (
                        <span className="admin-inactive-badge">Inactiva</span>
                      )}
                    </div>
                  </div>
                  {cls.descripcion && (
                    <p className="admin-class-desc">{cls.descripcion}</p>
                  )}
                  <div className="admin-class-meta">
                    <span>👥 {cls.capacidad} cupos</span>
                    <span>⏱ {cls.duracion} min</span>
                  </div>
                  <div className="admin-actions">
                    {confirmDelete === cls.id ? (
                      <>
                        <button
                          className="admin-btn admin-btn-danger"
                          onClick={() => handleDelete(cls.id)}>
                          Confirmar
                        </button>
                        <button
                          className="admin-btn admin-btn-cancel"
                          onClick={() => setConfirmDelete(null)}>
                          No
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="admin-btn admin-btn-edit"
                          onClick={() => handleEdit(cls)}>
                          Editar
                        </button>
                        <button
                          className="admin-btn admin-btn-delete"
                          onClick={() => setConfirmDelete(cls.id)}>
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
