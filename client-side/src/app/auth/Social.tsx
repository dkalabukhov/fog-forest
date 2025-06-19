'use client'

import { useRouter } from 'next/navigation';
import styles from './Auth.module.scss';
import { Button } from '@/components/ui/Button';
import { SERVER_URL } from '@/config/api.config';
import { FcGoogle } from 'react-icons/fc'

export function Social() {
  const router = useRouter();

  return (
    <div className={styles.social}>
      <Button className={styles.social__button}
        variant={'outline'}
        onClick={() => router.push(`${SERVER_URL}/auth/google`)}
      >
        <FcGoogle className={styles.social__icon} />
        Войти через Google
      </Button>
    </div>
  )
}