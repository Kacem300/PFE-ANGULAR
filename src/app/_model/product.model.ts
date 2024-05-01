import { FileHandle } from "./file-handle.model"
import { ProductCategory } from "./productCategory.model";
import { ProductSize } from "./productSize.model";

export interface product {
  productId:number ,
  productName:string,
  productDescription:string,
  productDiscountprice:number,
  productActualprice:number,
  productImages:FileHandle[],
  productSizes: ProductSize[],
  productCategoryId:number,
  show?: boolean;
  sizeType?: boolean,
  sizesList?: ["XS", "S", "M", "L", "XL", "XXL"],


}
