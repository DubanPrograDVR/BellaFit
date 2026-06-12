import Image from "next/image";
import styles from "./showcase.module.css";

export function Showcase() {
  return (
    <section className={styles.showcase}>
      <div className={styles.brand}>
        <div className={styles.brandContent}>
          <span className={styles.sublogo}>
            <Image src="/sublogo.png" alt="" width={56} height={56} />
          </span>
          <span className={styles.line} />
          <p className={styles.tagline}>
            Tu espacio de bienestar y transformación
          </p>
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1100&q=80"
          alt="Alumnas entrenando en el estudio BellaFit"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
