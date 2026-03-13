import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import Tienda from "./pages/Tienda";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formaciones" element={<Formaciones />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
