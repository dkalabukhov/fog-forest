import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IReview {
  id: string;
  createdAt: string;
  text: string;
  rating: number;
  user: IUser
  product: IProduct
}

export interface IReviewInput {
  text: string;
  rating: number;
}
