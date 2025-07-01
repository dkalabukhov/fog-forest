import { HeaderMenu } from './header-menu/HeaderMenu';
import styles from './Header.module.scss';
import { Logo } from './logo/Logo';
import { DarkMobileSidebar } from './nav/DarkMobileSidebar';
import { SearchInput } from './search-input/SearchInput';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.header__control}>
          <div className={styles.header__group}>
            <div className={styles.header__darkMobileSidebar}>
              <DarkMobileSidebar />
            </div>
            <div className={styles.logo}>
              <Logo />
            </div>
            <div className={styles.headerMenu}>
              <HeaderMenu />
            </div>
          </div>
          <div className={styles.searchInput}>
            <SearchInput />
          </div>
        </nav>
      </div>
    </header>
  );
}