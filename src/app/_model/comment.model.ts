import { product } from "./product.model";
import { User } from "./user.model";

export interface Comment {
  id: number;
  user: User;
  product: product;
  commentText: string;
  commentDate: Date;
}
