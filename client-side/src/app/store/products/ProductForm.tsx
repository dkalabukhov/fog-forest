import { Trash } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
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
import { ImageUpload } from '@/components/ui/form-elements/image-upload/ImageUpload'
import { ConfirmModal } from '@/components/ui/modals/ConfirmModal'

import { useCreateProduct } from '@/hooks/queries/products/useCreateProduct'
import { useDeleteProduct } from '@/hooks/queries/products/useDeleteProduct'
import { useUpdateProduct } from '@/hooks/queries/products/useUpdateProduct'

import { ICategory } from '@/shared/types/category.interface'
import { IProduct, IProductInput } from '@/shared/types/product.interface'

import styles from '../Store.module.scss'

interface ProductFormProps {
	product?: IProduct
	categories: ICategory[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
	const { createProduct, isLoadingCreate } = useCreateProduct()
	const { updateProduct, isLoadingUpdate } = useUpdateProduct()
	const { deleteProduct, isLoadingDelete } = useDeleteProduct()

	const title = product ? 'Изменить данные' : 'Создать товар'
	const description = product
		? 'Изменить данные о товаре'
		: 'Добавить новый товар в магазин'
	const action = product ? 'Сохранить' : 'Создать'

	const form = useForm<IProductInput>({
		mode: 'onChange',
		values: {
			title: product?.title || '',
			description: product?.description || '',
			images: product?.images || [],
			price: product?.price || 0,
			categoryId: product?.category.id || '',
		}
	})

	const onSubmit: SubmitHandler<IProductInput> = data => {
		data.price = Number(data.price)
		if (product) updateProduct(data)
		else createProduct(data)
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading title={title} description={description} />
				{product && (
					<ConfirmModal handleClick={() => deleteProduct()}>
						<Button
              className={`${styles.button_delete} bg-red-500 hover:bg-red-900 text-white`}
							size='icon'
							disabled={isLoadingDelete}
						>
							<Trash className='size-4' />
              Удалить товар
						</Button>
					</ConfirmModal>
				)}
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='images'
						rules={{
							required: 'Загрузите хотя бы одну картинку'
						}}
						render={({ field }) => (
							<FormItem className='mt-4'>
								<FormLabel>Изображения товара</FormLabel>
								<FormControl>
									<ImageUpload
										isDisabled={
											isLoadingCreate || isLoadingUpdate
										}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage className={styles.errorMessage} />
							</FormItem>
						)}
					/>
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
											placeholder='Название товара'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage className={styles.errorMessage} />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							rules={{
								required: 'Цена обязательна',
                min: {
                  value: 1,
                  message: 'Цена не может быть меньше 1 рубля'
                }
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Цена</FormLabel>
									<FormControl>
										<Input
											placeholder='Цена товара'
											disabled={
												isLoadingCreate ||
												isLoadingUpdate
											}
											{...field}
										/>
									</FormControl>
									<FormMessage className={styles.errorMessage} />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categoryId'
							rules={{
								required: 'Категория обязательна'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Категория</FormLabel>
									<Select
										disabled={
											isLoadingCreate || isLoadingUpdate
										}
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Категория товара' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{categories.map(category => (
													<SelectItem
														value={category.id}
														key={category.id}
													>
														{category.title}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
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
										placeholder='Описание товара'
										disabled={
											isLoadingCreate || isLoadingUpdate
										}
										{...field}
									/>
								</FormControl>
								<FormMessage className={styles.errorMessage} />
							</FormItem>
						)}
					/>
        <div>
					<Button className={`${styles.button_submit}
            bg-blue-500
            hover:bg-blue-600
            text-white
            transition all duration 200
            `}
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
