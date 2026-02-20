import "./styles/Services.css";
import { servicesData } from "./data/servicesData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Services = () => {
  return (
    <>
      <section className="services" id="clases">
        <div className="section-header">
          <p className="section-subtitle">{servicesData.header.subtitle}</p>
          <h2 className="section-title">{servicesData.header.title}</h2>
          <p className="section-description">
            {servicesData.header.description}
          </p>
        </div>

        <div className="services-grid">
          {servicesData.services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <a href={service.link} className="service-link">
                {service.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
