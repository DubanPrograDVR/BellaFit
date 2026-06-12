import { Check } from "lucide-react";
import { pricingPlans } from "@/lib/content";
import { LinkButton } from "@/components/ui/button";
import styles from "./pricing.module.css";

export function Pricing() {
  return (
    <section className={styles.section} id="precios">
      <div className="bf-container">
        <div className={styles.header}>
          <p className="bf-eyebrow">Nuestros Planes</p>
          <h2 className={styles.title}>
            Elige el plan{" "}
            <span className={styles.titleAccent}>perfecto para ti</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`${styles.card} ${plan.highlight ? styles.featured : ""}`}
            >
              {plan.highlight && (
                <span className={styles.badge}>Más popular</span>
              )}
              <h3 className={styles.name}>{plan.name}</h3>
              <p className={styles.price}>
                <span className={styles.currency}>{plan.currency}</span>
                <span className={styles.amount}>${plan.price}</span>
                <span className={styles.period}>/{plan.period}</span>
              </p>
              <div className={styles.divider} />
              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} className={styles.check} />
                    {feature}
                  </li>
                ))}
              </ul>
              <LinkButton
                href={plan.link}
                variant={plan.highlight ? "primary" : "secondary"}
                fullWidth
              >
                {plan.cta}
              </LinkButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
