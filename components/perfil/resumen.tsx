'use client';

import React from 'react';
import { PERFIL_DEMO } from '@/lib/perfil';
import { Button } from '@/components/ui/button';
import styles from './content.module.css';

export function ResumenContent() {
  const user = PERFIL_DEMO.user;

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Resumen</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Información Personal</h3>
          <div className={styles.info}>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Teléfono:</strong> {user.phone}</p>
            <p><strong>Miembro desde:</strong> {user.joinDate}</p>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Membresía</h3>
          <div className={styles.badge}>{user.membership}</div>
          <p className={styles.subtext}>Vigencia: {user.membershipExpiry}</p>
        </div>

        <div className={styles.card}>
          <h3>Clases Completadas</h3>
          <div className={styles.stat}>{user.classesCompleted}</div>
          <p className={styles.subtext}>En los últimos 30 días</p>
        </div>

        <div className={styles.card}>
          <h3>Saldo de Créditos</h3>
          <div className={styles.credit}>${user.credits}</div>
          <Button variant="secondary" size="sm">Recargar</Button>
        </div>
      </div>
    </div>
  );
}
