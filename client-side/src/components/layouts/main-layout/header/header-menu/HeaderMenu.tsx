'use client'

import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Loader } from '@/components/ui/Loader'
import { DASHBOARD_URL, PUBLIC_URL, STORE_URL } from '@/config/url.config'

import { useProfile } from '@/hooks/useProfile'

import styles from './HeaderMenu.module.scss'
import { HeaderCart } from './header-cart/HeaderCart'
import { useGetRole } from '@/hooks/useGetRole'
import { EnumRole } from '@/shared/types/role.enum'

export function HeaderMenu() {
	const { user, isLoading } = useProfile()
  const { role } = useGetRole();

	return (
		<header className={styles.header}>
			<HeaderCart />
			<div className={styles.header_menu}>
				{role === EnumRole.ADMIN && (
					<Link href={STORE_URL.products()}>
						<Button className='cursor-pointer hover:opacity-80' variant='ghost'>Управление магазином</Button>
					</Link>
				)}
				<Link href={PUBLIC_URL.explorer()}>
					<Button className='cursor-pointer hover:opacity-80' variant='ghost'>Каталог</Button>
				</Link>
				{isLoading ? (
					<Loader size='sm' />
				) : user ? (
					<>
						<Link href={DASHBOARD_URL.favorites()}>
							<Button className='cursor-pointer hover:opacity-80' variant='ghost'>Избранное</Button>
						</Link>
						<Link href={DASHBOARD_URL.home()}>
							<Image
								src={user.picture}
								alt={user.name}
								width={42}
								height={42}
								className={styles.avatar}
							/>
						</Link>
					</>
				) : (
					<Link href={PUBLIC_URL.auth()}>
						<Button className='cursor-pointer hover:opacity-80'>
							<LogOut className={styles.icon} />
							Войти
						</Button>
					</Link>
				)}
			</div>
		</header>
  )
}