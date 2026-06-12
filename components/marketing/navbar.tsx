"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/content";
import { LinkButton } from "@/components/ui/button";
import styles from "./navbar.module.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav} aria-label="Principal">
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark}>
            <Image src="/sublogo.png" alt="" width={28} height={28} />
          </span>
          <span className={styles.logoText}>BellaFit</span>
        </Link>

        <ul className={styles.desktopLinks}>
          {navItems.map((item) => (
            <li key={item.nombre}>
              <Link href={item.enlace} className={styles.link}>
                {item.nombre}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/login" className={styles.loginLink}>
            Ingresar
          </Link>
          <LinkButton href="/clases" size="sm" className={styles.trialBtn}>
            Clase de prueba
          </LinkButton>
          <button
            className={styles.menuToggle}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className={styles.mobilePanel}>
          <ul className={styles.mobileLinks}>
            {navItems.map((item) => (
              <li key={item.nombre}>
                <Link href={item.enlace} onClick={() => setOpen(false)}>
                  {item.nombre}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileActions}>
            <LinkButton
              href="/login"
              variant="secondary"
              fullWidth
              onClick={() => setOpen(false)}
            >
              Ingresar
            </LinkButton>
            <LinkButton href="/clases" fullWidth onClick={() => setOpen(false)}>
              Tomar clase de prueba
            </LinkButton>
          </div>
        </div>
      )}
    </header>
  );
}
