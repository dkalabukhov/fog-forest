'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { DataTable } from '@/components/ui/data-table/DataTable'

import { useProfile } from '@/hooks/useProfile'

import { authService } from '@/services/auth/auth.service'

import { EnumOrderStatus } from '@/shared/types/order.interface'

import { formatDate } from '@/helpers/formatDate'
import { formatPrice } from '@/helpers/formatPrice'

import styles from './Dashboard.module.scss'
import { IOrderColumn, orderColumns } from './OrderColumns'

export function Dashboard() {
	const router = useRouter()

	const { user } = useProfile()

	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => router.push('/auth')
	})

	if (!user) return null

	const formattedOrders: IOrderColumn[] = user.orders.map(order => ({
		createdAt: formatDate(order.createdAt),
		products: order.items.reduce((acc, item) => {
			return acc + `${item.product.title} (${item.quantity}шт)\n`
		}, ''),
		status:
			order.status === EnumOrderStatus.PENDING ? 'Ждет оплаты' : 'Оплачен',
		total: formatPrice(order.total)
	}))

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h3 className={styles.heading}>Ваши заказы</h3>
				<Button
					className='cursor-pointer hover:opacity-80'
				 	variant='ghost'
					onClick={() => logout()}>
					<LogOut />
					Выйти
				</Button>
			</div>
			<DataTable columns={orderColumns} data={formattedOrders} />
		</div>
	)
}
