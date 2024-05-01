import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ImageProcesService } from '../image-proces.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {


  showLoadMoreProductButton = false;

  pageNumber: number = 0;
  productDetails:product[]=[];
constructor(private productService:ProductService,
   public dialog:MatDialog,
   private imageService:ImageProcesService,
   private router:Router,
   private confirmationService: ConfirmationService, private messageService: MessageService
   ){}

ngOnInit():void{
  this.getAllProduct();
}


add(){
  this.router.navigate(['/addNewProduct'])
  }
  loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
  }

  searchByKeyword(searchkeyword:string) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProduct(searchkeyword);
  }

public getAllProduct(searchKeyword: string = ""){
this.productService.getAllProduct(this.pageNumber,searchKeyword)
.pipe(
  map((x: product[], i) => x.map((product: product) => this.imageService.createimage(product)))
)
.subscribe({
  next:(response:product[])=>{
    console.log(response)
    this.productDetails = response;
    if(response.length == 8) {
      this.showLoadMoreProductButton = true;
    } else {
      this.showLoadMoreProductButton = false;
    }

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

/* deleteProduct(productId:any){
this.productService.deleteproduct(productId).subscribe({
  next:(response)=>{
    console.log(response)
    this.getAllProduct();
},
error:(Error: HttpErrorResponse)=>{
  console.log("Delete Failed");
}
})} */
deleteProduct(productId: any) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this product?',
    header: 'Delete Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.productService.deleteproduct(productId).subscribe({
        next: (response) => {
          console.log(response);
          this.getAllProduct();
          this.messageService.add({severity:'success', summary:'Successful', detail:'Product Deleted', life: 3000});
        },
        error: (error: HttpErrorResponse) => {
          console.log("Delete Failed");
          this.messageService.add({severity:'error', summary:'Failed', detail:'Delete Failed', life: 3000});
        }
      });
    },
    reject: () => {
      this.messageService.add({severity:'info', summary:'Cancelled', detail:'You have cancelled the deletion', life: 3000});
    }
  });
}





}
