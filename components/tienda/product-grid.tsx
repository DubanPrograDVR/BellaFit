"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  categorias,
  productos,
  formatPrecio,
  type CategoriaId,
} from "@/lib/shop";
import { Button } from "@/components/ui/button";
import styles from "./product-grid.module.css";

export function ProductGrid() {
  const [categoria, setCategoria] = useState<CategoriaId>("todos");

  const visibles = useMemo(
    () =>
      categoria === "todos"
        ? productos
        : productos.filter((p) => p.categoria === categoria),
    [categoria],
  );

  return (
    <section aria-label="Catálogo de productos">
      <div className={styles.tabs} role="tablist" aria-label="Categorías">
        {categorias.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={categoria === c.id}
            className={`${styles.tab} ${categoria === c.id ? styles.tabActive : ""}`}
            onClick={() => setCategoria(c.id)}
          >
            {c.nombre}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibles.map((p) => (
          <article key={p.id} className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src={p.imagen || "/placeholder.svg"}
                alt={p.nombre}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={styles.image}
              />
              {p.badge ? (
                <span
                  className={`${styles.badge} ${styles[`badge_${p.badge}`]}`}
                >
                  {p.badge}
                </span>
              ) : null}
              {!p.stock ? (
                <span className={styles.outOfStock}>Agotado</span>
              ) : null}
            </div>
            <div className={styles.body}>
              <h3 className={styles.name}>{p.nombre}</h3>
              <p className={styles.description}>{p.descripcion}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{formatPrecio(p.precio)}</span>
                {p.precioAnterior ? (
                  <s className={styles.priceOld}>
                    {formatPrecio(p.precioAnterior)}
                  </s>
                ) : null}
              </div>
              <Button size="sm" fullWidth disabled={!p.stock}>
                {p.stock ? "Agregar al carrito" : "Sin stock"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
