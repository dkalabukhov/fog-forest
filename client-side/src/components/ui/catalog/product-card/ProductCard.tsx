import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductCard.module.scss'
import Image from 'next/image'
import { formatPrice } from '@/helpers/formatPrice'
import Link from 'next/link'
import { PUBLIC_URL } from '@/config/url.config'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <header className={styles.card__header}>
        <Link href={PUBLIC_URL.product(product.id)}>
          <h3 className={styles.card__title}>
            {product.title}
          </h3>
        </Link>
        <span className={styles.card__price}>{formatPrice(product.price)}</span>
        <Link className={styles.card__category} href={PUBLIC_URL.category(product.category.id)}>
          <span>{product.category.title}</span>
        </Link>
      </header>
      <div className={styles.card__body}>
        <Link href={PUBLIC_URL.product(product.id)}>
          <Image
            className={styles.card__image}
            src={product.images[0]}
            alt={product.title}
            width={303}
            height={333}
          />
        </Link>
        <p className={styles.card__description}>{product.description}</p>
      </div>
    </div>
  )
}