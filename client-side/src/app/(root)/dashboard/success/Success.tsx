'use client'

import { Button } from '@/components/ui/Button'
import styles from './Success.module.scss'
import Link from 'next/link'
import { DASHBOARD_URL, PUBLIC_URL } from '@/config/url.config'
import { ArrowRight } from 'lucide-react'

export function Success() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h3>Заказ успешно оплачен</h3>
        <p>Спасибо за покупку!</p>
        <p> Вы можете забрать ваш заказ в любое удобное для вас время
          в нашем магазине.
        </p>
        <div className={styles.buttonsHolder}>
          <Link href={PUBLIC_URL.explorer()}>
            <Button className={styles.button} variant='ghost'>Вернуться в магазин <ArrowRight /></Button>
          </Link>
          <Link href={DASHBOARD_URL.home()}>
            <Button className={styles.button} variant='ghost'>Список ваших заказов <ArrowRight /> </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}