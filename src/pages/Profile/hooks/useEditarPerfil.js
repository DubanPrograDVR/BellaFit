import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function useEditarPerfil({ profile, setProfile }) {
  const [editing, setEditing] = useState(false);
  const [editDraft, setEditDraft] = useState(profile);

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

  const updateDraft = (field, value) => {
    setEditDraft((prev) => ({ ...prev, [field]: value }));
  };

  return {
    editing,
    editDraft,
    startEdit,
    cancelEdit,
    saveEdit,
    updateDraft,
  };
}
