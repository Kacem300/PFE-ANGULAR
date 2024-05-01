import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { MyorderDetails } from '../_model/order.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  status: string = 'All';
  ordernumber: Number = 0;
  totalUserCount:number=0;
  newOrdersCount: Number = 0;
  newUserCount: Number = 0;

  data: any;
  options: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
   /*  this.getOrderCountsPerMonth();
    this.getUserCountsPerMonth(); */
    this.getNewNumberOrder();
    this.getNumberOrder();
    this.getNewUserCount();
    this.getTotalUserCount();
    this.getCountsPerMonth();
}


getCountsPerMonth() {
  forkJoin({
    orderCounts: this.productService.getOrderCountsPerMonth(),
    userCounts: this.productService.getUserCountsPerMonth()
  }).subscribe(({ orderCounts, userCounts }) => {
    this.data = {
      labels: orderCounts.map(orderCount => orderCount.yearMonth),
      datasets: [
        {
          label: 'Number of Orders',
          data: orderCounts.map(orderCount => orderCount.count),
          fill: false,
          borderColor: '#4bc0c0',

        },
        {
          label: 'Number of Users',
          data: userCounts.map(userCount => userCount.count),
          fill: false,
          borderColor: '#4b00c0',

        }
      ]
    };
  });
}


/* getOrderCountsPerMonth(){
this.productService.getOrderCountsPerMonth().subscribe(orderCounts => {
  this.data = {
    labels: orderCounts.map(orderCount => orderCount.yearMonth),
    datasets: [
      {
        label: 'Number of Orders',
        data: orderCounts.map(orderCount => orderCount.count),
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  };
  console.log(this.data.datasets[0].data,"ngonit");
});
}

getUserCountsPerMonth() {
  this.productService.getUserCountsPerMonth().subscribe(userCounts => {
    this.data.datasets.push({
      label: 'Number of Users',
      data: userCounts.map(userCount => userCount.count),
      fill: false,
      borderColor: '#4b00c0' // Change color to distinguish from orders
    });
  });
} */
/* getUserCountsPerMonth() {
  this.productService.getUserCountsPerMonth().subscribe(userCounts => {
    this.data = {
      labels: userCounts.map(userCount => userCount.yearMonth),
      datasets: [
        {
          label: 'Number of Users',
          data: userCounts.map(userCount => userCount.count),
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
    console.log(this.data.datasets[0].data,"ngonit");
  });
} */

getNumberOrder() {
  this.productService.getTotalOrderCount().subscribe(totalOrderCount => {
    this.ordernumber = totalOrderCount;
  });
}
getNewNumberOrder(){
  this.productService.getNewOrderCount().subscribe(newOrderCount => {
    this.newOrdersCount = newOrderCount;
  });
}

getNewUserCount() {
  this.productService.getNewUserCount().subscribe(newUserCount => {
    this.newUserCount = newUserCount;
  });
}

getTotalUserCount() {
  this.productService.getTotalUserCount().subscribe(totalUserCount => {
    this.totalUserCount = totalUserCount;
  });
}

}
