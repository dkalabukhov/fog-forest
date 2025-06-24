'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export interface IOrderColumn {
  id: string
  products: string
  createdAt: string
  status: string
  username: string
}

export const orderColumns: ColumnDef<IOrderColumn>[] = [
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
    accessorKey: 'products',
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
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          className='has-[>svg]:px-2 cursor-pointer'
          variant='ghost'
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc')
          }
        >
          Статус
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    }
  }
]
