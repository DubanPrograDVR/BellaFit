import { useState, useEffect, useCallback } from "react";
import { getInstructorStats } from "../lib/instructor";
import { useAuth } from "../context/AuthContext";

export function useInstructorEstadisticas() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getInstructorStats(user.id);
    setStats(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  return { loading, stats };
}
