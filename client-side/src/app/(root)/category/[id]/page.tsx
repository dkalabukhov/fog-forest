import { Catalog } from '@/components/ui/catalog/Catalog'
import styles from '../../Home.module.scss'
import { categoryService } from '@/services/category.service'
import { productService } from '@/services/product.service'

export const revalidate = 60

async function getProducts(id: string) {
  const [products, category] = await Promise.all([
    productService.getByCategory(id),
    categoryService.getById(id)
  ])

  return { products, category }
}

export default async function CategoryPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = await Promise.resolve(params);
  const { category, products } = await getProducts(id)

  return (
    <div className={styles.catalog}>
      <Catalog
        title={category.title}
        description={category.description}
        products={products}
      />
    </div>
  )
}