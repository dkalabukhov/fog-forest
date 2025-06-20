'use client'

import styles from './Header.module.scss'
import { MobileSidebar } from "../sidebar/MobileSidebar"
import { DASHBOARD_URL } from '@/config/url.config';
import { useProfile } from '@/hooks/useProfile';
import Image from 'next/image';
import { Loader } from '@/components/ui/Loader';
import Link from 'next/link';

export function Header() {
  const { user, isLoading } = useProfile();

  return (
    <div className={styles.header}>
      <MobileSidebar />
      <div className={styles.header__menu}>
        {isLoading ? (
          <Loader />
        )
        : (
          user && (
            <>
              <Link href={DASHBOARD_URL.home()}>
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={42}
                  height={42}
                />
              </Link>
            </>
          )
        )
        }
      </div>
    </div>
  );
}