'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/form-elements/Input'

import { PUBLIC_URL } from '@/config/url.config'

import styles from './SearchInput.module.scss'

export function SearchInput() {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim() !== '') {
			router.push(PUBLIC_URL.explorer(`?searchTerm=${searchTerm}`))
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input
        className={styles.searchInput}
				placeholder='Поиск товаров'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
			/>
			<Button
				className='cursor-pointer hover:opacity-80'
				type='submit'
				variant='ghost'
			>
				<Search />
			</Button>
		</form>
	)
}
