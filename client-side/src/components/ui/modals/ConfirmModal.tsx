import { PropsWithChildren } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/AlertDialog'

interface ConfirmModalProps {
	handleClick: () => void
	dark?: boolean
}

export function ConfirmModal({
	children,
	dark,
	handleClick
}: PropsWithChildren<ConfirmModalProps>) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent className={`${dark ? 'bg-black text-white' : ''}`}>
				<AlertDialogHeader>
					<AlertDialogTitle>Подтверждение</AlertDialogTitle>
					<AlertDialogDescription>
						Это действие нельзя будет отменить.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className='lg:justify-center'>
					<AlertDialogCancel className='cursor-pointer hover:opacity-70'>Закрыть</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-500 hover:bg-red-900 text-white transition all duration-200 '
						onClick={() => handleClick()}
					>
						Продолжить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}