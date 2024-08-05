import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { orderDetails } from '../_model/orderDetails.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buyform',
  templateUrl: './buyform.component.html',
  styleUrl: './buyform.component.css'
})
export class BuyformComponent implements OnInit{
  cartDetails: any[] = []; // Define cartDetails property

  orderDetails:orderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: "",
    orderQuantities: [],
  }
  productDetails: any[] = [];
  single: string = '';


  constructor(
    private activatedRoute:ActivatedRoute,
     private productService:ProductService,
     private router:Router){}



     ngOnInit(): void {

      let cart = localStorage.getItem('Cart');

      if (cart) {
        this.cartDetails = JSON.parse(cart);
      }
      console.log(this.cartDetails);

      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
      this.single = this.activatedRoute.snapshot.paramMap.get('single') || '';
      this.cartDetails.forEach(
        x => {
          console.log('chosen size:', x.size);
    console.log('available sizes:', x.product.productSizes.map((size: { size: any; }) => size.size));
    let chosenSize = x.product.productSizes.find((size: {size: String}) => String(size.size) === String(x.size));

    console.log('chosenSize:', chosenSize);
          if (chosenSize) {
            this.orderDetails.orderQuantities.push(
              {productId: x.product.productId, productSizeId: chosenSize.productSizeId, quantity: x.quantity}
            );
          }
        }
      );

      console.log(JSON.stringify(this.orderDetails.orderQuantities+"orderquantity"));
      console.log(JSON.stringify(this.orderDetails+"orderdetails"));
      console.log(JSON.stringify(this.cartDetails+"cart details"))
    }
    clearCart() {
      this.cartDetails = []
      localStorage.setItem("Cart" , JSON.stringify(this.cartDetails))

    }

  public placeOrder(orderForm:NgForm){
console.log(this.orderDetails);
    this.productService.placeOrder(this.orderDetails,this.single).subscribe({
    next:(Response:orderDetails)=>{
      orderForm.reset();
      this.router.navigate(['/orderConfirm']);
      console.log(Response);
      console.log(Object.entries(this.orderDetails) + " success order detail");
      this.clearCart();

    },
    error:(errorRes:HttpErrorResponse)=>{
      console.log(errorRes);
      console.log(this.orderDetails+"error orderdetail");    }
  });
  }

  getQuantityForProduct(productId:number){
    const filterProduct =  this.orderDetails.orderQuantities.filter(
      (x)=> x.productId === productId
    );
    return filterProduct[0].quantity ;

  }



  getCalculatedTotal(productId:number,productDiscountprice:number){
    const filteredProduct = this.orderDetails.orderQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return Number(filteredProduct[0].quantity) * productDiscountprice;  }

  onQuantityChanged(productId:number,q:any){
      this.orderDetails.orderQuantities.filter(
      (x)=> x.productId === productId
    )[0].quantity = Number(q);

  }




getCalculatedGrandTotal(){
  let grandTotal = 0;
  this.orderDetails.orderQuantities.filter(
   (quantity)=> {

    const price = this.productDetails.filter(
      product =>product.productId === quantity.productId)[0].productDiscountprice
      grandTotal = grandTotal +  price * Number(quantity.quantity) ;
}
  );
  return grandTotal;
}

clear(orderForm:NgForm) {
  orderForm.reset();
 }



}
