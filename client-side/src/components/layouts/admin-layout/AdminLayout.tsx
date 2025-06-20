import { PropsWithChildren } from "react";

import styles from './AdminLayout.module.scss';
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header/Header";

export function AdminLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          <Sidebar />
        </nav>
        <header className={styles.header}>
          <Header />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}