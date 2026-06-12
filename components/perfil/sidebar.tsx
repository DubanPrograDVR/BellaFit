"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, Receipt, UserPen, Store } from "lucide-react"
import { perfilDemo } from "@/lib/perfil"
import styles from "./sidebar.module.css"

const NAV_ITEMS = [
  { href: "/perfil", label: "Resumen", icon: LayoutDashboard },
  { href: "/perfil/compras", label: "Mis Compras", icon: ShoppingBag },
  { href: "/perfil/pagos", label: "Pagos", icon: Receipt },
  { href: "/perfil/editar", label: "Editar Perfil", icon: UserPen },
] as const

export function PerfilSidebar() {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">
          {perfilDemo.nombre.charAt(0).toUpperCase()}
        </div>
        <div className={styles.headerInfo}>
          <p className={styles.name}>{perfilDemo.nombre}</p>
          <p className={styles.role}>{perfilDemo.rol}</p>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Navegación del perfil">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? styles.navItemActive : styles.navItem}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon size={18} aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Link href="/tienda" className={styles.cta}>
        <Store size={18} aria-hidden="true" />
        Comprar productos
      </Link>
    </aside>
  )
}
