import type { ReactNode } from "react";
import styles from "./page-header.module.css";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <span className="bf-eyebrow">{eyebrow}</span>
      <h1 className={styles.title}>
        {title}
        {titleAccent ? (
          <>
            {" "}
            <em className={styles.accent}>{titleAccent}</em>
          </>
        ) : null}
      </h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {children}
    </div>
  );
}
