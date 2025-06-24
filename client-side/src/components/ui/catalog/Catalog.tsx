import Link from 'next/link'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'
import { ProductCard } from './product-card/ProductCard'

export function Catalog({
	title,
	description,
	linkTitle,
	link,
	products
}: ICatalog) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.header__info}>
					<h3 className={styles.header__title}>{title}</h3>
					{description && <p>{description}</p>}
				</div>
				{link && linkTitle && <Link href={link}>{linkTitle}</Link>}
			</div>

			<div className={styles.catalog}>
				<div className={styles.products}>
					{products.length ? (
						products.map(product => (
							<ProductCard key={product.id} product={product} />
						))
					) : (
						<div>Нечего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
