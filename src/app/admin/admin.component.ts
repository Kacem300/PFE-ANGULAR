import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { MyorderDetails } from '../_model/order.model';
import { forkJoin, map, switchMap } from 'rxjs';
import { product } from '../_model/product.model';
import { ImageProcesService } from '../image-proces.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  averageRate: number = 0;
  productId:number =0;
  k:number=10;
  orderCount:number=0;
  topProducts: { product: product, orderCount: number }[] = [];
  topRatedProducts: { product: product, averageRating: number }[] = [];
  LeastProducts: { product: product, orderCount: number }[] = [];
  LeastRatedProducts: { product: product, averageRating: number }[] = [];

  revenueData: any;


  status: string = 'All';

  ordernumber: Number = 0;
  newOrdersCount: Number = 0;


  totalUserCount:number=0;
  newUserCount: Number = 0;

  revenue:Number=0;
  newRevenue:Number=0;

  contact:Number=0;
  newContact:Number=0;

  data: any;
  options: any;
  constructor(private productService: ProductService,private imageProcess:ImageProcesService) { }

  ngOnInit(): void {
    this.loadTopProducts();
    this.loadTopRatedProducts();
    this.loadWorstProducts();
    this.loadWorstRatedProducts();
    this.getNewNumberOrder();
    this.getNumberOrder();
    this.getNewUserCount();
    this.getTotalUserCount();
    this.getCountsPerMonth();
    this.getRevenue();
    this.getNewRevenue();
    this.getNewContactFormCount();
    this.getTotalContactFormCount();
}

loadTopProducts(): void {
  this.productService.getTopOrderedProducts(this.k).pipe(
    map(products => products.map(product => this.imageProcess.createimage(product))),
    switchMap(products => {
      const productObservables = products.map(product =>
        this.productService.getOrderCountPerProduct(product.productId).pipe(
          map(orderCount => ({
            product:product,
            orderCount: parseFloat(orderCount.toFixed(1))
          }))
        )
      );
      return forkJoin(productObservables);
    }),
  ).subscribe(topProducts => {
    this.topProducts = topProducts;
    console.log(this.topProducts);
  });
}

loadWorstProducts(): void {
  this.productService.getLeastOrderedProducts(this.k).pipe(
    map(products => products.map(product => this.imageProcess.createimage(product))),
    switchMap(products => {
      const productObservables = products.map(product =>
        this.productService.getOrderCountPerProduct(product.productId).pipe(
          map(orderCount => ({
            product:product,
            orderCount: parseFloat(orderCount.toFixed(1))
          }))
        )
      );
      return forkJoin(productObservables);
    }),
  ).subscribe(LeastProducts => {
    this.LeastProducts = LeastProducts;
    console.log(this.LeastProducts);
  });
}

loadTopRatedProducts(): void {
  this.productService.getTopRatedProducts(this.k).pipe(
    map(products => products.map(product => this.imageProcess.createimage(product))),
    switchMap(products => {
      const ratingObservables = products.map(product =>
        this.productService.getProductAverageRating(product.productId).pipe(
          map(averageRating => ({
            product: product,
            averageRating: parseFloat(averageRating.toFixed(1))
          }))
        )
      );
      return forkJoin(ratingObservables);
    })
  ).subscribe(topRatedProducts => {
    this.topRatedProducts = topRatedProducts;
    console.log(this.topRatedProducts);
  });
}

loadWorstRatedProducts(): void {
  this.productService.getWorstRatedProducts(this.k).pipe(
    map(products => products.map(product => this.imageProcess.createimage(product))),
    switchMap(products => {
      const ratingObservables = products.map(product =>
        this.productService.getProductAverageRating(product.productId).pipe(
          map(averageRating => ({
            product: product,
            averageRating: parseFloat(averageRating.toFixed(1))
          }))
        )
      );
      return forkJoin(ratingObservables);
    })
  ).subscribe(LeastRatedProducts => {
    this.LeastRatedProducts = LeastRatedProducts;
    console.log(this.LeastRatedProducts);
  });
}





getCountsPerMonth() {
  forkJoin({
    orderCounts: this.productService.getOrderCountsPerMonth(),
    userCounts: this.productService.getUserCountsPerMonth(),
    revenueCounts: this.productService.getRevenuePerMonth(),
    contactCounts:this.productService.getContactFormCountsPerMonth()
  }).subscribe(({ orderCounts, userCounts, revenueCounts,contactCounts }) => {


    this.data = {
      labels: orderCounts.map(orderCount => orderCount.yearMonth),

      datasets: [
        {
          label: 'Number of Orders',
          data: orderCounts.map(orderCount => orderCount.count),
          fill: true,
          borderColor: '#4bc0c0',
        },
        {
          label: 'Number of Users',
          data: userCounts.map(userCount => userCount.count),
          fill: true,
          borderColor: '#4b00c0',
        },
        {
          label: 'Revenue',
          data: revenueCounts.map(revenueCount => revenueCount.count),
          fill: true,
          borderColor: '#c04b00',
        },
        {
          label: 'Contact',
          data: contactCounts.map(contactCounts => contactCounts.count),
          fill: true,
          borderColor: '#E91E63',
        }
      ]
    };
  });
}




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

getRevenue() {
  this.productService.getTotalRevenue().subscribe(totalRevenue => {
    this.revenue = totalRevenue;
  });
  console.log(this.revenue)
}

getNewRevenue() {
  this.productService.getNewRevenue().subscribe(newRevenue => {
    this.newRevenue = newRevenue;
  });
  console.log(this.newRevenue)
}


getNewContactFormCount() {
  this.productService.getNewContactFormCount().subscribe(newcontact => {
    this.newContact = newcontact;
  });
}

getTotalContactFormCount() {
  this.productService.getTotalContactFormCount().subscribe(totalcontact => {
    this.contact = totalcontact;
  });
}



}
