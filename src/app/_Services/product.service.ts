import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../_model/product.model';
import { orderDetails } from '../_model/orderDetails.model';
import { Observable, single } from 'rxjs';
import { MyorderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient:HttpClient) { }
public addProduct(product:FormData){
  return this.httpCLient.post<product>("http://localhost:9090/addNewProduct",product);
}
public getAllProduct(page:number,keySearch: string = ""){
  return this.httpCLient.get<Array<product>>("http://localhost:9090/getAllProduct?pageNumber="+page+"&keySearch="+keySearch);
}

public deleteproduct(productId:number){
// return this.httpCLient.delete(`http://localhost:9090/deleteProductDetails?id=${productId}`);
return this.httpCLient.delete("http://localhost:9090/deleteProductDetails/"+productId);
}

public getProductbyid(productId:number){
return this.httpCLient.get<product>("http://localhost:9090/getProductDetailsbyId/"+productId)
}
public getProductDetails(single:boolean,productId:number){
  return this.httpCLient.get<product[]>("http://localhost:9090/details/"+single+"/"+productId);

}
public placeOrder(orderDetails:orderDetails,single:any){
  return this.httpCLient.post<orderDetails>("http://localhost:9090/placeOrder"+"/"+single,orderDetails);
}

/* public addToCart(productId:number){
  return this.httpCLient.get("http://localhost:9090/addToCart/"+productId);
} */
public addToCart(productIds: number[]){
  return this.httpCLient.post("http://localhost:9090/addToCart", productIds);
}


public getCart(){
  return this.httpCLient.get("http://localhost:9090/getCart");
}

public getOrderDetails():Observable<MyorderDetails[]>{
  return this.httpCLient.get<MyorderDetails[]>("http://localhost:9090/getOrderDetails");
}
public getAllOrderDetailsForAdmin(status: string): Observable<MyorderDetails[]> {
  return this.httpCLient.get<MyorderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
}

public markAsDelivered(orderId:Number) {
  return this.httpCLient.get("http://localhost:9090/markOrderAsDelivered/"+orderId)
}
}
