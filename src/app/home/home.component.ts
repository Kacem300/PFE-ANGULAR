import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ProductService } from '../_Services/product.service';
import { Observable, map } from 'rxjs';
import { ImageProcesService } from '../image-proces.service';
import { Router } from '@angular/router';
import { FileHandle } from '../_model/file-handle.model';
import { UserService } from '../_Services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  topProduct: product = {} as product;
  topRatedProduct: product = {} as product;
  images: FileHandle[] = []; // This would be your array of image files


  products: product[] =[];

  responsiveOptions: any[] | undefined;

  constructor(
    private productService: ProductService,
    private ImageProcess:ImageProcesService,
    private router: Router,
    public UserService:UserService,
    private sanitizer:DomSanitizer) {}

  ngOnInit() {
    this.getproducts();
    this.topRatedProducts();
      this.responsiveOptions = [
          {
              breakpoint: '1400px',
              numVisible: 3,
              numScroll: 3
          },
          {
              breakpoint: '1220px',
              numVisible: 2,
              numScroll: 2
          },
          {
              breakpoint: '1100px',
              numVisible: 1,
              numScroll: 1
          }
      ];

      this.topproducts();
}


getproducts(){
  this.productService.getRandomProducts()
  .pipe(
    map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
  )
  .subscribe({
    next:(products: product[]) => {
      this.products = products;},
      error:(error)=>{
        console.log(error);

      }

});
}
showprodcut(productId: number, single: boolean) {
  this.router.navigate(['/details', { productId: productId, single: single }]);
}

topFunction(): void {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

topproducts(){
this.productService.getTopOrderedProducts(10).subscribe(products => {
  if (products && products.length > 0){
  this.topProduct = this.ImageProcess.createimage(products[0]);
  console.log(this.topProduct); // logs the top 5 ordered products
  }
});
}
topRatedProducts(){
this.productService.getTopRatedProducts(10).subscribe(products => {
  if (products && products.length > 0){
  this.topRatedProduct = this.ImageProcess.createimage(products[0]);
  console.log(this.topRatedProduct); // logs the top 5 rated products
}
});

}

/* public SelectFile(event: any){
  if (event.target.files){
    const file = event.target.files[0];

    const fileHandle:FileHandle ={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))

    }
    this.images.push(fileHandle);
  }
}
removeimage(i:number){
  this.images.splice(i,1);

}

prepareFormData(images: FileHandle[]): FormData {
  const formData = new FormData();
  for (var i = 0; i < images.length; i++) {
    formData.append(
      'imageFile',
      images[i].file,
      images[i].file.name,
    );

}
return formData;
}


upload(imagesForm: NgForm) {
  if (this.images.length > 0) {
    const formData = this.prepareFormData(this.images);

    this.productService.saveImage(formData).subscribe({
      next: (response: Set<FileHandle>) => {
        console.log(response); // logs the uploaded images
        imagesForm.reset();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  } else {
    console.log('No images to upload');
  }
}
 */


}
