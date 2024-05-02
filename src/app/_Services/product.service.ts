import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../_model/product.model';
import { orderDetails } from '../_model/orderDetails.model';
import { Observable, single } from 'rxjs';
import { MyorderDetails } from '../_model/order.model';
import { OrderCount } from '../_model/OrderCount.model';
import { Rating } from '../_model/rating.model';
import { ProductCategory } from '../_model/productCategory.model';
import { ProductGroups } from '../_model/ProductGroups.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient:HttpClient) { }



public addProduct(product:FormData){
  return this.httpCLient.post<product>("http://localhost:9090/addNewProduct",product);
}
public addCategory(category: FormData): Observable<ProductCategory> {
  return this.httpCLient.post<ProductCategory>("http://localhost:9090/addCategory", category);
}
public addGroup(groups: FormData): Observable<ProductGroups> {
  return this.httpCLient.post<ProductGroups>("http://localhost:9090/addGroup", groups);
}




public getAllProduct(page:number,keySearch: string = ""){
  return this.httpCLient.get<Array<product>>("http://localhost:9090/getAllProduct?pageNumber="+page+"&keySearch="+keySearch);
}

public deleteproduct(productId:number){
return this.httpCLient.delete("http://localhost:9090/deleteProductDetails/"+productId);
}
public deletepProductGroups(productCategoryId:number){
  return this.httpCLient.delete("http://localhost:9090/deleteProductCategory/"+productCategoryId);
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

public markOrderAsPlaced(orderId:Number) {
  return this.httpCLient.get("http://localhost:9090/markOrderAsPlaced/"+orderId)
}

public getRandomProducts(): Observable<product[]> {
  return this.httpCLient.get<product[]>("http://localhost:9090/getRandomProducts");
}

/*ADMIN DASHBOARD*/

public getOrderCountsPerMonth(): Observable<OrderCount[]> {
  return this.httpCLient.get<OrderCount[]>("http://localhost:9090/getOrderCountsPerMonth");
}

public getTotalOrderCount(): Observable<Number> {
  return this.httpCLient.get<Number>("http://localhost:9090/getTotalOrderCount");
}

public getNewOrderCount(): Observable<Number> {
  return this.httpCLient.get<Number>("http://localhost:9090/getNewOrderCount");
}

getNewUserCount(): Observable<number> {
  return this.httpCLient.get<number>('http://localhost:9090/getNewUserCount');
}

getTotalUserCount(): Observable<number> {
  return this.httpCLient.get<number>('http://localhost:9090/getTotalUserCount');
}

getUserCountsPerMonth(): Observable<OrderCount[]> {
  return this.httpCLient.get<OrderCount[]>('http://localhost:9090/getUserCountsPerMonth');
}

/*ADMIN DASHBOARD*/


public saveComment(productId: number, commentText: string): Observable<Comment> {
  return this.httpCLient.post<Comment>(`http://localhost:9090/saveComment?productId=${productId}&commentText=${commentText}`, {});
}

public getAllComments(): Observable<Comment[]> {
  return this.httpCLient.get<Comment[]>("http://localhost:9090/getAllComments");
}
public getCommentsForProduct(productId: number): Observable<Comment[]> {
  return this.httpCLient.get<Comment[]>(`http://localhost:9090/getCommentsForProduct?productId=${productId}`);
}

public rateProduct(productId: number, rating: number): Observable<Rating> {
  return this.httpCLient.post<Rating>(`http://localhost:9090/rateProduct/${productId}`, { rating });
}
public getProductAverageRating(productId: number): Observable<number> {
  return this.httpCLient.get<number>(`http://localhost:9090/product/${productId}`);
}

public getUserRatingForProduct(productId: number): Observable<number> {
  return this.httpCLient.get<number>(`http://localhost:9090/userRating/${productId}`);
}
public getCategories(): Observable<ProductCategory[]> {
  return this.httpCLient.get<ProductCategory[]>("http://localhost:9090/getCategories");
}
public getGroups(): Observable<ProductGroups[]> {
  return this.httpCLient.get<ProductGroups[]>("http://localhost:9090/getGroups");
}
}
