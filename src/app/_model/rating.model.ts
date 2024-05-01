import { product } from "./product.model";
import { User } from "./user.model";

export interface Rating {
  id: number;
  user: User;
  product: product;
  rating: number;
}
