import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit {
newbutton :boolean = true ;
product:product = {
  productId:0,
  productName:"",
  productDescription:"",
  productDiscountprice:0,
  productActualprice:0,
  productNote:0,
  productImages:[]
}
constructor(private productService:ProductService,private sanitizer:DomSanitizer,private router:Router,private activatedroute:ActivatedRoute) {}
ngOnInit(): void {
  if(this.product = this.activatedroute.snapshot.data['product']){
    console.log("resolver wokring")
   }else{
    console.log("resolver is not working")
   }
   if(this.product && this.product.productId){
    this.newbutton=false;
   }
}
addProduct(productForm:NgForm){
 const productFormData =  this.prepareFromData(this.product)

  this.productService.addProduct(productFormData).subscribe({
    next:(Response:product)=>{
      productForm.reset();
      this.product.productImages=[];
    },
    error:(Error:HttpErrorResponse)=>{
      console.log(Error);
    }
  }

  )
}


removeimage(i:number){
  this.product.productImages.splice(i,1);

}

prepareFromData(product:product):FormData{
  const formdata = new FormData();
  formdata.append(
    'product',
    new Blob([JSON.stringify(product)],{type:'application/json'})
  );
  for(var i =0 ;i<product.productImages.length;i++){
    formdata.append(
      'imageFile',
      product.productImages[i].file,
      product.productImages[i].file.name,
    )
  }
return formdata;
}
public SelectFile(event: any){
  if (event.target.files){
    const file = event.target.files[0];

    const fileHandle:FileHandle ={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))

    }
    this.product.productImages.push(fileHandle);
  }
}
fileDropped(fileHandle:FileHandle){
  this.product.productImages.push(fileHandle);

}

}

