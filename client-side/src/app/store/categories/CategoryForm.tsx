'use client'

import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Textarea } from '@/components/ui/Textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form-elements/Form'
import { Input } from '@/components/ui/form-elements/Input'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateCategory } from '@/hooks/queries/categories/useCreateCategory'
import { useDeleteCategory } from '@/hooks/queries/categories/useDeleteCategory'
import { useUpdateCategory } from '@/hooks/queries/categories/useUpdateCategory'

import { ICategory, ICategoryInput } from '@/shared/types/category.interface'

import styles from '../Store.module.scss'

interface ICategoryForm {
	category?: ICategory | null
}

export function CategoryForm({ category }: ICategoryForm) {
	const { createCategory, isLoadingCreate } = useCreateCategory()
	const { updateCategory, isLoadingUpdate } = useUpdateCategory()
	const { deleteCategory, isLoadingDelete } = useDeleteCategory()

	const title = category ? 'Изменить данные' : 'Создать категорию'
	const description = category
		? 'Изменить данные о категории'
		: 'Добавить новую категорию в магазин'
	const action = category ? 'Сохранить' : 'Создать'

	const form = useForm<ICategoryInput>({
		mode: 'onChange',
		values: {
			title: category?.title || '',
			description: category?.description || ''
		},
	})

	const onSubmit: SubmitHandler<ICategoryInput> = data => {
		if (category) updateCategory(data)
		else createCategory(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{category && (
					<ConfirmModal handleClick={() => deleteCategory()}>
						<Button
							className={`${styles.button_delete} bg-red-500 hover:bg-red-900 text-white transition all duration-200`}
							size='icon'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
							Удалить категорию
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className={styles.fields}>
						<FormField
							control={form.control}
							name='title'
							rules={{
								required: 'Название обязательно'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Название категории'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
										/>
									</FormControl>
									<FormMessage className={styles.errorMessage} />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name='description'
						rules={{
							required: 'Описание обязательно'
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Описание</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder='Описание категории'
										disabled={
											isLoadingCreate || isLoadingUpdate
										}
									/>
								</FormControl>
								<FormMessage className={styles.errorMessage} />
							</FormItem>
						)}
					/>

					<div>
						<Button
							className={`${styles.button_submit} bg-blue-500 hover:bg-blue-600 text-white transition all duration-200 cursor-pointer`}
							disabled={isLoadingCreate || isLoadingUpdate}
						>
							{action}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
