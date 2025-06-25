import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { IProduct } from '@/shared/types/product.interface'

interface AddToCartButtonProps {
	product: IProduct
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<Button
			className='bg-white text-black hover:opacity-80 transition-all duration-200'
			size='lg'
			onClick={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({
							product,
							quantity: 1,
							price: product.price
						})
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
