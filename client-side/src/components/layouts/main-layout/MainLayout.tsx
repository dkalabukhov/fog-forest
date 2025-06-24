import { PropsWithChildren } from "react";
import styles from './MainLayout.module.scss'
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";

export function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  )
}