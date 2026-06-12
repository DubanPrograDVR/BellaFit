import { comprasActivas, comprasPasadas } from "../data/perfilData";

export default function useCompras() {
  return {
    comprasActivas,
    comprasPasadas,
  };
}
