'use client'

import { Heading } from '@/components/ui/Heading'
import { DataTable } from '@/components/ui/data-table/DataTable'
import DataTableLoading from '@/components/ui/data-table/DataTableLoading'
import { formatDate } from '@/helpers/formatDate'

import styles from '../Store.module.scss'

import { IOrderColumn, orderColumns } from './OrderColumns'
import { useGetOrders } from '@/hooks/queries/orders/useGetOrders'
import { EnumOrderStatus } from '@/shared/types/order.interface'

export function Orders() {
  const { orders, isLoading } = useGetOrders()

  const formattedOrders: IOrderColumn[] = orders
    ? orders.map((order) =>({
        id: order.id,
        products: order.items.reduce((acc, item) => {
          return acc + `${item.product.title} (${item.quantity}шт)\n`
        }, ''),
        createdAt: formatDate(order.createdAt),
        status: order.status === EnumOrderStatus.PAYED ? 'Оплачен' : 'Не оплачен',
        username: order.user.name
      }))
    : []

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <DataTableLoading />
      ) : (
        <>
          <div className={styles.header}>
            <Heading
              title={`Заказы (${orders?.length ?? 0})`}
              description='Список заказов'
            />
          </div>
          <div className={styles.table}>
            <DataTable
              columns={orderColumns}
              data={formattedOrders}
            />
          </div>
        </>
      )}
    </div>
  )
}