import Link from 'next/link'

import { PUBLIC_URL } from '@/config/url.config'

import { IProduct } from '@/shared/types/product.interface'

import { formatPrice } from '@/helpers/formatPrice'

import { AddToCartButton } from '../../../../../components/ui/product-buttons/AddToCartButton'
import { FavoriteButton } from '../../../../../components/ui/product-buttons/FavoriteButton'
import styles from './ProductInfo.module.scss'

interface ProductInfoProps {
	product: IProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
	const ratingNonFormatted =
			(product.reviews.reduce((acc, review) => acc + review.rating, 0) /
				product.reviews.length) || 0

	const rating = ratingNonFormatted.toFixed(1);

	return (
			<div className={styles.product_info}>
				<h1 className={styles.title}>{product.title}</h1>
				<div className={styles.price}>{formatPrice(product.price)}</div>
				<p className={styles.description}>{product.description}</p>
				<div className={styles.label}>
					<h3>Категория: </h3>
					<Link
						className='text-sm'
						href={PUBLIC_URL.category(product.category.id)}
					>
						{product.category.title}
					</Link>
				</div>
				<div className={styles.label}>
					<h3>Средний рейтинг: </h3>
					<div className='text-sm'>
						⭐ {rating}
					</div>
				</div>
				<div className={styles.actions}>
					<AddToCartButton product={product} />
					<FavoriteButton product={product} />
				</div>
			</div>
	)
}
