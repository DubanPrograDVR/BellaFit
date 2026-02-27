import "./styles/Showcase.css";

const Showcase = () => {
  return (
    <section className="showcase">
      <div className="showcase-brand">
        <div className="showcase-brand-content">
          <img src="/sublogo.png" alt="BellaFit" className="showcase-sublogo" />
          <div className="showcase-line" />
          <p className="showcase-tagline">
            Tu espacio de bienestar y transformación
          </p>
        </div>
      </div>
      <div className="showcase-image">
        <img
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80"
          alt="BellaFit espacio"
        />
      </div>
    </section>
  );
};

export default Showcase;
