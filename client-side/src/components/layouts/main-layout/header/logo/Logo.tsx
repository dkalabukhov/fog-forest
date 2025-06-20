import { PUBLIC_URL } from "@/config/url.config";
import Link from "next/link";
import styles from './Logo.module.scss'

export function Logo() {
  return (
    <Link href={PUBLIC_URL.home()} className={styles.logo}>
      <span className={styles.logo__text}>Fog&Forest</span>
    </Link>
  )
}