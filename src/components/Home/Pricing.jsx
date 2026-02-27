import "./styles/Pricing.css";
import { pricingData } from "./data/pricingData";

const Pricing = () => {
  return (
    <section className="pricing-section" id="precios">
      <div className="pricing-container">
        <div className="pricing-header">
          <p className="pricing-eyebrow">
            <span className="pricing-eyebrow-line"></span>
            Nuestros Planes
            <span className="pricing-eyebrow-line"></span>
          </p>
          <h2 className="pricing-title">
            Elige el plan
            <br />
            <span className="pricing-title-accent">perfecto para ti</span>
          </h2>
        </div>

        <div className="pricing-grid">
          {pricingData.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.highlight ? "pricing-card--featured" : ""}`}>
              {plan.highlight && (
                <span className="pricing-badge">Más Popular</span>
              )}
              <img
                src="/sublogo.png"
                alt="BellaFit"
                className="pricing-card-sublogo"
              />
              <h3 className="pricing-card-name">{plan.name}</h3>
              <div className="pricing-card-price">
                <span className="pricing-currency">{plan.currency}</span>
                <span className="pricing-amount">${plan.price}</span>
                <span className="pricing-period">/{plan.period}</span>
              </div>
              <div className="pricing-card-divider"></div>
              <ul className="pricing-card-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="pricing-feature">
                    <span className="pricing-feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.link}
                className={`pricing-card-cta ${plan.highlight ? "pricing-card-cta--featured" : ""}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
