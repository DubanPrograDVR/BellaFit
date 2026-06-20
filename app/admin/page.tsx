'use client';

import React from 'react';
import { BarChart3, Users, Calendar, Package, Bell } from 'lucide-react';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import styles from './admin.module.css';

const stats = [
  { label: 'Clases Hoy', value: '12', icon: Calendar },
  { label: 'Alumnas Activas', value: '348', icon: Users },
  { label: 'Productos Stock', value: '156', icon: Package },
  { label: 'Ingresos Hoy', value: '$4,200', icon: BarChart3 },
];

const recentActivities = [
  { id: 1, title: 'Nueva compra de María López', time: 'Hace 2 horas' },
  { id: 2, title: 'Clase "Bungee Avanzado" completada', time: 'Hace 4 horas' },
  { id: 3, title: 'Bajo stock en Bandas Resistencia', time: 'Hace 6 horas' },
];

export default function AdminPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Panel de Administración</h1>
          <p className={styles.subtitle}>Gestiona tu estudio BellaFit</p>
        </div>
        <div className={styles.headerAction}>
          <button className={styles.notificationBtn}>
            <Bell size={20} />
            <span className={styles.badge}>3</span>
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <section className={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Icon size={24} />
                </div>
                <div className={styles.statContent}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              </div>
            );
          })}
        </section>

        <div className={styles.grid}>
          <section className={styles.mainCard}>
            <h2 className={styles.sectionTitle}>Clases Programadas</h2>
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <span>Hora</span>
                <span>Clase</span>
                <span>Instructora</span>
                <span>Alumnas</span>
                <span>Estado</span>
              </div>
              <div className={styles.tableRow}>
                <span>09:00</span>
                <span>Bungee Principiante</span>
                <span>Sofía Romero</span>
                <span>18/20</span>
                <span className={`${styles.badge} ${styles.active}`}>Activa</span>
              </div>
              <div className={styles.tableRow}>
                <span>11:00</span>
                <span>Bungee Intermedio</span>
                <span>Catalina Díaz</span>
                <span>22/25</span>
                <span className={`${styles.badge} ${styles.active}`}>Activa</span>
              </div>
              <div className={styles.tableRow}>
                <span>18:00</span>
                <span>Pilates en Aire</span>
                <span>Sofía Romero</span>
                <span>15/20</span>
                <span className={`${styles.badge} ${styles.scheduled}`}>Programada</span>
              </div>
            </div>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sectionTitle}>Actividad Reciente</h2>
            <div className={styles.activityList}>
              {recentActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityDot}></div>
                  <div className={styles.activityContent}>
                    <p className={styles.activityTitle}>{activity.title}</p>
                    <p className={styles.activityTime}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
