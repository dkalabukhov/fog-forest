'use client'

import { Catalog } from '@/components/ui/catalog/Catalog'
import { useGetFavorites } from '@/hooks/queries/favorites/useGetFavorites'

import { useProfile } from '@/hooks/useProfile'
export function Favorites() {
	const { user } = useProfile()
	const { data } = useGetFavorites()

	if (!user) return null

	return (
		<div className='my-6'>
			<Catalog title='Избранное' products={data ? data : []} />
		</div>
	)
}