'use client'

import { Catalog } from '@/components/ui/catalog/Catalog';
import styles from '../Home.module.scss'
import { productService } from "@/services/product.service";
import { IProduct } from "@/shared/types/product.interface";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface ExplorerProps {
  products: IProduct[]
}

export function Explorer({ products }: ExplorerProps) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  const { data } = useQuery({
    queryKey: ['product explorer', searchTerm],
    queryFn: () => productService.getAllWithFilters(searchTerm),
    initialData: products
  })
  return (
    <div className={styles.catalog}>
      <Catalog
        title={
          searchTerm
            ? `Результаты поиска по запросу "${searchTerm}"`
            : 'Каталог товаров'
        }
        products={data}
      />
    </div>
  )
}