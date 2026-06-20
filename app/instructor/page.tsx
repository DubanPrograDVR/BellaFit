'use client';

import React, { useState } from 'react';
import { Calendar, Users, BarChart3, MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/marketing/navbar';
import { Footer } from '@/components/marketing/footer';
import styles from './instructor.module.css';

const upcomingClasses = [
  { id: 1, name: 'Bungee Principiante', time: '09:00 - 10:00', attendees: 18, total: 20, status: 'Hoy' },
  { id: 2, name: 'Bungee Intermedio', time: '11:00 - 12:00', attendees: 22, total: 25, status: 'Hoy' },
  { id: 3, name: 'Pilates en Aire', time: '18:00 - 19:00', attendees: 0, total: 15, status: 'Mañana' },
];

const statistics = [
  { label: 'Clases Dictadas', value: '156' },
  { label: 'Alumnas Promedio', value: '22' },
  { label: 'Satisfacción', value: '4.8/5' },
  { label: 'Horas Dictadas', value: '312' },
];

const studentNotes = [
  { id: 1, name: 'María López', note: 'Excelente progreso en saltos', date: '2024-01-15' },
  { id: 2, name: 'Sofía García', note: 'Necesita trabajar flexibilidad', date: '2024-01-14' },
  { id: 3, name: 'Paula Rodríguez', note: 'Posible instructora en futuro', date: '2024-01-13' },
];

export default function InstructorPage() {
  const [selectedDay, setSelectedDay] = useState('today');

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Mi Calendario</h1>
          <p className={styles.subtitle}>Sofía Romero - Instructora Principal</p>
        </div>
        <div className={styles.dayFilter}>
          <button
            className={`${styles.dayBtn} ${selectedDay === 'today' ? styles.active : ''}`}
            onClick={() => setSelectedDay('today')}
          >
            Hoy
          </button>
          <button
            className={`${styles.dayBtn} ${selectedDay === 'week' ? styles.active : ''}`}
            onClick={() => setSelectedDay('week')}
          >
            Esta Semana
          </button>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <section className={styles.mainCard}>
            <h2 className={styles.sectionTitle}>
              <Calendar size={20} />
              Clases Próximas
            </h2>
            <div className={styles.classList}>
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className={styles.classItem}>
                  <div className={styles.classTime}>
                    <p className={styles.time}>{cls.time}</p>
                    <p className={styles.date}>{cls.status}</p>
                  </div>
                  <div className={styles.classInfo}>
                    <h3>{cls.name}</h3>
                    <p className={styles.attendanceInfo}>
                      {cls.attendees} de {cls.total} alumnas confirmadas
                    </p>
                  </div>
                  <button className={styles.classBtn}>Ver Detalles</button>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sectionTitle}>
              <BarChart3 size={20} />
              Estadísticas
            </h2>
            <div className={styles.statsList}>
              {statistics.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <p className={styles.statValue}>{stat.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={styles.grid}>
          <section className={styles.mainCard}>
            <h2 className={styles.sectionTitle}>
              <MessageSquare size={20} />
              Observaciones de Alumnas
            </h2>
            <div className={styles.notesList}>
              {studentNotes.map((student) => (
                <div key={student.id} className={styles.noteItem}>
                  <div className={styles.noteHeader}>
                    <h4>{student.name}</h4>
                    <span className={styles.noteDate}>{student.date}</span>
                  </div>
                  <p className={styles.noteText}>{student.note}</p>
                  <div className={styles.noteActions}>
                    <button className={styles.editBtn}>Editar</button>
                    <button className={styles.deleteBtn}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.addNoteBtn}>+ Agregar Observación</button>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sectionTitle}>
              <Users size={20} />
              Asistencia
            </h2>
            <div className={styles.attendanceChart}>
              <div className={styles.chartItem}>
                <p>Bungee Principiante</p>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '90%' }}></div>
                </div>
                <span>90%</span>
              </div>
              <div className={styles.chartItem}>
                <p>Bungee Intermedio</p>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '88%' }}></div>
                </div>
                <span>88%</span>
              </div>
              <div className={styles.chartItem}>
                <p>Pilates en Aire</p>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: '85%' }}></div>
                </div>
                <span>85%</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
