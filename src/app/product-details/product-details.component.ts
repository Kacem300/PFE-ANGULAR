import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ImageProcesService } from '../image-proces.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productDetails:product[]=[];
constructor(private productService:ProductService,
   public dialog:MatDialog,
   private imageService:ImageProcesService,
   private router:Router
   ){}

ngOnInit():void{
  this.getAllProduct();
}
add(){
  this.router.navigate(['/addNewProduct'])
  }

public getAllProduct(){
this.productService.getAllProduct()
.pipe(
  map((x: product[], i) => x.map((product: product) => this.imageService.createimage(product)))
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

showImages(product: product) {
console.log(product);
this.dialog.open(ImageDialogComponent,{

  data:{
    images:product.productImages
  },
  height:'500px',
  width:'800px'
});
}

editProductDetails(productId:number){
this.router.navigate(['/addNewProduct',{productId}]);
}

deleteProduct(productId:any){
this.productService.deleteproduct(productId).subscribe({
  next:(response)=>{
    console.log(response)
    this.getAllProduct();
},
error:(Error: HttpErrorResponse)=>{
  console.log("Delete Failed");
}
})}

}
