import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { Router } from '@angular/router';
import { product } from '../_model/product.model';
import { User } from '../_model/user.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

total:number = 0;

orderSuccess: any;

 cartDetails:any []= [];
constructor(
  private productService:ProductService,
  private router:Router,
  public sanitizer:DomSanitizer){}


  ngOnInit(): void {
     /*  this.cartDetails = JSON.parse(localStorage.getItem('Cart') || '[]'); // get existing cart from local storage or initialize as empty array
      console.log(this.cartDetails); */
    this.getCart();
    this.checkout();
  }



    clearCart() {
      this.cartDetails = []
      localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
      this.getCartTotal()
    }

  addAmount(index:number) {
    this.cartDetails[index].quantity++

    localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
    this.getCartTotal();
  }
  minsAmount(index:number) {
    this.cartDetails[index].quantity--

    localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
    this.getCartTotal();
  }
  detectChange() {
    localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
    this.getCartTotal();  }



    deleteProduct(index:number) {

      this.cartDetails.splice(index , 1)
      localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
      this.getCartTotal();
    }

    getCartTotal() {
      this.total = 0;
      for(let x in this.cartDetails) {
        this.total += this.cartDetails[x].product.productDiscountprice * this.cartDetails[x].quantity;
      }
      console.log(this.total+"total");
    }

/// Without Local storage
getCart(){
  if (!localStorage.getItem('Cart')) {
    this.productService.getCart().subscribe({
      next: (Response: any) => {
        console.log(Response);
        this.cartDetails = Response;
        localStorage.setItem('Cart', JSON.stringify(this.cartDetails));
        this.getCartTotal();
      },
      error: (Error) => {
        console.log(Error);
      }
    });
  } else {
    this.cartDetails = JSON.parse(localStorage.getItem('Cart') || '[]');
    this.getCartTotal();
  }
}




checkout() {
  let productIds = this.cartDetails.map(item => item.product.productId);
  this.productService.addToCart(productIds).subscribe({
      next:(response) => {
          console.log(response);
      },
      error:(error)=> {
          console.log(error);
      }
  });
}

navigate(){
  this.router.navigate(['/buyProduct', {
    single: false, productId:0
  }]);
}
/* checkout() {
  this.router.navigate(['/buyProduct', {
    single: false, productId:0
  }]);

} */


/* addToCart(productId:number) {
  this.productService.addToCart(productId).subscribe({
    next:(response) => {
      console.log(response);
    },
    error:(error)=> {
      console.log(error);
    }
});
} */



}
