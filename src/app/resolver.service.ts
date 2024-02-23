import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { product } from './_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './_Services/product.service';
import { ImageProcesService } from './image-proces.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {
  constructor(private productService:ProductService,private imageprocess:ImageProcesService) { }
  resolve: ResolveFn<Observable<product>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const id = Number(route.paramMap.get("productId"));
    if(id){
     return this.productService.getProductbyid(id)
     .pipe(map(x=>this.imageprocess.createimage(x)))
    }else{
      return of(this.getProducts())
      console.log("error else resolver")
    }
  }
  getProducts(){
    {
      return{
        productId:0,
        productName:"",
        productDescription:"",
        productDiscountprice:0,
        productActualprice:0,
        productNote:0,
        productImages:[]

  }

  }
}


};

