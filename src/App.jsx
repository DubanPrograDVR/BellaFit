import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import Tienda from "./pages/Tienda";
import Clases from "./pages/Clases";
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
import AdminInventario from "./pages/Admin/Inventario";
import AdminNotificaciones from "./pages/Admin/Notificaciones";
import InstructorLayout from "./pages/Instructor/InstructorLayout";
import InstructorCalendario from "./pages/Instructor/InstructorCalendario";
import InstructorAsistencia from "./pages/Instructor/InstructorAsistencia";
import InstructorObservaciones from "./pages/Instructor/InstructorObservaciones";
import InstructorEstadisticas from "./pages/Instructor/InstructorEstadisticas";
import {
  RequireCompleteProfile,
  RequireIncompleteProfile,
} from "./components/RouteGuards";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <RequireCompleteProfile>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/formaciones" element={<Formaciones />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
        <Route path="/nueva-contrasena" element={<ResetPassword />} />
        <Route
          path="/completar-perfil"
          element={
            <RequireIncompleteProfile>
              <CompleteProfile />
            </RequireIncompleteProfile>
          }
        />
        <Route path="/perfil" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="usuarios" element={<AdminUsers />} />
          <Route path="clases" element={<AdminClasses />} />
          <Route path="inventario" element={<AdminInventario />} />
          <Route path="notificaciones" element={<AdminNotificaciones />} />
          <Route
            path="horarios"
            element={<Navigate to="/admin/clases" replace />}
          />
        </Route>

        {/* Instructor */}
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<InstructorCalendario />} />
          <Route path="asistencia" element={<InstructorAsistencia />} />
          <Route path="observaciones" element={<InstructorObservaciones />} />
          <Route path="estadisticas" element={<InstructorEstadisticas />} />
        </Route>
      </Routes>
    </RequireCompleteProfile>
  );
}

export default App;
