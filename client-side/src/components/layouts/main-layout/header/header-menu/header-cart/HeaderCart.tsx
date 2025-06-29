import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet'

import { PUBLIC_URL } from '@/config/url.config'

import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { formatPrice } from '@/helpers/formatPrice'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cart-item/CartItem'
import { useCheckout } from './useCheckout'

export function HeaderCart() {
	const router = useRouter()

	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()

	const { items, total } = useCart()

	const handleClick = () => {
		if (user) {
      createPayment()
    } else {
      router.push(PUBLIC_URL.auth())
    }
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='ghost' className='cursor-pointer hover:opacity-80'>Корзина</Button>
			</SheetTrigger>
			<SheetContent className={`${styles.cart} border-none`}>
        <SheetTitle className='sr-only'>Корзина</SheetTitle>
				<Heading title='Корзина товаров' className='text-xl' />
				<div className={styles.items}>
					{items.length ? (
						items.map(item => (
							<CartItem item={item} key={item.id} />
						))
					) : (
						<div className={styles.not_found}>Корзина пуста</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Итого к оплате: {formatPrice(total)}
						</div>
						<Button
              className='bg-white text-black hover:opacity-80 transition all duration-200'
							onClick={handleClick}
							disabled={isLoadingCreate}
						>
							Перейти к оплате
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
