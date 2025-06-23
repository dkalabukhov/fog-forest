import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

import { STORE_URL } from '@/config/url.config'

import { categoryService } from '@/services/category.service'

import { ICategoryInput } from '@/shared/types/category.interface'

export const useCreateCategory = () => {
	const router = useRouter()

	const queryClient = useQueryClient()

	const { mutate: createCategory, isPending: isLoadingCreate } = useMutation({
		mutationKey: ['create category'],
		mutationFn: (data: ICategoryInput) =>
			categoryService.create(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get categories for store dashboard']
			})
			toast.success('Категория создана')
			router.push(STORE_URL.categories())
		},
		onError() {
			toast.error('Ошибка при создании категории')
		}
	})

	return useMemo(
		() => ({
			createCategory,
			isLoadingCreate
		}),
		[createCategory, isLoadingCreate]
	)
}
