import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { MyorderDetails } from '../_model/order.model';

@Component({
  selector: 'app-myordersadmin',
  templateUrl: './myordersadmin.component.html',
  styleUrl: './myordersadmin.component.css'
})
export class MyordersadminComponent implements OnInit{
  dataSource: MyorderDetails[] = [];
  status: string = 'All';
  orderTagSeverities: { [key: number]: string } = {}; // Object to store tag severities for each order
  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getAllOrderDetailsForAdmin(this.status);

  }

  getAllOrderDetailsForAdmin(statusParameter: string) {
    this.productService.getAllOrderDetailsForAdmin(statusParameter).subscribe({
      next: (resp) => {
        this.dataSource = resp;
        console.log(resp);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  markAsDelivered(orderId: number) {
    console.log(orderId);
    this.productService.markAsDelivered(orderId).subscribe({
        next: (response) => {
            console.log(response);
            this.getAllOrderDetailsForAdmin(this.status);
            this.orderTagSeverities[orderId] = 'success'; // Update tagSeverity for specific order
        },
        error: (error) => {
            console.log(error);
        }
    });
}


}
