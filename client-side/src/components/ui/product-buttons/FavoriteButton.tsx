'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { Button } from '@/components/ui/Button'

import { useProfile } from '@/hooks/useProfile'

import { userService } from '@/services/user.service'

import { IProduct } from '@/shared/types/product.interface'
import { useGetFavorites } from '@/hooks/queries/favorites/useGetFavorites'
import { useState } from 'react'

interface FavoriteButtonProps {
  product: IProduct
}

export function FavoriteButton({ product }: FavoriteButtonProps) {
	const { data } = useGetFavorites()
	const [isExists, setIsExists] = useState(data?.some(item => item.id === product.id))
  const { user } = useProfile()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['toggle favorite'],
    mutationFn: () => userService.toggleFavorites(product.id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile']
      });
			queryClient.invalidateQueries({
				queryKey: ['get favorites']
			})

			setIsExists(!isExists)
    },
  })

  if (!user) return null

  return (
    <Button
      variant='secondary'
      size='icon'
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isExists ? (
        <AiFillHeart color='#F43F5E' className='size-8' />
      ) : (
        <AiOutlineHeart className='size-8' />
      )}
    </Button>
  )
}