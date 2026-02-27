import "./styles/HeroSection.css";

const HeroSection = () => {
  return (
    <>
      <section className="hero">
        {/* Video Background */}
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/logo.png">
          <source src="/Video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">BUNGEE FITNESS & WELLNESS</p>
          <h1 className="hero-title">
            Vuela, Entrena
            <br />
            <span className="title-accent">y Diviértete</span>
          </h1>
          <p className="hero-description">
            Experimenta una forma única de entrenar donde la gravedad es tu
            aliada. Bungee Fitness combina diversión, desafío y bienestar.
          </p>
          <div className="hero-cta">
            <a href="#reservar" className="btn-primary">
              Reserva Ahora
            </a>
            <a href="#clases" className="btn-secondary">
              Conoce Nuestras Clases
            </a>
          </div>
        </div>
        <div className="scroll-indicator"></div>
      </section>
    </>
  );
};

export default HeroSection;
