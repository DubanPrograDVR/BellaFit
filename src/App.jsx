import { useEffect } from "react";
import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import Tienda from "./pages/Tienda";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("❌ Supabase — error de conexión:", error.message);
      } else {
        console.log("✅ Supabase — conexión exitosa", data);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formaciones" element={<Formaciones />} />
      <Route path="/tienda" element={<Tienda />} />
    </Routes>
  );
}

export default App;
