'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet";
import { LogOut, Menu } from "lucide-react";
import styles from './DarkMobileSidebar.module.scss'
import { useProfile } from "@/hooks/useProfile";
import { useGetRole } from "@/hooks/useGetRole";
import { EnumRole } from "@/shared/types/role.enum";
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from "@/config/url.config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";

export function DarkMobileSidebar() {
  const { user, isLoading } = useProfile()
  const { role } = useGetRole();

  return (
    <Sheet>
      <SheetTrigger className={`${styles.header__menuTrigger} mt-1.5 lg:hidden hover:opacity-75 transition`}>
        <Menu />
      </SheetTrigger>
      <SheetHeader className="sr-only">
        <SheetTitle className="sr-only">Меню навигации</SheetTitle>
      </SheetHeader>
      <SheetContent side="left" className="p-0 bg-black text-white border-none">
        <div className={styles.sidebarContent}>
          <div className={styles.menuTitle}>Меню</div>
          <nav className={styles.navMenu}>
            {role === EnumRole.ADMIN && (
              <Link href={STORE_URL.products()} className={styles.menuItem}>
                <Button className={styles.menuButton} variant='ghost'>
                  Управление магазином
                </Button>
              </Link>
            )}
            <Link href={PUBLIC_URL.explorer()} className={styles.menuItem}>
              <Button className={styles.menuButton} variant='ghost'>
                Каталог
              </Button>
            </Link>
            {isLoading ? (
              <div className={styles.loaderWrapper}>
                <Loader size='sm' />
              </div>
            ) : user ? (
              <>
                <Link href={DASHBOARD_URL.favorites()} className={styles.menuItem}>
                  <Button className={styles.menuButton} variant='ghost'>
                    Избранное
                  </Button>
                </Link>
                <div className={styles.userProfile}>
                  <Link href={DASHBOARD_URL.home()} className={styles.avatarLink}>
                    <Image
                      src={user.picture}
                      alt={user.name}
                      width={42}
                      height={42}
                      className={styles.avatar}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <Link href={PUBLIC_URL.auth()} className={styles.menuItem}>
                <Button className={styles.menuButton}>
                  <LogOut className={styles.icon} />
                  Войти
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}