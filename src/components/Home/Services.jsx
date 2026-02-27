import "./styles/Services.css";
import { servicesData } from "./data/servicesData";

const Services = () => {
  return (
    <section className="sv" id="clases">
      <div className="sv-header">
        <p className="sv-eyebrow">
          <span className="sv-eyebrow-line"></span>
          {servicesData.header.subtitle}
          <span className="sv-eyebrow-line"></span>
        </p>
        <h2 className="sv-title">
          {servicesData.header.title}
          <br />
          <span className="sv-title-accent">
            {servicesData.header.titleAccent}
          </span>
        </h2>
      </div>

      <div className="sv-grid">
        {servicesData.services.map((service, index) => (
          <div key={index} className="sv-card">
            <div className="sv-card-icon-area">
              <div className="sv-card-icon-circle">
                <span className="sv-card-emoji">{service.emoji}</span>
              </div>
            </div>
            <div className="sv-card-body">
              <span className="sv-card-badge">{service.badge}</span>
              <h3 className="sv-card-title">{service.title}</h3>
              <p className="sv-card-desc">{service.description}</p>
              <div className="sv-card-divider"></div>
              <a href={service.link} className="sv-card-link">
                {service.linkText} <span className="sv-card-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
