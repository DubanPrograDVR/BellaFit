import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "equipo", nombre: "Equipo" },
  { id: "ropa", nombre: "Ropa" },
  { id: "accesorios", nombre: "Accesorios" },
  { id: "suplementos", nombre: "Suplementos" },
  { id: "botellas", nombre: "Botellas" },
  { id: "giftcards", nombre: "Gift Cards" },
];

export function useTienda() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("activo", true)
        .order("created_at", { ascending: false });

      if (!ignore && data) setProductos(data);
      setLoading(false);
    };

    void load();

    // Realtime
    const channel = supabase
      .channel("tienda-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new.activo) {
            setProductos((prev) => {
              if (prev.some((p) => p.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            if (!payload.new.activo) {
              setProductos((prev) =>
                prev.filter((p) => p.id !== payload.new.id),
              );
            } else {
              setProductos((prev) => {
                const exists = prev.some((p) => p.id === payload.new.id);
                if (exists) {
                  return prev.map((p) =>
                    p.id === payload.new.id ? { ...p, ...payload.new } : p,
                  );
                }
                return [payload.new, ...prev];
              });
            }
          } else if (payload.eventType === "DELETE") {
            setProductos((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        },
      )
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const getCategoryName = (catId) =>
    CATEGORIAS.find((c) => c.id === catId)?.nombre || catId;

  return { productos, loading, categorias: CATEGORIAS, getCategoryName };
}
