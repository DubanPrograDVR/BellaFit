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

      {/* ─── Sección 1: Sobre BellaFit (imagen izq + texto der) ─── */}
      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-left">
            <p className="intro-label">
              <span className="intro-label-line"></span>
              SOBRE BELLAFIT
            </p>
            <h2 className="intro-title">
              Donde el fitness
              <br />
              <span className="intro-title-accent">se vive diferente</span>
            </h2>
            <p className="intro-description">
              BellaFit es un centro de entrenamiento y bienestar diseñado para
              mujeres que buscan algo más que una rutina. Aquí encontrarás
              disciplinas innovadoras como el <em>Bungee Fitness</em>, clases
              grupales llenas de energía, formaciones profesionales y una tienda
              con todo lo que necesitas para tu práctica.
            </p>
            <p className="intro-description">
              También ofrecemos consultas de nutrición personalizadas y espacios
              para eventos privados. Todo en un ambiente cálido, motivador y
              pensado para ti.
            </p>
            <div className="intro-cta">
              <a href="#clases" className="intro-btn-link">
                Conoce nuestras clases <span className="arrow">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="intro-right">
            <div className="intro-image-wrapper">
              <div className="intro-image-bg"></div>
              <img
                src="/sublogo.png"
                alt="BellaFit"
                className="intro-image-watermark"
              />
              <p className="intro-image-caption">Bungee Fitness</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
