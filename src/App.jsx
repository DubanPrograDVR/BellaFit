import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import Tienda from "./pages/Tienda";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formaciones" element={<Formaciones />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
      <Route path="/nueva-contrasena" element={<ResetPassword />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
}

export default App;
