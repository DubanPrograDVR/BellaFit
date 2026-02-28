import Home from "./components/Home/Home";
import Formaciones from "./pages/Formaciones";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/formaciones" element={<Formaciones />} />
    </Routes>
  );
}

export default App;
