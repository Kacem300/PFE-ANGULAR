import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { map } from 'rxjs/operators';
import { ImageProcesService } from '../image-proces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productDetails:product[]=[];
  show:boolean=false;
  amount:number=0;
  constructor(private productService:ProductService,private ImageProcess:ImageProcesService,private router:Router){}
  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct(){
    this.productService.getAllProduct()
    .pipe(
      map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
    )
    .subscribe({
      next:(response:product[])=>{
        console.log(response)
        this.productDetails = response;
      },
      error:(Error:HttpErrorResponse) =>{
        console.log(Error+ " Error product-details")
      }

    })}

    getClass(index: number): string {
      return `pic-${index + 1}`;
    }

    add(){
      }

      showprodcut(productId:number){
/*         this.router.navigate(['/details'],{queryParams:{id:productId}})*/
this.router.navigate(['/details',{productId : productId}])
}
}
