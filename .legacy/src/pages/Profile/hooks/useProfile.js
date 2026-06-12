import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../../lib/auth";

export default function useProfile() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("resumen");
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [profile, setProfile] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [dbProfile, setDbProfile] = useState(null);

  useEffect(() => {
    getProfile().then(({ data, error }) => {
      if (error || !data) {
        navigate("/login");
        return;
      }
      setDbProfile(data);
      const editable = {
        nombre: data.nombre || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
      };
      setProfile(editable);
      setLoadingProfile(false);
    });
  }, [navigate]);

  return {
    activeSection,
    setActiveSection,
    loadingProfile,
    profile,
    setProfile,
    dbProfile,
  };
}
