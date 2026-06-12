import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faUsers,
  faCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import WhatsAppButton from "../components/Home/WhatsAppButton";
import { useClases } from "../hooks/useClases";
import { useAuth } from "../context/AuthContext";
import "./Clases.css";

const tipoBadge = {
  bungee: "cl-tipo-bungee",
  yoga: "cl-tipo-yoga",
  pilates: "cl-tipo-pilates",
  funcional: "cl-tipo-funcional",
  otro: "cl-tipo-otro",
};

export default function Clases() {
  const { user } = useAuth();
  const {
    loading,
    days,
    tipos,
    instructores,
    filterTipo,
    setFilterTipo,
    filterInstructor,
    setFilterInstructor,
    search,
    setSearch,
    canBook,
    isReserved,
    handleBook,
    handleCancel,
    bookingId,
    prevWeek,
    nextWeek,
    goThisWeek,
    weekOffset,
    monday,
    sunday,
  } = useClases();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const formatDateRange = () => {
    const opts = { day: "numeric", month: "short" };
    const m = monday.toLocaleDateString("es-CL", opts);
    const s = sunday.toLocaleDateString("es-CL", opts);
    return `${m} — ${s}`;
  };

  const onReserve = (scheduleId) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    handleBook(scheduleId);
  };

  return (
    <>
      <Navbar />
      <div className="clases-page">
        <div className="clases-container">
          {/* Header */}
          <div className="clases-header">
            <div>
              <h1 className="clases-title">Reserva tu Clase</h1>
              <p className="clases-subtitle">
                Encuentra el horario perfecto y reserva tu lugar
              </p>
            </div>
            <div className="clases-legend">
              <span className="clases-legend-item">
                <FontAwesomeIcon icon={faCircle} className="legend-available" />{" "}
                Disponible
              </span>
              <span className="clases-legend-item">
                <FontAwesomeIcon icon={faCircle} className="legend-full" />{" "}
                Clase llena
              </span>
              <span className="clases-legend-item">
                <FontAwesomeIcon icon={faCircle} className="legend-reserved" />{" "}
                Reservada
              </span>
            </div>
          </div>

          {/* Filters */}
          <div className="clases-filters">
            <div className="clases-search-wrap">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="clases-search-icon"
              />
              <input
                type="text"
                placeholder="Buscar clase o instructora…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="clases-search"
              />
            </div>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="clases-select">
              <option value="todos">Disciplinas</option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={filterInstructor}
              onChange={(e) => setFilterInstructor(e.target.value)}
              className="clases-select">
              <option value="todos">Instructores</option>
              {instructores.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            {(filterTipo !== "todos" ||
              filterInstructor !== "todos" ||
              search) && (
              <button
                className="clases-clear-btn"
                onClick={() => {
                  setFilterTipo("todos");
                  setFilterInstructor("todos");
                  setSearch("");
                }}>
                Limpiar
              </button>
            )}
          </div>

          {/* Week navigation */}
          <div className="clases-week-nav">
            <button className="clases-nav-arrow" onClick={prevWeek}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="clases-week-days">
              {days.map((day) => (
                <div
                  key={day.dateStr}
                  className={`clases-day-header${day.isToday ? " today" : ""}`}>
                  <span className="clases-day-label">{day.label}</span>
                  <span className="clases-day-date">
                    {day.date.getDate()}/
                    {String(day.date.getMonth() + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
            <button className="clases-nav-arrow" onClick={nextWeek}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          {weekOffset !== 0 && (
            <button className="clases-today-btn" onClick={goThisWeek}>
              Ir a esta semana
            </button>
          )}

          {/* Grid */}
          {loading ? (
            <div className="clases-loading">Cargando horarios…</div>
          ) : (
            <div className="clases-grid">
              {days.map((day) => (
                <div key={day.dateStr} className="clases-day-col">
                  {day.items.length === 0 ? (
                    <div className="clases-empty-day">—</div>
                  ) : (
                    day.items.map((s) => {
                      const cap = s.classes?.capacidad || 0;
                      const disponibles = s.cupos_disponibles ?? 0;
                      const isFull = disponibles <= 0;
                      const reserved = isReserved(s.id);
                      const isBooking = bookingId === s.id;

                      return (
                        <div
                          key={s.id}
                          className={`clases-card${reserved ? " reserved" : ""}${isFull && !reserved ? " full" : ""}`}>
                          <div className="clases-card-status">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={
                                reserved
                                  ? "legend-reserved"
                                  : isFull
                                    ? "legend-full"
                                    : "legend-available"
                              }
                            />
                          </div>
                          <h3 className="clases-card-name">
                            {s.classes?.nombre}
                          </h3>
                          <span
                            className={`clases-card-tipo ${tipoBadge[s.classes?.tipo] || "cl-tipo-otro"}`}>
                            {s.classes?.tipo}
                          </span>
                          <p className="clases-card-instructor">
                            {s.instructor?.nombre || "Sin asignar"}
                          </p>
                          <div className="clases-card-details">
                            <span>
                              <FontAwesomeIcon icon={faClock} />{" "}
                              {s.hora_inicio?.slice(0, 5)}
                            </span>
                            <span>{s.classes?.duracion} min</span>
                          </div>
                          <div className="clases-card-cupos">
                            <FontAwesomeIcon icon={faUsers} /> {disponibles}/
                            {cap}
                          </div>

                          {reserved ? (
                            <button
                              className="clases-btn clases-btn-cancel"
                              onClick={() => handleCancel(s.id)}
                              disabled={isBooking}>
                              {isBooking ? "Cancelando…" : "Cancelar reserva"}
                            </button>
                          ) : isFull ? (
                            <span className="clases-full-label">
                              Clase llena
                            </span>
                          ) : canBook ? (
                            <button
                              className="clases-btn clases-btn-book"
                              onClick={() => onReserve(s.id)}
                              disabled={isBooking}>
                              {isBooking ? "Reservando…" : "Reservar"}
                            </button>
                          ) : !user ? (
                            <button
                              className="clases-btn clases-btn-book"
                              onClick={() => setShowLoginModal(true)}>
                              Reservar
                            </button>
                          ) : (
                            <span className="clases-no-book">
                              Solo clientes
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="clases-range-label">{formatDateRange()}</p>
        </div>
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div
          className="clases-modal-backdrop"
          onClick={() => setShowLoginModal(false)}>
          <div className="clases-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="clases-modal-close"
              onClick={() => setShowLoginModal(false)}>
              ✕
            </button>
            <img
              src="/sublogo.png"
              alt="BellaFit"
              className="clases-modal-icon"
            />
            <h2>Inicia sesión para reservar</h2>
            <p>
              Para reservar una clase necesitas tener una cuenta en BellaFit.
            </p>
            <Link
              to="/login"
              className="clases-modal-btn"
              onClick={() => setShowLoginModal(false)}>
              Iniciar Sesión
            </Link>
            <p className="clases-modal-register">
              ¿No tienes cuenta?{" "}
              <Link to="/registro" onClick={() => setShowLoginModal(false)}>
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      )}

      <WhatsAppButton />
      <Footer />
    </>
  );
}
