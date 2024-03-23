import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ProductService } from "./_Services/product.service";
import { ImageProcesService } from "./image-proces.service";
import { product } from "./_model/product.model";
import { Observable, map, of, single } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class BuyformResolverService  {
  constructor(
    private productService: ProductService,
     private imageProcessingService: ImageProcesService) { }

     resolve: ResolveFn<product[]> = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): product[] | Observable<product[]> | Promise<product[]> => {
      const productId = Number(route.paramMap.get('productId'));
      const single = Boolean(route.paramMap.get('single'));
      return this.productService
        .getProductDetails(single, productId)
        .pipe(
          map((x: product[], i) =>
            x.map((product: product) =>
              this.imageProcessingService.createimage(product)
            )
          )
        );
    };


/* resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): product[] | Observable<product[]> | Promise<product[]> {

  const  productId = Number(route.paramMap.get('productId'));
  const single = Boolean(route.paramMap.get('single'));
    return this.productService.getProductDetails(single, productId)
    .pipe(
      map(
        (x: product[], i) => x.map((product: product) => this.imageProcessingService.createimage(product))
      )
    );
} */
}



 /*  resolve: ResolveFn<Observable<product[]>> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const  productId = Number(route.paramMap.get('productId'));
    const single = Boolean(route.paramMap.get('single'));
      if(productId && single){
      return this.productService.getProductDetails(single,productId)
        .pipe(map(x => x.map(product => this.imageProcessingService.createimage(product))));
    } else {
      return of(this.getProducts());
    }
  }

  getProducts(): product[] {
    return [{
      productId:0,
      productName:"",
      productDescription:"",
      productDiscountprice:0,
      productActualprice:0,
      productNote:0,
      productImages:[]
    }];
  } */



