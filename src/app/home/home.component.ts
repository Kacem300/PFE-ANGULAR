import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products: product[] | undefined;

  responsiveOptions: any[] | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit() {

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

topFunction(): void {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

}



