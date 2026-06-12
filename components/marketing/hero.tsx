import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <>
      <section className={styles.hero}>
        <video
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          poster="/logo.png"
        >
          <source src="/Video.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay} />

        <div className={styles.content}>
          <p className={styles.subtitle}>Bungee Fitness & Wellness</p>
          <h1 className={styles.title}>
            Vuela, entrena
            <br />
            <span className={styles.titleAccent}>y diviértete</span>
          </h1>
          <p className={styles.description}>
            Experimenta una forma única de entrenar donde la gravedad es tu
            aliada. Bungee Fitness combina diversión, desafío y bienestar.
          </p>
          <div className={styles.cta}>
            <LinkButton href="/clases" size="lg">
              Reserva ahora <ArrowRight size={18} />
            </LinkButton>
            <LinkButton href="/clases" variant="secondary" size="lg">
              Conoce nuestras clases
            </LinkButton>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span />
        </div>
      </section>

      <section className={styles.intro} id="sobre">
        <div className={`bf-container ${styles.introGrid}`}>
          <div className={styles.introText}>
            <p className="bf-eyebrow">Sobre BellaFit</p>
            <h2 className={styles.introTitle}>
              Donde el fitness
              <br />
              <span className={styles.introAccent}>se vive diferente</span>
            </h2>
            <p className={styles.introBody}>
              BellaFit es un centro de entrenamiento y bienestar diseñado para
              mujeres que buscan algo más que una rutina. Aquí encontrarás
              disciplinas innovadoras como el <em>Bungee Fitness</em>, clases
              grupales llenas de energía, formaciones profesionales y una tienda
              con todo lo que necesitas para tu práctica.
            </p>
            <p className={styles.introBody}>
              También ofrecemos consultas de nutrición personalizadas y espacios
              para eventos privados. Todo en un ambiente cálido, motivador y
              pensado para ti.
            </p>
            <LinkButton href="/clases" variant="ghost" className={styles.introLink}>
              Conoce nuestras clases <ArrowRight size={16} />
            </LinkButton>
          </div>

          <div className={styles.introMedia}>
            <div className={styles.introCard}>
              <span className={styles.introBadge}>Bungee Fitness</span>
            </div>
            <div className={styles.introStats}>
              <div>
                <strong>+5</strong>
                <span>Disciplinas</span>
              </div>
              <div>
                <strong>+1.2k</strong>
                <span>Alumnas felices</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Para mujeres</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
