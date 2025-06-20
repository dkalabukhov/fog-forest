'use client';
import { MenuItem } from './MenuItem';
import styles from './Navigation.module.scss';
import { routes } from './routes'

export function Navigation() {
  return (
     <div className={styles.wrapper}>
      <div className={styles.navigation}>
        {routes.map(route => <MenuItem key={route.value} route={route} />)}
      </div>
     </div>
  );
}