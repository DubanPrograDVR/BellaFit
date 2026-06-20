'use client';

import React from 'react';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import { PageHeader } from '@/components/ui/page-header';
import { PerfilSidebar } from '@/components/perfil/sidebar';
import { ResumenContent } from '@/components/perfil/resumen';
import styles from './layout.module.css';

export default function PerfilPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <PageHeader
        title="Mi Perfil"
        description="Gestiona tu información, compras, pagos y configuración"
        subtitle="Bienvenida a tu área personal"
      />

      <div className={styles.container}>
        <div className={styles.grid}>
          <PerfilSidebar />
          <ResumenContent />
        </div>
      </div>

      <Footer />
    </main>
  );
}
