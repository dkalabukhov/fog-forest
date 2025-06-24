import { IProduct } from '@/shared/types/product.interface'
import styles from './ProductCard.module.scss'
import Image from 'next/image'
import { formatPrice } from '@/helpers/formatPrice'

interface ProductCardProps {
  product: IProduct
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <header className={styles.card__header}>
        <h3 className={styles.card__title}>
          {product.title}
        </h3>
        <span className={styles.card__price}>{formatPrice(product.price)}</span>
        <span className={styles.card__category}>{product.category.title}</span>
      </header>
      <div className={styles.card__body}>
        <Image
          className={styles.card__image}
          src={product.images[0]}
          alt={product.title}
          width={303}
          height={333}
        />
        <p className={styles.card__description}>{product.description}</p>
      </div>
    </div>
  )
}