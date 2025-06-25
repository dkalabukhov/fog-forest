import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Success } from './Success'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  ...NO_INDEX_PAGE
}

export default function SuccessPage() {
  return <Success />
}