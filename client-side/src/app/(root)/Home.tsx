'use client'

import { Button } from '@/components/ui/Button'
import styles from './Home.module.scss'
import { useRouter } from 'next/navigation'
import { PUBLIC_URL } from '@/config/url.config'
import { useGetProducts } from '@/hooks/queries/products/useGetProducts'
import { Catalog } from '@/components/ui/catalog/Catalog'
import { Loader } from '@/components/ui/Loader'

export function Home() {
  const router = useRouter()
  const { products, isLoading } = useGetProducts()

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.hero__content}>
            <h4 className={styles.slogan}>
              Наша компания занимается изготовлением высококачественных
              товаров домашнего приготовления, которые привнесут
              в ваш дом частичку природы
            </h4>
            <Button
              className={styles.button_products}
              onClick={() => router.push(PUBLIC_URL.explorer())}>
              Посмотреть товары
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.catalog}>
        {isLoading
        ? <Loader />
        : products &&(
          <Catalog
          title='Популярные товары'
          products={products}
        />
        )
      }
      </div>
    </>
  )
}