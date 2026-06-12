import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import WhatsAppButton from "../../components/Home/WhatsAppButton";
import Sidebar from "./Sidebar";
import Resumen from "./Resumen";
import Compras from "./Compras";
import Pagos from "./Pagos";
import EditarPerfil from "./EditarPerfil";
import useProfile from "./hooks/useProfile";
import "./Profile.css";

const RENDER_MAP = {
  resumen: (props) => <Resumen {...props} />,
  compras: () => <Compras />,
  pagos: () => <Pagos />,
  editar: (props) => <EditarPerfil {...props} />,
};

export default function Profile() {
  const {
    activeSection,
    setActiveSection,
    loadingProfile,
    profile,
    setProfile,
    dbProfile,
  } = useProfile();

  if (loadingProfile) {
    return (
      <>
        <Navbar />
        <div className="perfil-loading">
          <p>Cargando perfil...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="perfil-page">
        <Sidebar
          profile={profile}
          dbProfile={dbProfile}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="perfil-content">
          {RENDER_MAP[activeSection]({ profile, setProfile, dbProfile })}
        </main>
      </div>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
