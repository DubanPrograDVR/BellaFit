import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import WhatsAppButton from "../components/Home/WhatsAppButton";
import {
  comprasActivas,
  comprasPasadas,
  historialPagos,
} from "./data/perfilData";
import { getProfile } from "../lib/auth";
import { supabase } from "../lib/supabase";
import "./Profile.css";

const SECTIONS = [
  { id: "resumen", label: "Resumen", icon: "👤" },
  { id: "compras", label: "Mis Compras", icon: "🛍️" },
  { id: "pagos", label: "Historial de Pagos", icon: "💳" },
  { id: "editar", label: "Editar Perfil", icon: "✏️" },
];

function formatPrice(n) {
  return "$" + n.toLocaleString("es-CL");
}

function formatDate(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function estadoBadge(estado) {
  const map = {
    activo: "badge-activo",
    enviado: "badge-enviado",
    entregado: "badge-entregado",
    expirado: "badge-expirado",
    aprobado: "badge-aprobado",
  };
  return map[estado] || "";
}

export default function Profile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("resumen");
  const [editing, setEditing] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Datos que vienen de la BD (campos editables)
  const [profile, setProfile] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });
  const [editDraft, setEditDraft] = useState(profile);

  // Datos inmutables de la BD
  const [dbProfile, setDbProfile] = useState(null);

  useEffect(() => {
    getProfile().then(({ data, error }) => {
      if (error || !data) {
        navigate("/login");
        return;
      }
      setDbProfile(data);
      const editable = {
        nombre: data.nombre || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
      };
      setProfile(editable);
      setEditDraft(editable);
      setLoadingProfile(false);
    });
  }, [navigate]);

  const startEdit = () => {
    setEditDraft(profile);
    setEditing(true);
  };

  const cancelEdit = () => setEditing(false);

  const saveEdit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase
      .from("profiles")
      .update({
        nombre: editDraft.nombre,
        telefono: editDraft.telefono,
        direccion: editDraft.direccion,
      })
      .eq("id", user.id);
    setProfile(editDraft);
    setEditing(false);
  };

  if (loadingProfile) {
    return (
      <>
        <Navbar />
        <div className="perfil-loading">
          <p>Cargando perfil...</p>
        </div>
      </>
    );
  }

  // ── Resumen ──
  const renderResumen = () => (
    <div className="perfil-resumen">
      <div className="perfil-resumen-header">
        <div className="perfil-avatar-lg">
          {profile.nombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2>{profile.nombre}</h2>
          <p className="perfil-email">{dbProfile.email}</p>
          <span className="perfil-plan-badge">
            {dbProfile.roles?.nombre || "cliente"}
          </span>
        </div>
      </div>

      <div className="perfil-info-grid">
        <div className="perfil-info-item">
          <span className="perfil-info-label">Teléfono</span>
          <span className="perfil-info-value">{profile.telefono}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Dirección</span>
          <span className="perfil-info-value">{profile.direccion}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">RUT</span>
          <span className="perfil-info-value">{dbProfile.rut || "—"}</span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Fecha de nacimiento</span>
          <span className="perfil-info-value">
            {dbProfile.fecha_nacimiento
              ? formatDate(dbProfile.fecha_nacimiento)
              : "—"}
          </span>
        </div>
        <div className="perfil-info-item">
          <span className="perfil-info-label">Miembro desde</span>
          <span className="perfil-info-value">
            {formatDate(dbProfile.created_at)}
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div className="perfil-stats">
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{comprasActivas.length}</span>
          <span className="perfil-stat-label">Compras activas</span>
        </div>
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{comprasPasadas.length}</span>
          <span className="perfil-stat-label">Compras pasadas</span>
        </div>
        <div className="perfil-stat-card">
          <span className="perfil-stat-num">{historialPagos.length}</span>
          <span className="perfil-stat-label">Pagos realizados</span>
        </div>
      </div>
    </div>
  );

  // ── Compras ──
  const renderCompras = () => (
    <div className="perfil-compras">
      <h2>Compras Activas</h2>
      {comprasActivas.length === 0 ? (
        <p className="perfil-empty">No tienes compras activas</p>
      ) : (
        <div className="perfil-compras-list">
          {comprasActivas.map((c) => (
            <div key={c.id} className="perfil-compra-card">
              <div className="perfil-compra-info">
                <span className="perfil-compra-tipo">
                  {c.tipo === "plan" ? "📋 Plan" : "📦 Producto"}
                </span>
                <h3>{c.nombre}</h3>
                <p>Comprado el {formatDate(c.fecha_compra)}</p>
                {c.fecha_expiracion && (
                  <p>Vence: {formatDate(c.fecha_expiracion)}</p>
                )}
                {c.tracking && (
                  <p className="perfil-tracking">Tracking: {c.tracking}</p>
                )}
              </div>
              <div className="perfil-compra-right">
                <span className="perfil-compra-precio">
                  {formatPrice(c.precio)}
                </span>
                <span className={`perfil-badge ${estadoBadge(c.estado)}`}>
                  {c.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="perfil-section-subtitle">Compras Pasadas</h2>
      {comprasPasadas.length === 0 ? (
        <p className="perfil-empty">No hay compras anteriores</p>
      ) : (
        <div className="perfil-compras-list">
          {comprasPasadas.map((c) => (
            <div key={c.id} className="perfil-compra-card pasada">
              <div className="perfil-compra-info">
                <span className="perfil-compra-tipo">
                  {c.tipo === "plan" ? "📋 Plan" : "📦 Producto"}
                </span>
                <h3>{c.nombre}</h3>
                <p>Comprado el {formatDate(c.fecha_compra)}</p>
              </div>
              <div className="perfil-compra-right">
                <span className="perfil-compra-precio">
                  {formatPrice(c.precio)}
                </span>
                <span className={`perfil-badge ${estadoBadge(c.estado)}`}>
                  {c.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="perfil-compras-cta">
        <Link to="/tienda" className="perfil-cta-btn">
          Ir a la Tienda
        </Link>
      </div>
    </div>
  );

  // ── Pagos ──
  const renderPagos = () => (
    <div className="perfil-pagos">
      <h2>Historial de Pagos</h2>
      <div className="perfil-pagos-table-wrap">
        <table className="perfil-pagos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Método</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Boleta</th>
            </tr>
          </thead>
          <tbody>
            {historialPagos.map((p) => (
              <tr key={p.id}>
                <td>{formatDate(p.fecha)}</td>
                <td>{p.concepto}</td>
                <td>{p.metodo}</td>
                <td className="perfil-pago-monto">{formatPrice(p.monto)}</td>
                <td>
                  <span className={`perfil-badge ${estadoBadge(p.estado)}`}>
                    {p.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="perfil-boleta-btn"
                    onClick={() =>
                      alert(`Descargando boleta ${p.boleta} (simulado)`)
                    }>
                    📄 {p.boleta}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ── Editar perfil ──
  const renderEditar = () => (
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
              onChange={(e) =>
                setEditDraft({ ...editDraft, nombre: e.target.value })
              }
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
              onChange={(e) =>
                setEditDraft({ ...editDraft, telefono: e.target.value })
              }
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
              onChange={(e) =>
                setEditDraft({ ...editDraft, direccion: e.target.value })
              }
            />
          ) : (
            <span className="perfil-edit-value">{profile.direccion}</span>
          )}
        </div>

        {/* RUT - bloqueado */}
        <div className="perfil-edit-field disabled">
          <label>
            RUT <span className="perfil-lock">🔒</span>
          </label>
          <span className="perfil-edit-value">{dbProfile.rut || "—"}</span>
        </div>

        {/* Fecha nacimiento - bloqueado */}
        <div className="perfil-edit-field disabled">
          <label>
            Fecha de nacimiento <span className="perfil-lock">🔒</span>
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
            Email <span className="perfil-lock">🔒</span>
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

  const RENDER_MAP = {
    resumen: renderResumen,
    compras: renderCompras,
    pagos: renderPagos,
    editar: renderEditar,
  };

  return (
    <>
      <Navbar />
      <div className="perfil-page">
        {/* ── Sidebar ── */}
        <aside className="perfil-sidebar">
          <div className="perfil-sidebar-header">
            <div className="perfil-avatar-sm">
              {profile.nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="perfil-sidebar-name">{profile.nombre}</p>
              <p className="perfil-sidebar-plan">
                {dbProfile.roles?.nombre || "cliente"}
              </p>
            </div>
          </div>

          <nav className="perfil-sidebar-nav">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                className={`perfil-sidebar-btn${activeSection === s.id ? " active" : ""}`}
                onClick={() => setActiveSection(s.id)}>
                <span className="perfil-sidebar-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>

          <Link to="/tienda" className="perfil-sidebar-cta">
            🛒 Comprar productos
          </Link>
        </aside>

        {/* ── Contenido ── */}
        <main className="perfil-content">{RENDER_MAP[activeSection]()}</main>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
