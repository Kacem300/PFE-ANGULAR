import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { map } from 'rxjs/operators';
import { ImageProcesService } from '../image-proces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  cartproducts:any[]=[];
  showLoadButton = false;
  pageNumber: number = 0;
  productDetails: product[] = [];
  show: boolean = false;
  amount: number = 0;
  productsPerPage: number = 4; // Number of products to display per page
  totalPages: number = 0; // Total number of pages

  constructor(private productService: ProductService,
     private ImageProcess: ImageProcesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProduct();
  }
  searchByKeyword(searchByKeyword: string) {
    console.log(searchByKeyword);
    this.pageNumber = 0 ;
    this.productDetails = [];
    this.getAllProduct(searchByKeyword);
    }

  public getAllProduct(searchKey: string = "") {
    this.productService.getAllProduct(this.pageNumber,searchKey)
    .pipe(
      map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
    )
    .subscribe({
      next:(resp: product[]) => {
        console.log(resp);
        if(resp.length == 4) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.productDetails.push(p));
      },
      error:(error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }



  getClass(index: number): string {
    return `pic-${index + 1}`;
  }



  showprodcut(productId: number, single: boolean) {
    this.router.navigate(['/details', { productId: productId, single: single }]);
  }

  public loadMoreProduct() {
    this.pageNumber++;
    this.getAllProduct();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index);
  }

  goToPage(page: number): void {
    this.pageNumber = page;
    this.getAllProduct();
  }

  addtocart(product: product) {

    this.cartproducts = JSON.parse(localStorage.getItem('Cart') || '[]') || []; // get existing cart from local storage or initialize as empty array
    let productExists = this.cartproducts.some(item => item.product.productId === product.productId); // check if product already exists in cart

    if (!productExists) {
      this.cartproducts.push({ // add new product to cart
        product: product,
        quantity: this.amount
      });
    } else {
      let productIndex = this.cartproducts.findIndex(item => item.product.productId === product.productId); // get index of existing product in cart
      let productInCart = this.cartproducts[productIndex]; // get the existing product in cart
      productInCart.quantity += this.amount; // update quantity of existing product
      this.cartproducts[productIndex] = productInCart; // update the cart array with the updated product
    }

    localStorage.setItem('Cart', JSON.stringify(this.cartproducts)); // store updated cart in local storage
    this.amount =0;

  }


}
