import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'

import { ICartItem } from '@/shared/types/cart.interface'

import styles from '../HeaderCart.module.scss'

interface CartActionsProps {
	item: ICartItem
}

export function CartActions({ item }: CartActionsProps) {
	const { changeQuantity, removeFromCart } = useActions()

	const { items } = useCart()
	const quantity = items.find(cartItem => cartItem.id === item.id)?.quantity

	return (
		<div className={styles.actions}>
			<Button
				onClick={() => {
					if (quantity === 1) {
						removeFromCart({ id: item.id })
					} else {
						changeQuantity({ id: item.id, type: 'minus' })
					}
				}}
				variant='ghost'
				size='icon'
			>
				<Minus />
			</Button>

			<input disabled readOnly value={quantity} />

			<Button
				onClick={() => changeQuantity({ id: item.id, type: 'plus' })}
				variant='ghost'
				size='icon'
			>
				<Plus />
			</Button>
		</div>
	)
}
