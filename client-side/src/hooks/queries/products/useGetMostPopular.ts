import { productService } from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetMostPopular = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['get most popular products'],
    queryFn: () => productService.getMostPopular(3),
  })

  return useMemo(
    () => ({
      products,
      isLoading
    }),
    [products, isLoading]
  )
}