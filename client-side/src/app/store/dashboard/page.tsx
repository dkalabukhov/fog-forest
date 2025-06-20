import type { Metadata } from 'next';
import Store from './Store';

export const metadata: Metadata = {
  title: 'Управление магазином',
}

export default function StorePage() {
  return <Store />
}