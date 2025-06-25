import { IProduct } from "./product.interface"

export interface IFavorite {
  userId: string
  productId: string
  product: IProduct
}