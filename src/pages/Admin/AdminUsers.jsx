import { useState, useEffect, useCallback } from "react";
import { getUsers, getRoles, updateUser, deleteUser } from "../../lib/admin";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import "./AdminUsers.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("todos");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const currentUserId = currentUser?.id;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);
    if (usersRes.data) setUsers(usersRes.data);
    if (rolesRes.data) setRoles(rolesRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      !search ||
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.rut?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "todos" || u.roles?.nombre === filterRole;
    return matchSearch && matchRole;
  });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setEditForm({
      nombre: user.nombre || "",
      email: user.email || "",
      telefono: user.telefono || "",
      direccion: user.direccion || "",
      rut: user.rut || "",
      role_id: user.role_id || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    if (editingUser === currentUserId) {
      showToast("No puedes modificar tu propia cuenta desde aquí", "error");
      return;
    }
    const { data, error } = await updateUser(editingUser, editForm);
    if (error) {
      showToast("Error al actualizar usuario", "error");
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === editingUser ? data : u)));
    setEditingUser(null);
    setEditForm({});
    showToast("Usuario actualizado correctamente");
  };

  const handleDelete = async (id) => {
    if (id === currentUserId) {
      showToast("No puedes eliminar tu propia cuenta", "error");
      return;
    }
    const { error } = await deleteUser(id);
    if (error) {
      showToast("Error al eliminar usuario", "error");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setConfirmDelete(null);
    showToast("Usuario eliminado correctamente");
  };

  const getRoleBadgeClass = (roleName) => {
    const map = {
      admin: "badge-admin",
      instructor: "badge-instructor",
      cliente: "badge-cliente",
    };
    return map[roleName] || "badge-cliente";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <p className="admin-users-loading">Cargando usuarios…</p>;
  }

  return (
    <div className="admin-users">
      <div className="admin-users-header">
        <div>
          <h2 className="admin-page-title">Gestión de Usuarios</h2>
          <p className="admin-page-subtitle">
            {users.length} usuario{users.length !== 1 && "s"} registrados
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="admin-users-filters">
        <input
          type="text"
          className="admin-filter-search"
          placeholder="Buscar por nombre, email o RUT…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="admin-filter-select"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}>
          <option value="todos">Todos los roles</option>
          {roles.map((r) => (
            <option key={r.id} value={r.nombre}>
              {r.nombre.charAt(0).toUpperCase() + r.nombre.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      {filteredUsers.length === 0 ? (
        <p className="admin-users-empty">No se encontraron usuarios.</p>
      ) : (
        <div className="admin-users-table-wrap">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>RUT</th>
                <th>Rol</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  {editingUser === user.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="admin-edit-input"
                          value={editForm.nombre}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              nombre: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="admin-edit-input"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="admin-edit-input"
                          value={editForm.telefono}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              telefono: e.target.value,
                            }))
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="admin-edit-input"
                          value={editForm.rut}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, rut: e.target.value }))
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="admin-edit-select"
                          value={editForm.role_id}
                          onChange={(e) =>
                            setEditForm((f) => ({
                              ...f,
                              role_id: e.target.value,
                            }))
                          }>
                          {roles.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.nombre.charAt(0).toUpperCase() +
                                r.nombre.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{formatDate(user.created_at)}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            className="admin-btn admin-btn-save"
                            onClick={handleSaveEdit}>
                            Guardar
                          </button>
                          <button
                            className="admin-btn admin-btn-cancel"
                            onClick={handleCancelEdit}>
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="admin-user-name">
                        <span className="admin-user-avatar">
                          {user.nombre?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                        {user.nombre || "Sin nombre"}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.telefono || "—"}</td>
                      <td>{user.rut || "—"}</td>
                      <td>
                        <span
                          className={`admin-role-badge ${getRoleBadgeClass(user.roles?.nombre)}`}>
                          {user.roles?.nombre || "sin rol"}
                        </span>
                      </td>
                      <td>{formatDate(user.created_at)}</td>
                      <td>
                        {confirmDelete === user.id ? (
                          <div className="admin-actions">
                            <button
                              className="admin-btn admin-btn-danger"
                              onClick={() => handleDelete(user.id)}>
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
                            {user.id === currentUserId ? (
                              <span className="admin-self-badge">Tú</span>
                            ) : (
                              <>
                                <button
                                  className="admin-btn admin-btn-edit"
                                  onClick={() => handleEdit(user)}>
                                  Editar
                                </button>
                                <button
                                  className="admin-btn admin-btn-delete"
                                  onClick={() => setConfirmDelete(user.id)}>
                                  Eliminar
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
