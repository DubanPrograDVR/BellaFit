import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { footerData } from "@/lib/content";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={`bf-container ${styles.grid}`}>
        <div className={styles.about}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>
              <Image src="/sublogo.png" alt="" width={24} height={24} />
            </span>
            BellaFit
          </Link>
          <p className={styles.aboutText}>{footerData.about.description}</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h3>Servicios</h3>
          <ul>
            {footerData.servicios.map((s) => (
              <li key={s.nombre}>
                <Link href={s.enlace}>{s.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Información</h3>
          <ul>
            {footerData.informacion.map((i) => (
              <li key={i.nombre}>
                <a href={i.enlace}>{i.nombre}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Contacto</h3>
          <ul className={styles.contact}>
            <li>
              <MapPin size={16} /> {footerData.contacto.direccion}
            </li>
            <li>
              <Phone size={16} /> {footerData.contacto.telefono}
            </li>
            <li>
              <Mail size={16} /> {footerData.contacto.email}
            </li>
            <li>
              <Clock size={16} /> {footerData.contacto.horarios}
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
}
