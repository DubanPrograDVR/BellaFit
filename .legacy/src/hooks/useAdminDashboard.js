import { useEffect, useState } from "react";
import {
  getOrders,
  getTotalStock,
  getMonthReservations,
  getUsers,
} from "../lib/admin";

export function useAdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [monthReservations, setMonthReservations] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [salesView, setSalesView] = useState("diario"); // diario | mensual

  useEffect(() => {
    const load = async () => {
      const [ordersRes, stockRes, reservRes, usersRes] = await Promise.all([
        getOrders(),
        getTotalStock(),
        getMonthReservations(),
        getUsers(),
      ]);

      if (ordersRes.data) setOrders(ordersRes.data);
      setTotalStock(stockRes.total ?? 0);
      if (reservRes.data) setMonthReservations(reservRes.data);
      if (usersRes.data) setTotalUsers(usersRes.data.length);
      setLoading(false);
    };

    void load();
  }, []);

  // ── Sales chart data ──
  const dailySales = (() => {
    const map = {};
    const now = new Date();

    // Last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map[key] = 0;
    }

    orders.forEach((o) => {
      const key = o.created_at.slice(0, 10);
      if (map[key] !== undefined) {
        map[key] += Number(o.total) || 0;
      }
    });

    return Object.entries(map).map(([date, total]) => ({
      label: new Date(date + "T12:00:00").toLocaleDateString("es-CL", {
        day: "numeric",
        month: "short",
      }),
      total,
    }));
  })();

  const monthlySales = (() => {
    const map = {};
    const now = new Date();

    // Last 12 months
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().slice(0, 7); // YYYY-MM
      map[key] = 0;
    }

    orders.forEach((o) => {
      const key = o.created_at.slice(0, 7);
      if (map[key] !== undefined) {
        map[key] += Number(o.total) || 0;
      }
    });

    return Object.entries(map).map(([month, total]) => {
      const [y, m] = month.split("-");
      const d = new Date(Number(y), Number(m) - 1, 1);
      return {
        label: d.toLocaleDateString("es-CL", {
          month: "short",
          year: "2-digit",
        }),
        total,
      };
    });
  })();

  const salesData = salesView === "diario" ? dailySales : monthlySales;

  const totalSales = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  // ── Top classes by reservations this month ──
  const topClasses = (() => {
    const map = {};

    monthReservations.forEach((r) => {
      const cls = r.schedule?.classes;
      if (!cls) return;
      if (!map[cls.id]) {
        map[cls.id] = {
          id: cls.id,
          nombre: cls.nombre,
          tipo: cls.tipo,
          capacidad: cls.capacidad,
          reservas: 0,
        };
      }
      map[cls.id].reservas++;
    });

    return Object.values(map).sort((a, b) => b.reservas - a.reservas);
  })();

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);

  return {
    loading,
    salesData,
    salesView,
    setSalesView,
    totalSales,
    totalStock,
    totalUsers,
    topClasses,
    totalOrders: orders.length,
    formatPrice,
  };
}
