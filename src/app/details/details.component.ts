import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{




  selectedProductIndex = 0;

  product:product = {
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountprice:0,
    productActualprice:0,
    productNote:0,
    productImages:[]
  }
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
     console.log(this.product)
  }

  addToCart(productId:any) {

  }

  changeIndex(index:number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId:any) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }
}

