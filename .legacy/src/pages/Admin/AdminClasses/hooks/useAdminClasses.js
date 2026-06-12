import { useEffect, useState } from "react";
import {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getInstructors,
} from "../../../../lib/admin";
import { supabase } from "../../../../lib/supabase";
import { useToast } from "../../../../context/ToastContext";

const TIPOS_CLASE = ["bungee", "yoga", "pilates", "funcional", "otro"];

const emptyClassForm = {
  nombre: "",
  tipo: "bungee",
  descripcion: "",
  capacidad: "",
  duracion: "",
};

const emptyScheduleForm = {
  instructor_id: "",
  fecha: "",
  hora_inicio: "",
  hora_fin: "",
};

const sortSchedules = (items) =>
  [...items].sort((a, b) => {
    const dateCompare = (a.fecha || "").localeCompare(b.fecha || "");

    if (dateCompare !== 0) return dateCompare;

    return (a.hora_inicio || "").localeCompare(b.hora_inicio || "");
  });

const hasScheduleInput = (form) =>
  Boolean(
    form.fecha || form.hora_inicio || form.hora_fin || form.instructor_id,
  );

export function useAdminClasses() {
  const [classes, setClasses] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(emptyClassForm);
  const [createScheduleForm, setCreateScheduleForm] =
    useState(emptyScheduleForm);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [scheduleEditor, setScheduleEditor] = useState({
    classId: null,
    scheduleId: null,
    form: emptyScheduleForm,
  });
  const [confirmDeleteClassId, setConfirmDeleteClassId] = useState(null);
  const [confirmDeleteScheduleId, setConfirmDeleteScheduleId] = useState(null);
  const { showToast } = useToast();

  const resetCreateState = () => {
    setCreateForm(emptyClassForm);
    setCreateScheduleForm(emptyScheduleForm);
    setShowCreate(false);
  };

  const closeScheduleEditor = () => {
    setScheduleEditor({
      classId: null,
      scheduleId: null,
      form: emptyScheduleForm,
    });
    setConfirmDeleteScheduleId(null);
  };

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      const [classesRes, schedulesRes, instructorsRes] = await Promise.all([
        getClasses(),
        getSchedules(),
        getInstructors(),
      ]);

      if (ignore) return;

      if (classesRes.data) setClasses(classesRes.data);
      if (schedulesRes.data) setSchedules(sortSchedules(schedulesRes.data));
      if (instructorsRes.data) setInstructors(instructorsRes.data);
      setLoading(false);
    };

    void loadData();

    return () => {
      ignore = true;
    };
  }, []);

  // ── Realtime subscriptions ──
  useEffect(() => {
    const channel = supabase
      .channel("admin-classes-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "classes" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setClasses((prev) => {
              if (prev.some((c) => c.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          } else if (payload.eventType === "UPDATE") {
            setClasses((prev) =>
              prev.map((c) =>
                c.id === payload.new.id ? { ...c, ...payload.new } : c,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setClasses((prev) => prev.filter((c) => c.id !== payload.old.id));
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "class_schedules" },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            setSchedules((prev) => prev.filter((s) => s.id !== payload.old.id));
            return;
          }
          // For INSERT/UPDATE, re-fetch the row with joins
          const { data } = await supabase
            .from("class_schedules")
            .select(
              "*, classes(id, nombre, tipo, capacidad), instructor:profiles!instructor_id(id, nombre)",
            )
            .eq("id", payload.new.id)
            .single();

          if (!data) return;

          if (payload.eventType === "INSERT") {
            setSchedules((prev) => {
              if (prev.some((s) => s.id === data.id)) return prev;
              return sortSchedules([...prev, data]);
            });
          } else if (payload.eventType === "UPDATE") {
            setSchedules((prev) =>
              sortSchedules(prev.map((s) => (s.id === data.id ? data : s))),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const validateClassForm = (form) => {
    if (!form.nombre.trim() || !form.capacidad || !form.duracion) {
      showToast("Completa nombre, capacidad y duración", "error");
      return false;
    }

    return true;
  };

  const validateScheduleForm = (form, message) => {
    if (!form.fecha || !form.hora_inicio || !form.hora_fin) {
      showToast(message || "Completa fecha y horas", "error");
      return false;
    }

    if (form.hora_fin <= form.hora_inicio) {
      showToast("La hora de fin debe ser mayor a la de inicio", "error");
      return false;
    }

    return true;
  };

  const filteredClasses = classes.filter((classItem) => {
    const matchSearch =
      !search || classItem.nombre?.toLowerCase().includes(search.toLowerCase());
    const matchTipo = filterTipo === "todos" || classItem.tipo === filterTipo;

    return matchSearch && matchTipo;
  });

  const getClassSchedules = (classId) =>
    sortSchedules(
      schedules.filter((schedule) => schedule.class_id === classId),
    );

  const toggleCreateForm = () => {
    if (showCreate) {
      resetCreateState();
      return;
    }

    handleCancelEdit();
    closeScheduleEditor();
    setConfirmDeleteClassId(null);
    setShowCreate(true);
  };

  const updateCreateFormField = (field, value) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateCreateScheduleFormField = (field, value) => {
    setCreateScheduleForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateEditFormField = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCreate = async () => {
    if (!validateClassForm(createForm)) return;

    const wantsInitialSchedule = hasScheduleInput(createScheduleForm);

    if (
      wantsInitialSchedule &&
      !validateScheduleForm(
        createScheduleForm,
        "Si programas una primera fecha, completa fecha y horas",
      )
    ) {
      return;
    }

    const classPayload = {
      ...createForm,
      capacidad: Number.parseInt(createForm.capacidad, 10),
      duracion: Number.parseInt(createForm.duracion, 10),
    };

    const { data: createdClass, error: classError } =
      await createClass(classPayload);

    if (classError) {
      showToast("Error al crear clase", "error");
      return;
    }

    setClasses((prev) => [createdClass, ...prev]);

    if (wantsInitialSchedule) {
      const schedulePayload = {
        class_id: createdClass.id,
        instructor_id: createScheduleForm.instructor_id || null,
        fecha: createScheduleForm.fecha,
        hora_inicio: createScheduleForm.hora_inicio,
        hora_fin: createScheduleForm.hora_fin,
        cupos_disponibles: createdClass.capacidad,
      };

      const { data: createdSchedule, error: scheduleError } =
        await createSchedule(schedulePayload);

      if (scheduleError) {
        resetCreateState();
        showToast(
          "Clase creada, pero no se pudo programar la primera fecha",
          "error",
        );
        return;
      }

      setSchedules((prev) => sortSchedules([...prev, createdSchedule]));
      resetCreateState();
      showToast("Clase y primera fecha creadas correctamente");
      return;
    }

    resetCreateState();
    showToast("Clase creada correctamente");
  };

  const handleEdit = (classItem) => {
    closeScheduleEditor();
    setConfirmDeleteClassId(null);
    setEditingId(classItem.id);
    setEditForm({
      nombre: classItem.nombre,
      tipo: classItem.tipo,
      descripcion: classItem.descripcion || "",
      capacidad: classItem.capacidad,
      duracion: classItem.duracion,
      activo: classItem.activo,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSaveEdit = async () => {
    if (!validateClassForm(editForm)) return;

    const { data, error } = await updateClass(editingId, {
      ...editForm,
      capacidad: Number.parseInt(editForm.capacidad, 10),
      duracion: Number.parseInt(editForm.duracion, 10),
    });

    if (error) {
      showToast("Error al actualizar clase", "error");
      return;
    }

    setClasses((prev) =>
      prev.map((classItem) => (classItem.id === editingId ? data : classItem)),
    );
    setEditingId(null);
    setEditForm({});
    showToast("Clase actualizada correctamente");
  };

  const handleDeleteClass = async (classId) => {
    const { error } = await deleteClass(classId);

    if (error) {
      showToast(
        "Error al eliminar clase. Puede tener fechas asociadas.",
        "error",
      );
      return;
    }

    setClasses((prev) => prev.filter((classItem) => classItem.id !== classId));
    setSchedules((prev) =>
      prev.filter((schedule) => schedule.class_id !== classId),
    );
    setConfirmDeleteClassId(null);

    if (scheduleEditor.classId === classId) closeScheduleEditor();

    showToast("Clase eliminada correctamente");
  };

  const openScheduleEditor = (classId, schedule = null) => {
    setEditingId(null);
    setEditForm({});
    setConfirmDeleteClassId(null);
    setConfirmDeleteScheduleId(null);
    setScheduleEditor({
      classId,
      scheduleId: schedule?.id || null,
      form: {
        instructor_id: schedule?.instructor_id || "",
        fecha: schedule?.fecha || "",
        hora_inicio: schedule?.hora_inicio?.slice(0, 5) || "",
        hora_fin: schedule?.hora_fin?.slice(0, 5) || "",
      },
    });
  };

  const updateScheduleEditorField = (field, value) => {
    setScheduleEditor((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        [field]: value,
      },
    }));
  };

  const handleSaveSchedule = async (classItem) => {
    if (!validateScheduleForm(scheduleEditor.form)) return;

    if (scheduleEditor.scheduleId) {
      const { data, error } = await updateSchedule(scheduleEditor.scheduleId, {
        class_id: classItem.id,
        instructor_id: scheduleEditor.form.instructor_id || null,
        fecha: scheduleEditor.form.fecha,
        hora_inicio: scheduleEditor.form.hora_inicio,
        hora_fin: scheduleEditor.form.hora_fin,
      });

      if (error) {
        showToast("Error al actualizar la fecha", "error");
        return;
      }

      setSchedules((prev) =>
        sortSchedules(
          prev.map((schedule) =>
            schedule.id === scheduleEditor.scheduleId ? data : schedule,
          ),
        ),
      );
      closeScheduleEditor();
      showToast("Fecha actualizada correctamente");
      return;
    }

    const { data, error } = await createSchedule({
      class_id: classItem.id,
      instructor_id: scheduleEditor.form.instructor_id || null,
      fecha: scheduleEditor.form.fecha,
      hora_inicio: scheduleEditor.form.hora_inicio,
      hora_fin: scheduleEditor.form.hora_fin,
      cupos_disponibles: classItem.capacidad,
    });

    if (error) {
      showToast("Error al agregar la fecha", "error");
      return;
    }

    setSchedules((prev) => sortSchedules([...prev, data]));
    closeScheduleEditor();
    showToast("Fecha agregada correctamente");
  };

  const handleDeleteSchedule = async (scheduleId) => {
    const { error } = await deleteSchedule(scheduleId);

    if (error) {
      showToast("Error al eliminar la fecha. Puede tener reservas.", "error");
      return;
    }

    setSchedules((prev) =>
      prev.filter((schedule) => schedule.id !== scheduleId),
    );

    if (scheduleEditor.scheduleId === scheduleId) closeScheduleEditor();

    setConfirmDeleteScheduleId(null);
    showToast("Fecha eliminada correctamente");
  };

  const getTipoBadgeClass = (tipo) => {
    const map = {
      bungee: "badge-bungee",
      yoga: "badge-yoga",
      pilates: "badge-pilates",
      funcional: "badge-funcional",
    };

    return map[tipo] || "badge-otro";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";

    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => (timeString ? timeString.slice(0, 5) : "");

  const getScheduleCountLabel = (count) =>
    `${count} fecha${count !== 1 ? "s" : ""} programada${count !== 1 ? "s" : ""}`;

  return {
    classTypes: TIPOS_CLASE,
    classes,
    confirmDeleteClassId,
    confirmDeleteScheduleId,
    createForm,
    createScheduleForm,
    editForm,
    editingId,
    filteredClasses,
    filterTipo,
    formatDate,
    formatTime,
    getClassSchedules,
    getScheduleCountLabel,
    getTipoBadgeClass,
    handleCancelEdit,
    handleCreate,
    handleDeleteClass,
    handleDeleteSchedule,
    handleEdit,
    handleSaveEdit,
    handleSaveSchedule,
    instructors,
    loading,
    markClassForDelete: setConfirmDeleteClassId,
    markScheduleForDelete: setConfirmDeleteScheduleId,
    openScheduleEditor,
    resetCreateState,
    scheduleEditor,
    search,
    setFilterTipo,
    setSearch,
    showCreate,
    toggleCreateForm,
    updateCreateFormField,
    updateCreateScheduleFormField,
    updateEditFormField,
    updateScheduleEditorField,
    closeScheduleEditor,
  };
}
