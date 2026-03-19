import {
  faUser,
  faBagShopping,
  faCreditCard,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const SECTIONS = [
  { id: "resumen", label: "Resumen", icon: faUser },
  { id: "compras", label: "Mis Compras", icon: faBagShopping },
  { id: "pagos", label: "Historial de Pagos", icon: faCreditCard },
  { id: "editar", label: "Editar Perfil", icon: faPen },
];

export default function useSidebar({ activeSection, setActiveSection }) {
  return {
    sections: SECTIONS,
    activeSection,
    setActiveSection,
  };
}
