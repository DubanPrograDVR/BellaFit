import Image from "next/image";
import { galleryHeader, galleryPhotos } from "@/lib/content";
import styles from "./gallery.module.css";

export function Gallery() {
  return (
    <section className={styles.section} id="galeria">
      <div className="bf-container">
        <div className={styles.header}>
          <p className="bf-eyebrow">{galleryHeader.subtitle}</p>
          <h2 className={styles.title}>
            {galleryHeader.title}{" "}
            <span className={styles.titleAccent}>
              {galleryHeader.titleAccent}
            </span>
          </h2>
        </div>

        <div className={styles.mosaic}>
          {galleryPhotos.map((photo) => (
            <figure
              key={photo.id}
              className={`${styles.item} ${styles[photo.span]}`}
            >
              <Image
                src={photo.image}
                alt={photo.label}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
              />
              <figcaption className={styles.caption}>
                <span className={styles.category}>{photo.category}</span>
                <span className={styles.label}>{photo.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
