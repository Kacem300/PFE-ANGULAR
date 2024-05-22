
import { ProductGroups } from "./ProductGroups.model";
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
  productGroups:ProductGroups[],
   productCategoryId?:number,
   productCategory:ProductCategory,
   size?:any,
  show?: boolean;
  sizeType?: boolean,
  sizesList?: ["XS", "S", "M", "L", "XL", "XXL"],
  showFullDescription?:boolean,

}
