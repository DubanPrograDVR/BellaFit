"use client";

import { useMemo, useState } from "react";
import { Search, Clock, Users, X } from "lucide-react";
import {
  sesionesSemana,
  tiposClase,
  instructoras,
  diasSemana,
  type TipoClase,
} from "@/lib/clases";
import { Button } from "@/components/ui/button";
import styles from "./schedule.module.css";

const tipoLabel: Record<TipoClase, string> = {
  bungee: "Bungee",
  yoga: "Yoga",
  pilates: "Pilates",
  funcional: "Funcional",
  otro: "Otro",
};

export function Schedule() {
  const [tipo, setTipo] = useState<string>("todos");
  const [instructora, setInstructora] = useState<string>("todos");
  const [search, setSearch] = useState("");

  const hasFilters = tipo !== "todos" || instructora !== "todos" || search !== "";

  const days = useMemo(() => {
    const q = search.trim().toLowerCase();
    return diasSemana.map((label, index) => ({
      label,
      sesiones: sesionesSemana.filter((s) => {
        if (s.dia !== index) return false;
        if (tipo !== "todos" && s.tipo !== tipo) return false;
        if (instructora !== "todos" && s.instructora !== instructora)
          return false;
        if (
          q !== "" &&
          !s.nombre.toLowerCase().includes(q) &&
          !s.instructora.toLowerCase().includes(q)
        )
          return false;
        return true;
      }),
    }));
  }, [tipo, instructora, search]);

  const clearFilters = () => {
    setTipo("todos");
    setInstructora("todos");
    setSearch("");
  };

  return (
    <section aria-label="Horario semanal de clases">
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} aria-hidden />
          <input
            type="search"
            placeholder="Buscar clase o instructora…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.search}
            aria-label="Buscar clase o instructora"
          />
        </div>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className={styles.select}
          aria-label="Filtrar por disciplina"
        >
          <option value="todos">Todas las disciplinas</option>
          {tiposClase.map((t) => (
            <option key={t} value={t}>
              {tipoLabel[t]}
            </option>
          ))}
        </select>
        <select
          value={instructora}
          onChange={(e) => setInstructora(e.target.value)}
          className={styles.select}
          aria-label="Filtrar por instructora"
        >
          <option value="todos">Todas las instructoras</option>
          {instructoras.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        {hasFilters ? (
          <button className={styles.clearBtn} onClick={clearFilters}>
            <X size={14} aria-hidden /> Limpiar
          </button>
        ) : null}
      </div>

      <div className={styles.legend} aria-hidden>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotAvailable}`} /> Disponible
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotLow}`} /> Últimos cupos
        </span>
        <span className={styles.legendItem}>
          <i className={`${styles.dot} ${styles.dotFull}`} /> Clase llena
        </span>
      </div>

      <div className={styles.grid}>
        {days.map((day) => (
          <div key={day.label} className={styles.dayCol}>
            <h2 className={styles.dayTitle}>{day.label}</h2>
            {day.sesiones.length === 0 ? (
              <p className={styles.emptyDay}>Sin clases</p>
            ) : (
              day.sesiones.map((s) => {
                const isFull = s.cuposDisponibles <= 0;
                const isLow = !isFull && s.cuposDisponibles <= 2;
                return (
                  <article
                    key={s.id}
                    className={`${styles.card} ${isFull ? styles.cardFull : ""}`}
                  >
                    <div className={styles.cardTop}>
                      <span
                        className={`${styles.tipoBadge} ${styles[`tipo_${s.tipo}`]}`}
                      >
                        {tipoLabel[s.tipo]}
                      </span>
                      <i
                        className={`${styles.dot} ${
                          isFull
                            ? styles.dotFull
                            : isLow
                              ? styles.dotLow
                              : styles.dotAvailable
                        }`}
                        aria-hidden
                      />
                    </div>
                    <h3 className={styles.cardName}>{s.nombre}</h3>
                    <p className={styles.cardInstructor}>{s.instructora}</p>
                    <div className={styles.cardMeta}>
                      <span>
                        <Clock size={13} aria-hidden /> {s.horaInicio} ·{" "}
                        {s.duracionMin} min
                      </span>
                      <span>
                        <Users size={13} aria-hidden /> {s.cuposDisponibles}/
                        {s.capacidad}
                      </span>
                    </div>
                    {isFull ? (
                      <span className={styles.fullLabel}>Clase llena</span>
                    ) : (
                      <Button size="sm" fullWidth>
                        Reservar
                      </Button>
                    )}
                  </article>
                );
              })
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
