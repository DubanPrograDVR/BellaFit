import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirige a /completar-perfil si el perfil está incompleto
export function RequireCompleteProfile({ children }) {
  const { profileIncomplete, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const exempt = ["/completar-perfil", "/auth/callback"];
  if (user && profileIncomplete && !exempt.includes(location.pathname)) {
    return <Navigate to="/completar-perfil" replace />;
  }

  return children;
}

// Solo permite acceso a /completar-perfil si está autenticado Y perfil incompleto
export function RequireIncompleteProfile({ children }) {
  const { user, profileIncomplete, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (!profileIncomplete) return <Navigate to="/" replace />;

  return children;
}
