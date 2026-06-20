'use client';

import React from 'react';
import { perfilDemo } from '@/lib/perfil';
import { Button } from '@/components/ui/button';
import styles from './content.module.css';

export function ResumenContent() {
  const user = perfilDemo;

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Resumen</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Información Personal</h3>
          <div className={styles.info}>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
            <p><strong>Miembro desde:</strong> {user.miembroDesde}</p>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Membresía</h3>
          <div className={styles.badge}>{user.planActual}</div>
          <p className={styles.subtext}>Plan activo</p>
        </div>

        <div className={styles.card}>
          <h3>Dirección</h3>
          <p className={styles.subtext}>{user.direccion}</p>
        </div>

        <div className={styles.card}>
          <h3>Cuenta</h3>
          <div className={styles.credit}>{user.rol}</div>
          <Button variant="secondary" size="sm">Recargar</Button>
        </div>
      </div>
    </div>
  );
}
