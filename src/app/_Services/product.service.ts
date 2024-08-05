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
import { FileHandle } from '../_model/file-handle.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient:HttpClient) { }



public addProduct(product:FormData){
  return this.httpCLient.post<product>("http://localhost:9090/addNewProduct",product);
}
public deleteproduct(productId:number){
  return this.httpCLient.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

public getAllProduct(page: number, keySearch: string = "", categoryName: string = "",productGroupsName:string="") {
  return this.httpCLient.get<Array<product>>(
    "http://localhost:9090/getAllProduct?pageNumber=" + page + "&keySearch=" + keySearch + "&categoryName=" + categoryName+"&productGroupsName="+productGroupsName
  );
}


public saveImage(imageFile: File[]): Observable<FileHandle> {
  const formData: FormData = new FormData();

  for (let file of imageFile) {
    formData.append('imageFile', file, file.name);
  }

  return this.httpCLient.post<FileHandle>("http://localhost:9090/uploadImage", formData);
}




/* public getAllProduct(page:number,keySearch: string = ""){
  return this.httpCLient.get<Array<product>>("http://localhost:9090/getAllProduct?pageNumber="+page+"&keySearch="+keySearch);
} */

/*Category & Groups*/
public addCategory(category: FormData): Observable<ProductCategory> {
  return this.httpCLient.post<ProductCategory>("http://localhost:9090/addCategory", category);
}
public addGroup(groups: FormData): Observable<ProductGroups> {
  return this.httpCLient.post<ProductGroups>("http://localhost:9090/addGroup", groups);
}



public deletepProductCategory(productCategoryId:number){
  return this.httpCLient.delete("http://localhost:9090/deleteProductCategory/"+productCategoryId);
  }
  public deleteProductGroups(productGroupsId:number){
  return this.httpCLient.delete("http://localhost:9090/deleteProductGroup/"+productGroupsId);
  }

public getProductbyid(productId:number){
return this.httpCLient.get<product>("http://localhost:9090/getProductDetailsbyId/"+productId)
}
public getCategoryById(productId:number){
  return this.httpCLient.get<ProductCategory>("http://localhost:9090/getCategoryById/"+productId)
  }
  public getCategories(): Observable<ProductCategory[]> {
    return this.httpCLient.get<ProductCategory[]>("http://localhost:9090/getCategories");
  }
  public getGroups(): Observable<ProductGroups[]> {
    return this.httpCLient.get<ProductGroups[]>("http://localhost:9090/getGroups");
  }

/*   public updateCategory(ProductCategoryId: number, category: ProductCategory) {
    return this.httpCLient.put<ProductCategory>(`http://localhost:9090/${ProductCategoryId}`, category);
  }
  public updateGroup(ProductGroupsId: number, groups: ProductGroups) {
    return this.httpCLient.put<ProductGroups>(`http://localhost:9090/${ProductGroupsId}`, groups);
  } */

  public updateCategory(ProductCategoryId: number, category: ProductCategory) {
    return this.httpCLient.put<ProductCategory>(`http://localhost:9090/category/${ProductCategoryId}`, category);
}

public updateGroup(ProductGroupsId: number, groups: ProductGroups) {
    return this.httpCLient.put<ProductGroups>(`http://localhost:9090/group/${ProductGroupsId}`, groups);
}

  /*Category & Groups*/


public getProductDetails(single:boolean,productId:number){
  return this.httpCLient.get<product[]>("http://localhost:9090/details/"+single+"/"+productId);

}
public placeOrder(orderDetails:orderDetails,single:any){
  return this.httpCLient.post<orderDetails>("http://localhost:9090/placeOrder"+"/"+single,orderDetails);
}


public addToCart(productIds: number[]){
  return this.httpCLient.post("http://localhost:9090/addToCart", productIds);
}


public getCart(){
  return this.httpCLient.get("http://localhost:9090/getCart");
}



/* public getOrderDetails():Observable<MyorderDetails[]>{
  return this.httpCLient.get<MyorderDetails[]>("http://localhost:9090/getOrderDetails");
} */

public getOrderDetails(productName: string = ''): Observable<MyorderDetails[]> {
  return this.httpCLient.get<MyorderDetails[]>(`http://localhost:9090/getOrderDetails?productName=${productName}`);
}

getAllOrderDetailsForAdmin(status: string, searchKeyword: string = ''): Observable<MyorderDetails[]> {
  return this.httpCLient.get<MyorderDetails[]>(`http://localhost:9090/getAllOrderDetails/${status}?searchKeyword=${searchKeyword}`);
}



public markAsDelivered(orderId:Number) {
  return this.httpCLient.get("http://localhost:9090/markOrderAsDelivered/"+orderId)
}

public markOrderAsPlaced(orderId:Number) {
  return this.httpCLient.get("http://localhost:9090/markOrderAsPlaced/"+orderId)
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

public getTotalRevenue(): Observable<Number> {
  return this.httpCLient.get<Number>("http://localhost:9090/getTotalRevenue");
}

public getRevenuePerMonth(): Observable<OrderCount[]> {
  return this.httpCLient.get<OrderCount[]>("http://localhost:9090/getRevenuePerMonth");
}


public getNewRevenue(): Observable<Number> {
  return this.httpCLient.get<Number>("http://localhost:9090/getNewRevenue");
}





getNewContactFormCount(): Observable<number> {
  return this.httpCLient.get<number>('http://localhost:9090/getNewContactFormCount');
}

getTotalContactFormCount(): Observable<number> {
  return this.httpCLient.get<number>('http://localhost:9090/getTotalContactFormCount');
}

getContactFormCountsPerMonth(): Observable<OrderCount[]> {
  return this.httpCLient.get<OrderCount[]>('http://localhost:9090/getContactFormCountsPerMonth');
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
public getOrderCountPerProduct(productId:number):Observable<number>{
  return this.httpCLient.get<number>(`http://localhost:9090/getOrderCountPerProduct/${productId}`);
}

public getUserRatingForProduct(productId: number): Observable<number> {
  return this.httpCLient.get<number>(`http://localhost:9090/userRating/${productId}`);
}

// Home //
public getRandomProducts(): Observable<product[]> {
  return this.httpCLient.get<product[]>("http://localhost:9090/getRandomProducts");
}
public getTopOrderedProducts(limit: number = 10): Observable<product[]> {
  return this.httpCLient.get<product[]>(`http://localhost:9090/getTopOrderedProducts?limit=${limit}`);
}
public getLeastOrderedProducts(limit: number = 10): Observable<product[]> {
  return this.httpCLient.get<product[]>(`http://localhost:9090/getLeastOrderedProducts?limit=${limit}`);
}
public getTopRatedProducts(limit: number = 10): Observable<product[]> {
  return this.httpCLient.get<product[]>(`http://localhost:9090/getTopRatedProducts?limit=${limit}`);
}
public getWorstRatedProducts(limit: number = 10): Observable<product[]> {
  return this.httpCLient.get<product[]>(`http://localhost:9090/getWorstRatedProducts?limit=${limit}`);
}

// Home //
}
