import { Component, Input, OnInit, Output, input } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { Router } from '@angular/router';
import { product } from '../_model/product.model';
import { User } from '../_model/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductSize } from '../_model/productSize.model';
import { UserService } from '../_Services/user.service';
import { UserAuthService } from '../_Services/user-auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() cartLength: number = 0;
  role: String="";
total:number = 0;
orderSuccess: any;

 cartDetails:any []= [];
constructor(
  private productService:ProductService,
  private router:Router,
  public sanitizer:DomSanitizer,
  public UserService:UserService,
  private userauthservice:UserAuthService,
){}


ngOnInit(): void {
    this.getCart();
    this.checkout();

  }
  public updateCartLength() {
    this.cartLength = this.cartDetails.length;
  }

  public isUser(){
    return this.userauthservice.isUser();
  }

  isUserRole(): boolean {
    return this.role === 'User';
  }


    clearCart() {
      this.cartDetails = []
      localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
      this.getCartTotal()
      this.updateCartLength()
    }

    addAmount(index:number) {
      if (this.cartDetails[index].quantity < this.getQuantityForSelectedSize(this.cartDetails[index])) {
        this.cartDetails[index].quantity++
        localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
        this.getCartTotal();
      }
      this.updateCartLength()
    }

    minsAmount(index:number) {
      if (this.cartDetails[index].quantity > 1) {
        this.cartDetails[index].quantity--
        localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
        this.getCartTotal();
      }
      this.updateCartLength()

    }

  detectChange() {
    localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
    this.getCartTotal();  }



    deleteProduct(index:number) {

      this.cartDetails.splice(index , 1)
      localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))
      this.getCartTotal();
      this.updateCartLength()

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
getQuantityForSelectedSize(item: any): number {
  let size = item.product.productSizes.find((size: { size: any; }) => size.size === item.size);
  return size ? size.quantity : 0;
}


}


