import { PropsWithChildren, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Rating } from 'react-simple-star-rating'
import styles from './ReviewModal.module.scss'

import { useCreateReview } from '@/hooks/queries/reviews/useCreateReview'

import { IReviewInput } from '@/shared/types/review.interface'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { Textarea } from '@/components/ui/Textarea'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../form-elements/Form'


export function ReviewModal({
	children,
}: PropsWithChildren<unknown>) {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<IReviewInput>({
		mode: 'onChange'
	})

	const { createReview, isLoadingCreate } = useCreateReview()

	const onSubmit: SubmitHandler<IReviewInput> = data => {
		createReview(data)
		form.reset()
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className='bg-black text-white'>
				<DialogHeader>
					<DialogTitle>Создание отзыва</DialogTitle>
					<DialogDescription>
						Для создания отзыва необходимо указать рейтинг и текст.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-8'
					>
						<FormField
							control={form.control}
							name='rating'
							rules={{
								required: 'Рейтинг обязателен'
							}}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Rating
											onClick={field.onChange}
											initialValue={field.value}
											SVGstyle={{
												display: 'inline-block'
											}}
											size={20}
											transition
										/>
									</FormControl>
									<FormMessage className={styles.errorMessage} />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='text'
							rules={{
								required: 'Текст обязателен'
							}}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Текст</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Текст отзыва'
											disabled={isLoadingCreate}
										/>
									</FormControl>
									<FormMessage className={styles.errorMessage} />
								</FormItem>
							)}
						/>

						<div className='flex justify-end'>
							<Button
								variant='ghost'
								disabled={isLoadingCreate}
							>
								Добавить
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
