import { useState, useCallback } from "react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import WhatsAppButton from "../components/Home/WhatsAppButton";
import { useTienda } from "../hooks/useTienda";
import "./Tienda.css";

const formatPrice = (precio) =>
  precio.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });

const Tienda = () => {
  const { productos, loading, categorias, getCategoryName } = useTienda();
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const productosFiltrados =
    categoriaActiva === "todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === id);
      if (existente && existente.cantidad > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const eliminarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const totalCarrito = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="tienda-hero">
        <div className="tienda-hero-overlay" />
        <div className="tienda-hero-content">
          <span className="tienda-hero-label">BellaFit Store</span>
          <h1>Nuestra Tienda</h1>
          <p>
            Equipo profesional, ropa deportiva y todo lo que necesitas para tu
            entrenamiento.
          </p>
          <div className="tienda-hero-line" />
        </div>
      </section>

      {/* Filtros */}
      <section className="tienda-section">
        <div className="tienda-filters">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className={`tienda-filter-btn${categoriaActiva === cat.id ? " active" : ""}`}
              onClick={() => setCategoriaActiva(cat.id)}>
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Grid de productos */}
        {loading ? (
          <p className="tienda-loading">Cargando productos…</p>
        ) : (
          <div className="tienda-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="tienda-card">
                <div className="tienda-card-img">
                  {producto.imagen_url ? (
                    <img src={producto.imagen_url} alt={producto.nombre} />
                  ) : (
                    <div className="tienda-card-img-empty">Sin imagen</div>
                  )}
                  {producto.badge && (
                    <span
                      className={`tienda-card-badge badge-${producto.badge.toLowerCase()}`}>
                      {producto.badge}
                    </span>
                  )}
                  {producto.stock <= 0 && (
                    <div className="tienda-card-agotado">
                      <span>AGOTADO</span>
                    </div>
                  )}
                </div>
                <div className="tienda-card-body">
                  <span className="tienda-card-cat">
                    {getCategoryName(producto.categoria)}
                  </span>
                  <h3 className="tienda-card-nombre">{producto.nombre}</h3>
                  <p className="tienda-card-desc">{producto.descripcion}</p>
                  <div className="tienda-card-precio-row">
                    <span className="tienda-card-precio">
                      {formatPrice(producto.precio)}
                    </span>
                    {producto.precio_anterior && (
                      <span className="tienda-card-precio-anterior">
                        {formatPrice(producto.precio_anterior)}
                      </span>
                    )}
                  </div>
                  <button
                    className="tienda-card-cta"
                    disabled={producto.stock <= 0}
                    onClick={() => agregarAlCarrito(producto)}>
                    {producto.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                  </button>
                </div>
              </div>
            ))}
            {productosFiltrados.length === 0 && !loading && (
              <p className="tienda-empty">
                No hay productos en esta categoría.
              </p>
            )}
          </div>
        )}
      </section>

      {/* Botón flotante del carrito */}
      <button className="carrito-float" onClick={() => setCarritoAbierto(true)}>
        🛒
        {totalItems > 0 && <span className="carrito-count">{totalItems}</span>}
      </button>

      {/* Drawer del carrito */}
      {carritoAbierto && (
        <div
          className="carrito-backdrop"
          onClick={() => setCarritoAbierto(false)}
        />
      )}
      <div className={`carrito-drawer${carritoAbierto ? " open" : ""}`}>
        <div className="carrito-header">
          <h2>Tu Carrito</h2>
          <button
            className="carrito-close"
            onClick={() => setCarritoAbierto(false)}>
            ✕
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-empty">
            <p>Tu carrito está vacío</p>
            <span>Explora nuestra tienda y encuentra algo que te encante</span>
          </div>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map((item) => (
                <div key={item.id} className="carrito-item">
                  <img src={item.imagen_url} alt={item.nombre} />
                  <div className="carrito-item-info">
                    <h4>{item.nombre}</h4>
                    <span className="carrito-item-precio">
                      {formatPrice(item.precio)}
                    </span>
                    <div className="carrito-item-qty">
                      <button onClick={() => quitarDelCarrito(item.id)}>
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => agregarAlCarrito(item)}>+</button>
                    </div>
                  </div>
                  <button
                    className="carrito-item-remove"
                    onClick={() => eliminarDelCarrito(item.id)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="carrito-footer">
              <div className="carrito-total">
                <span>Total</span>
                <span>{formatPrice(totalCarrito)}</span>
              </div>
              <button className="carrito-checkout">Finalizar Compra</button>
              <p className="carrito-note">
                * Simulación — sin pasarela de pago activa
              </p>
            </div>
          </>
        )}
      </div>

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Tienda;
