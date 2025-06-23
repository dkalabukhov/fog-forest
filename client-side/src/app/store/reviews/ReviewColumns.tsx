'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export interface IReviewColumn {
	id: string
	productName: string
	createdAt: string
	rating: string
	username: string
}

export const reviewColumns: ColumnDef<IReviewColumn>[] = [
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					className='has-[>svg]:px-2 cursor-pointer'
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Дата создания
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
		{
		accessorKey: 'productName',
		header: ({ column }) => {
			return (
				<Button
					className='has-[>svg]:px-2 cursor-pointer'
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Название продукта
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'rating',
		header: ({ column }) => {
			return (
				<Button
					className='has-[>svg]:px-2 cursor-pointer'
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Рейтинг
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	},
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					className='has-[>svg]:px-2 cursor-pointer'
					variant='ghost'
					onClick={() =>
						column.toggleSorting(column.getIsSorted() === 'asc')
					}
				>
					Пользователь
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		}
	}
]
