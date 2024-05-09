import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from '../_model/productCategory.model';
import { ProductGroups } from '../_model/ProductGroups.model';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent implements OnInit {


  selectedGroups: any[] = [];

show:boolean=false;
newbutton :boolean = true ;
categories: ProductCategory[] = []; // Add this line
groups:ProductGroups[]=[];
sizeType:boolean=false;

product:product = {
  productId:0,
  productName:"",
  productDescription:"",
  productDiscountprice:0,
  productActualprice:0,
  productImages:[],
  productSizes:[],
  productCategory:{productCategoryId: 0, categoryName: '', sizeType: false},
  productCategoryId:0,
  ProductGroups:[{productGroupsId:0,productGroupsName:'',}],

}

constructor(private productService:ProductService,private sanitizer:DomSanitizer,private router:Router,private activatedroute:ActivatedRoute) {}


ngOnInit(): void {
  this.onProductCategoryChange();
  this.productService.getCategories().subscribe(categories => {
    this.categories = categories;


    // Load the product data inside the getCategories() subscription
    if (this.product = this.activatedroute.snapshot.data['product']) {
      console.log("resolver working");
      console.log(this.product.productCategory.categoryName + " resolver");
    } else {
      console.log("resolver is not working");
    }
    if (this.product && this.product.productId) {
      this.newbutton = false;
    }
  });


    this.productService.getGroups().subscribe({
      next: (groups: ProductGroups[]) => {
        this.groups = groups;
        console.log(groups)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });

}


addProduct(productForm: NgForm) {
  this.product.ProductGroups = this.selectedGroups;
  const productFormData = this.prepareFromData(this.product);
  console.log(productFormData);
  this.productService.addProduct(productFormData).subscribe({
    next: (Response: product) => {
      productForm.reset();
      this.product.productImages = [];
      this.product.productSizes = [];
      this.product.productCategoryId =0;
      console.log(Response);

    },
    error: (Error: HttpErrorResponse) => {
      console.log(Error);
    }
  });
}



 prepareFromData(product: product): FormData {
  const formData = new FormData();
  formData.append(
    'product',
    new Blob([JSON.stringify(product)], { type: 'application/json' })
  );
  for (var i = 0; i < product.productImages.length; i++) {
    formData.append(
      'imageFile',
      product.productImages[i].file,
      product.productImages[i].file.name,
    );
  }

  formData.append(
    'sizes',
    new Blob([JSON.stringify(product.productSizes)], { type: 'application/json' })
  );


   formData.append(
    'productCategoryId',
    new Blob([JSON.stringify(product.productCategory.productCategoryId)], { type: 'application/json' })
  );

  const productGroupIds = product.ProductGroups.map(group => group.productGroupsId);
  formData.append(
    'productGroupIds',
    new Blob([JSON.stringify(productGroupIds)], { type: 'application/json' })
  );
  return formData;

}



removeimage(i:number){
  this.product.productImages.splice(i,1);

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

addSize() {
  if (this.product.sizeType) {

    this.product.productSizes.push({ size: "S", quantity: 0, product: this.product.productId });
  } else {

    this.product.productSizes.push({ size: 0, quantity: 0, product: this.product.productId });
  }
}




removeSize(index: number) {
  this.product.productSizes.splice(index, 1);
}



onProductCategoryChange() {

  // Get the selected category
  const selectedCategory = this.categories.find(category => Number(category.productCategoryId) === Number(this.product.productCategory.productCategoryId));

  // If a matching category is found, update this.sizeType
  if (selectedCategory) {
    this.sizeType = selectedCategory.sizeType;
  }


}





}
