import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { productService } from '@/services/product.service'

export const useGetProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['get products for store dashboard'],
		queryFn: () => productService.getAll(),
	})

	return useMemo(
		() => ({
			products,
			isLoading
		}),
		[products, isLoading]
	)
}