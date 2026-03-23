import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import Tienda from "./pages/Tienda";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CompleteProfile from "./pages/CompleteProfile";
import Profile from "./pages/Profile/Profile";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminClasses from "./pages/Admin/AdminClasses";
import AdminSchedules from "./pages/Admin/AdminSchedules";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

function RequireCompleteProfile({ children }) {
  const { profileIncomplete, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;

  // Si el usuario está logueado y su perfil está incompleto,
  // redirigir al formulario (excepto si ya está en él o en auth/callback)
  const exempt = ["/completar-perfil", "/auth/callback"];
  if (user && profileIncomplete && !exempt.includes(location.pathname)) {
    return <Navigate to="/completar-perfil" replace />;
  }

  return children;
}

function App() {
  return (
    <RequireCompleteProfile>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formaciones" element={<Formaciones />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
        <Route path="/nueva-contrasena" element={<ResetPassword />} />
        <Route path="/completar-perfil" element={<CompleteProfile />} />
        <Route path="/perfil" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="clases" element={<AdminClasses />} />
          <Route path="horarios" element={<AdminSchedules />} />
        </Route>
      </Routes>
    </RequireCompleteProfile>
  );
}

export default App;
