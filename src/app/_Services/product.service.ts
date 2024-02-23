import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient:HttpClient) { }
public addProduct(product:FormData){
  return this.httpCLient.post<product>("http://localhost:9090/addNewProduct",product);
}
public getAllProduct(){
  return this.httpCLient.get<Array<product>>('http://localhost:9090/getAllProduct');
}

public deleteproduct(productId:number){
// return this.httpCLient.delete(`http://localhost:9090/deleteProductDetails?id=${productId}`);
return this.httpCLient.delete("http://localhost:9090/deleteProductDetails/"+productId);
}

public getProductbyid(productId:number){
return this.httpCLient.get<product>("http://localhost:9090/getProductDetailsbyId/"+productId)
}
}
