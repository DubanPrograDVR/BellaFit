import { useEffect, useState } from "react";
import {
  getAllProfiles,
  getRecentReservations,
  getCancelledReservations,
  getLowStockProducts,
} from "../lib/admin";
import { supabase } from "../lib/supabase";

function getUpcomingBirthdays(profiles, days = 7) {
  if (!profiles?.length) return [];

  const today = new Date();
  const currentYear = today.getFullYear();

  return profiles
    .filter((p) => p.fecha_nacimiento)
    .map((p) => {
      const birth = new Date(p.fecha_nacimiento + "T00:00:00");
      const birthdayThisYear = new Date(
        currentYear,
        birth.getMonth(),
        birth.getDate(),
      );

      // If birthday already passed this year, check next year
      if (birthdayThisYear < today) {
        birthdayThisYear.setFullYear(currentYear + 1);
      }

      const diffMs = birthdayThisYear - today;
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      return { ...p, daysUntil: diffDays, birthdayDate: birthdayThisYear };
    })
    .filter((p) => p.daysUntil >= 0 && p.daysUntil <= days)
    .sort((a, b) => a.daysUntil - b.daysUntil);
}

function getNewUsers(profiles, hoursAgo = 48) {
  if (!profiles?.length) return [];
  const since = Date.now() - hoursAgo * 60 * 60 * 1000;
  return profiles.filter((p) => new Date(p.created_at).getTime() >= since);
}

export function useAdminNotifications() {
  const [profiles, setProfiles] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    const [profilesRes, recentRes, cancelledRes, stockRes] = await Promise.all([
      getAllProfiles(),
      getRecentReservations(),
      getCancelledReservations(),
      getLowStockProducts(),
    ]);

    if (profilesRes.data) setProfiles(profilesRes.data);
    if (recentRes.data) setRecentReservations(recentRes.data);
    if (cancelledRes.data) setCancelledReservations(cancelledRes.data);
    if (stockRes.data) setLowStockProducts(stockRes.data);
    setLoading(false);
  };

  useEffect(() => {
    void loadAll();

    const channel = supabase
      .channel("admin-notifications-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        () => {
          getRecentReservations().then((r) => {
            if (r.data) setRecentReservations(r.data);
          });
          getCancelledReservations().then((r) => {
            if (r.data) setCancelledReservations(r.data);
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => {
          getAllProfiles().then((r) => {
            if (r.data) setProfiles(r.data);
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          getLowStockProducts().then((r) => {
            if (r.data) setLowStockProducts(r.data);
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const birthdays = getUpcomingBirthdays(profiles);
  const newUsers = getNewUsers(profiles);

  const totalCount =
    birthdays.length +
    recentReservations.length +
    cancelledReservations.length +
    lowStockProducts.length +
    newUsers.length;

  return {
    birthdays,
    recentReservations,
    cancelledReservations,
    lowStockProducts,
    newUsers,
    loading,
    totalCount,
  };
}
