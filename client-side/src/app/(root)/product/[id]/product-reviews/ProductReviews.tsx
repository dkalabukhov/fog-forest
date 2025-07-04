import { Plus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'

import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'
import { ReviewModal } from '@/components/ui/modals/ReviewModal'

import { useDeleteReview } from '@/hooks/queries/reviews/useDeleteReview'
import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/shared/types/product.interface'

import styles from './ProductReviews.module.scss'

interface ProductReviewsProps {
	product: IProduct
}

export function ProductReviews({ product }: ProductReviewsProps) {
	const { user } = useProfile()

	const { deleteReview } = useDeleteReview()

	return (
		<>
			<div className={styles.header}>
				<h1>Отзывы</h1>
				{user && (
					<ReviewModal>
						<div className={styles.button_addReview}>
							<Plus />
							Добавить отзыв
						</div>
					</ReviewModal>
				)}
			</div>
			<div className={styles.reviews}>
				{product.reviews.length ? (
					product.reviews.map(review => (
						<div key={review.id} className={styles.review}>
							<div className={styles.header}>
								<div className={styles.user}>
									<Image
										src={review.user.picture}
										alt={review.user.name}
										width={40}
										height={40}
									/>
									{review.user.name}
								</div>
								{review.user.id === user?.id && (
									<ConfirmModal
										dark={true}
										handleClick={() =>
											deleteReview(review.id)
										}
									>
										<button className={styles.delete}>
											<Trash />
										</button>
									</ConfirmModal>
								)}
							</div>
							<Rating
								readonly
								initialValue={review.rating}
								SVGstyle={{
									display: 'inline-block'
								}}
								size={18}
								allowFraction
								transition
							/>
							<div className={styles.text}>{review.text}</div>
						</div>
					))
				) : (
					<div className={styles.not_found}>
						У товара нет отзывов. Оставьте первый
					</div>
				)}
			</div>
		</>
	)
}
