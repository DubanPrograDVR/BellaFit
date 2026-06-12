import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import styles from "./auth-shell.module.css";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, children }: AuthShellProps) {
  return (
    <div className={styles.page}>
      <aside className={styles.banner}>
        <Image
          src="/images/auth-banner.png"
          alt=""
          fill
          sizes="(max-width: 900px) 0px, 45vw"
          className={styles.bannerImage}
          priority
        />
        <div className={styles.bannerOverlay} aria-hidden />
        <div className={styles.bannerContent}>
          <Link href="/" className={styles.bannerLogo}>
            BellaFit
          </Link>
          <p>Tu espacio de bienestar y transformación</p>
        </div>
      </aside>

      <div className={styles.formCol}>
        <Link href="/" className={styles.backBtn} aria-label="Volver al inicio">
          <ArrowLeft size={18} />
        </Link>
        <div className={styles.formWrapper}>
          <Image
            src="/sublogo.png"
            alt=""
            width={44}
            height={44}
            className={styles.sublogo}
          />
          <span className="bf-eyebrow">{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
