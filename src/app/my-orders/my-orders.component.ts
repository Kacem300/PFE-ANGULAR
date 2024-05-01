import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { MyorderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  myOrderDetails: MyorderDetails[] = [];

constructor(private productService:ProductService) { }
  ngOnInit(): void {
    this.getOrderDetails();
  }

getOrderDetails(){
  this.productService.getOrderDetails().subscribe({
    next:(Response:MyorderDetails[])=>{

      this.myOrderDetails =Response;
      console.log(this.myOrderDetails);
    },
    error:(error)=>{
      console.log(error);
    }

  });
}
}
