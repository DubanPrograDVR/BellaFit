import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, servicesHeader } from "@/lib/content";
import styles from "./services.module.css";

export function Services() {
  return (
    <section className={styles.section} id="servicios">
      <div className="bf-container">
        <div className={styles.header}>
          <p className="bf-eyebrow">{servicesHeader.subtitle}</p>
          <h2 className={styles.title}>
            {servicesHeader.title}{" "}
            <span className={styles.titleAccent}>
              {servicesHeader.titleAccent}
            </span>
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className={styles.card}>
                <span className={styles.iconWrap}>
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <span className={styles.badge}>{service.badge}</span>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.desc}>{service.description}</p>
                <Link href={service.link} className={styles.link}>
                  {service.linkText} <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
