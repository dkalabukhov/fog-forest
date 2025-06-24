import Link from 'next/link'
import styles from './Footer.module.scss'
import { PUBLIC_URL } from '@/config/url.config'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>Fog&Forest 2025 &copy;</h3>
          <nav>
            <ul className={styles.menu}>
              <li className='hover:text-white/70'>
                <Link href={PUBLIC_URL.home()}>Главная</Link>
              </li>
              <li className='hover:text-white/70'>
                <Link href={PUBLIC_URL.home()}>Каталог</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}