'use client'

import { usePathname } from "next/navigation"
import { IMenuItem } from "./menu.interface"
import styles from './Navigation.module.scss'
import Link from "next/link"
import { cn } from "@/lib/utils"

interface MenuItemProps {
  route: IMenuItem
}

export function MenuItem({ route }: MenuItemProps) {
  const pathname = usePathname();

  return <Link
    href={route.link}
    className={cn(styles.route, {
      [styles.active]: (pathname === route.link)
    })}
    >
      <route.icon />
      {route.value}
    </Link>
}