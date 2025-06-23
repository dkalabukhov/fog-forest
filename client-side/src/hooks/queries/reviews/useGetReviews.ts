import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import { reviewService } from '@/services/review.service'

export const useGetReviews = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['get categories'],
    queryFn: () => reviewService.getAll(),
  })

  return useMemo(
    () => ({
      reviews,
      isLoading
    }),
    [reviews, isLoading]
  )
}