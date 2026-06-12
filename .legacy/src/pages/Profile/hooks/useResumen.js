import {
  comprasActivas,
  comprasPasadas,
  historialPagos,
} from "../data/perfilData";

export default function useResumen() {
  return {
    comprasActivas,
    comprasPasadas,
    historialPagos,
    stats: {
      comprasActivasCount: comprasActivas.length,
      comprasPasadasCount: comprasPasadas.length,
      pagosCount: historialPagos.length,
    },
  };
}
