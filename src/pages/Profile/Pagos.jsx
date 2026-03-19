import { formatPrice, formatDate, estadoBadge } from "./utils";
import usePagos from "./hooks/usePagos";

export default function Pagos() {
  const { historialPagos } = usePagos();

  return (
    <div className="perfil-pagos">
      <h2>Historial de Pagos</h2>
      <div className="perfil-pagos-table-wrap">
        <table className="perfil-pagos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Método</th>
              <th>Monto</th>
              <th>Estado</th>
              <th>Boleta</th>
            </tr>
          </thead>
          <tbody>
            {historialPagos.map((p) => (
              <tr key={p.id}>
                <td>{formatDate(p.fecha)}</td>
                <td>{p.concepto}</td>
                <td>{p.metodo}</td>
                <td className="perfil-pago-monto">{formatPrice(p.monto)}</td>
                <td>
                  <span className={`perfil-badge ${estadoBadge(p.estado)}`}>
                    {p.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="perfil-boleta-btn"
                    onClick={() =>
                      alert(`Descargando boleta ${p.boleta} (simulado)`)
                    }>
                    📄 {p.boleta}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
