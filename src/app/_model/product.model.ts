import { FileHandle } from "./file-handle.model"

export interface product {
  productId:number ,
  productName:string,
  productDescription:string,
  productDiscountprice:number,
  productActualprice:number,
  productNote:number,
  productImages:FileHandle[],
  show?: boolean;

}
