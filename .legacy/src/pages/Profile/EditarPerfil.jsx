import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "./utils";
import useEditarPerfil from "./hooks/useEditarPerfil";

export default function EditarPerfil({ profile, setProfile, dbProfile }) {
  const { editing, editDraft, startEdit, cancelEdit, saveEdit, updateDraft } =
    useEditarPerfil({ profile, setProfile });

  return (
    <div className="perfil-editar">
      <h2>Editar Perfil</h2>
      <p className="perfil-editar-sub">
        Modifica tus datos personales. RUT y fecha de nacimiento no pueden ser
        editados.
      </p>

      <div className="perfil-editar-form">
        {/* Nombre */}
        <div className="perfil-edit-field">
          <label>Nombre</label>
          {editing ? (
            <input
              type="text"
              value={editDraft.nombre}
              onChange={(e) => updateDraft("nombre", e.target.value)}
            />
          ) : (
            <span className="perfil-edit-value">{profile.nombre}</span>
          )}
        </div>

        {/* Teléfono */}
        <div className="perfil-edit-field">
          <label>Teléfono</label>
          {editing ? (
            <input
              type="tel"
              value={editDraft.telefono}
              onChange={(e) => updateDraft("telefono", e.target.value)}
            />
          ) : (
            <span className="perfil-edit-value">{profile.telefono}</span>
          )}
        </div>

        {/* Dirección */}
        <div className="perfil-edit-field">
          <label>Dirección</label>
          {editing ? (
            <input
              type="text"
              value={editDraft.direccion}
              onChange={(e) => updateDraft("direccion", e.target.value)}
            />
          ) : (
            <span className="perfil-edit-value">{profile.direccion}</span>
          )}
        </div>

        {/* RUT - bloqueado */}
        <div className="perfil-edit-field disabled">
          <label>
            RUT{" "}
            <span className="perfil-lock">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </label>
          <span className="perfil-edit-value">{dbProfile.rut || "—"}</span>
        </div>

        {/* Fecha nacimiento - bloqueado */}
        <div className="perfil-edit-field disabled">
          <label>
            Fecha de nacimiento{" "}
            <span className="perfil-lock">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </label>
          <span className="perfil-edit-value">
            {dbProfile.fecha_nacimiento
              ? formatDate(dbProfile.fecha_nacimiento)
              : "—"}
          </span>
        </div>

        {/* Email - solo lectura */}
        <div className="perfil-edit-field disabled">
          <label>
            Email{" "}
            <span className="perfil-lock">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </label>
          <span className="perfil-edit-value">{dbProfile.email}</span>
        </div>

        {/* Botones */}
        <div className="perfil-edit-actions">
          {editing ? (
            <>
              <button className="perfil-edit-save" onClick={saveEdit}>
                Guardar cambios
              </button>
              <button className="perfil-edit-cancel" onClick={cancelEdit}>
                Cancelar
              </button>
            </>
          ) : (
            <button className="perfil-edit-start" onClick={startEdit}>
              Editar datos
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
