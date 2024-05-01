import { product } from "./product.model";

export interface MyorderDetails {
  orderId:number;
  orderFullOrder:String;
  orderFullName:String;
  orderContactNumber:String;
  orderAmount:String;
  orderStatus:String;
  product:product;
  user:any;
  placedAt : Date;
}
