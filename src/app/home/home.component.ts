import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';
import { Observable, map } from 'rxjs';
import { ImageProcesService } from '../image-proces.service';
import { Router } from '@angular/router';
import { FileHandle } from '../_model/file-handle.model';
import { UserService } from '../_Services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  topProduct: product = {} as product;
  topRatedProduct: product = {} as product;
  images: FileHandle[] = []; // This would be your array of image files
  i : number =0;
  k:number=10;
  products: product[] =[];

  responsiveOptions: any[] | undefined;

  constructor(
    private productService: ProductService,
    private ImageProcess:ImageProcesService,
    private router: Router,
    public UserService:UserService,
    private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.getproducts();
    this.topRatedProducts();
      this.responsiveOptions = [
          {
              breakpoint: '1400px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '1220px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '1100px',
              numVisible: 1,
              numScroll: 1
          }
      ];

      this.topproducts();
}


getproducts(){
  this.productService.getRandomProducts()
  .pipe(
    map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
  )
  .subscribe({
    next:(products: product[]) => {
      this.products = products;},
      error:(error)=>{
        console.log(error);

      }

});
}
showprodcut(productId: number, single: boolean) {
  this.router.navigate(['/details', { productId: productId, single: single }]);
}

topFunction(): void {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

topproducts(){
this.productService.getTopOrderedProducts(this.k).subscribe(products => {
  if (products && products.length > 0){
  this.topProduct = this.ImageProcess.createimage(products[0]);
  console.log(this.topProduct);
  }
});
}
topRatedProducts(){
this.productService.getTopRatedProducts(this.k).subscribe(products => {
  if (products && products.length > 0){
  this.topRatedProduct = this.ImageProcess.createimage(products[0]);
}
});

}
}
