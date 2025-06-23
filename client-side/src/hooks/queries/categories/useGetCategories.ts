import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { categoryService } from '@/services/category.service'

export const useGetCategories = () => {
	const { data: categories, isLoading } = useQuery({
		queryKey: ['get categories for store dashboard'],
		queryFn: () => categoryService.getAll(),
	})

	return useMemo(
		() => ({
			categories,
			isLoading
		}),
		[categories, isLoading]
	)
}