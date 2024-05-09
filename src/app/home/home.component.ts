import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';
import { map } from 'rxjs';
import { ImageProcesService } from '../image-proces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: product[] =[];

  responsiveOptions: any[] | undefined;

  constructor(
    private productService: ProductService,
    private ImageProcess:ImageProcesService,
    private router: Router) {}

  ngOnInit() {
    this.getproducts();

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

}



