import { Logo } from '../../main-layout/header/logo/Logo';
import { Navigation } from './navigation/Navigation';
import styles from './Sidebar.module.scss';

export function Sidebar() {
  return (
     <div className={styles.sidebar}>
        <Logo />
        <Navigation />
    </div>
  )
}