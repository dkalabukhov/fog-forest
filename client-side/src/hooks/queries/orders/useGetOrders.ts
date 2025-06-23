import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { orderService } from '@/services/order.service'

export const useGetOrders = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['get orders'],
    queryFn: () => orderService.getAll(),
  })

  return useMemo(
    () => ({
      orders,
      isLoading
    }),
    [orders, isLoading]
  )
}