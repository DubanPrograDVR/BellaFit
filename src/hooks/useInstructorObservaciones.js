import { useState, useEffect, useCallback } from "react";
import {
  getInstructorAllSchedules,
  getObservations,
  createObservation,
  deleteObservation,
} from "../lib/instructor";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function useInstructorObservaciones() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingObs, setLoadingObs] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  const loadSchedules = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await getInstructorAllSchedules(user.id);
    setSchedules(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadSchedules();
  }, [loadSchedules]);

  const selectSchedule = async (scheduleId) => {
    setSelectedSchedule(scheduleId);
    if (!scheduleId) {
      setObservations([]);
      return;
    }
    setLoadingObs(true);
    const { data } = await getObservations(scheduleId);
    setObservations(data || []);
    setLoadingObs(false);
  };

  const addObservation = async () => {
    if (!newNote.trim() || !selectedSchedule || !user) return;
    setSaving(true);
    const { error } = await createObservation(
      selectedSchedule,
      user.id,
      newNote.trim(),
    );
    if (error) {
      showToast("Error al guardar observación", "error");
    } else {
      showToast("Observación guardada");
      setNewNote("");
      const { data } = await getObservations(selectedSchedule);
      setObservations(data || []);
    }
    setSaving(false);
  };

  const removeObservation = async (obsId) => {
    const { error } = await deleteObservation(obsId);
    if (error) {
      showToast("Error al eliminar", "error");
    } else {
      showToast("Observación eliminada");
      setObservations((prev) => prev.filter((o) => o.id !== obsId));
    }
  };

  const selected = schedules.find((s) => s.id === selectedSchedule);

  return {
    loading,
    loadingObs,
    schedules,
    selectedSchedule,
    selectSchedule,
    selected,
    observations,
    newNote,
    setNewNote,
    saving,
    addObservation,
    removeObservation,
  };
}
