 import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { product } from '../_model/product.model';
import { map, skip } from 'rxjs/operators';
import { ImageProcesService } from '../image-proces.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductSize } from '../_model/productSize.model';
import { MessageService } from 'primeng/api';
import { CategoryServiceService } from '../_Services/category-service.service';
import { UserService } from '../_Services/user.service';
import { ProductCategory } from '../_model/productCategory.model';
import { GroupServiceService } from '../_Services/group-service.service';
import { Observable, combineLatest } from 'rxjs';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit,OnChanges  {
  @Input() selectedCategory: string = '';
  @Input() selectedGroup: string = '';

  selectedGroup2:string=this.selectedGroup;
  selectedCategory2 :string = this.selectedCategory;
  cartproducts:any[]=[];
  showLoadButton = false;
  pageNumber: number = 0;
  productDetails: product[] = [];
  show: boolean = false;
  amount: number = 0;
  productsPerPage: number = 4;
  totalPages: number = 0;
  selectedSize: string = "";

  maxQuantity: number = 0;

  searchKey: string = '';
  searchKeyControl = new FormControl('');

  categories: ProductCategory[]=[];


  constructor(
    private productService: ProductService,
    private ImageProcess: ImageProcesService,
    private router: Router,
    private messageService: MessageService,
    public UserService:UserService,
    private categoryService: CategoryServiceService,
    private groupService:GroupServiceService
    ) {
      this.categoryService.categorySelected$.subscribe(({category, group}) => {
        this.selectedCategory2 = category;
        this.selectedGroup2 = group;
        this.pageNumber = 0;
        this.productDetails = [];
        this.getAllProduct(this.searchKey, this.selectedCategory2, this.selectedGroup2);
      });


     }


      @HostListener("window:scroll", [])
     onWindowScroll() {
       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         this.loadMoreProduct();
       }
     }




  ngOnInit(): void {
    this.getAllProduct(this.searchKey, this.selectedCategory2,this.selectedGroup2);


    this.searchKeyControl.valueChanges.subscribe(searchKey => {
      this.pageNumber = 0;
      this.productDetails = [];
     this.getAllProduct(searchKey ?? undefined, this.selectedCategory2,this.selectedGroup2)
    });
  }


   ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCategory'] && !changes['selectedCategory'].isFirstChange()) {
      this.selectedCategory2 = changes['selectedCategory'].currentValue;
      this.selectedGroup2 = changes['selectedGroup'].currentValue;

      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProduct(this.searchKey, this.selectedCategory2,this.selectedGroup2);
    }
    if (changes['selectedGroup'] && !changes['selectedGroup'].isFirstChange()) {
      this.selectedGroup2 = changes['selectedGroup'].currentValue;
      this.selectedCategory2 = changes['selectedCategory'].currentValue;
      this.pageNumber = 0;
      this.productDetails = [];
      this.getAllProduct(this.searchKey, this.selectedCategory2, this.selectedGroup2);
    }
    console.log(this.selectedGroup2);
  }






    searchByKeyword($event: any) {
      this.searchKeyControl.setValue($event.target.value);
    }
    public loadMoreProduct() {
      this.pageNumber++;
      this.getAllProduct(this.searchKey, this.selectedCategory2,this.selectedGroup2);
    }
    public getAllProduct(searchKey: string = "", categoryName: string = this.selectedCategory2,groupName:string =this.selectedGroup2) {
      this.productService.getAllProduct(this.pageNumber, searchKey, categoryName,groupName)
        .pipe(
          map((x: product[], i) => x.map((product: product) => this.ImageProcess.createimage(product)))
        )
        .subscribe({
          next: (resp: product[]) => {
            console.log(resp);
            resp.forEach(p => this.productDetails.push(p));
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          }
        });
    }

    allSizesOutOfStock(item: any): boolean {
      return item.productSizes.every((size: { quantity: number; }) => size.quantity === 0);
    }




   getClass(index: number): string {
    return `pic-${index + 1}`;
  }


  showprodcut(productId: number, single: boolean) {
    this.router.navigate(['/details', { productId: productId, single: single }]);
  }




  addtocart(product: product, selectedSize: string) {
    if (product && selectedSize) {
      this.cartproducts = JSON.parse(localStorage.getItem('Cart') || '[]'); // get existing cart from local storage or initialize as empty array

      let productExists = this.cartproducts.some(item => item.product.productId === product.productId && item.size === selectedSize); // check if product with the same size already exists in cart

      if (!productExists) {
        this.cartproducts.push({ // add new product to cart
          product: product,
          size: selectedSize,
          quantity: this.amount
        });
      } else {
        let productIndex = this.cartproducts.findIndex(item => item.product.productId === product.productId && item.size === selectedSize); // get index of existing product in cart
        let productInCart = this.cartproducts[productIndex]; // get the existing product in cart
        productInCart.quantity += this.amount; // update quantity of existing product
        this.cartproducts[productIndex] = productInCart; // update the cart array with the updated product
      }

      localStorage.setItem('Cart', JSON.stringify(this.cartproducts)); // store updated cart in local storage
      this.amount = 0;
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please select a size and quantity before adding to cart'});
    }
  }



  getQuantityForSelectedSize(product: product, selectedSize: string): number {
    let size = product.productSizes.find(size => size.size === selectedSize);
    return size ? size.quantity : 0;
  }
  getStockStatus(product: product): {status: string, color: string} {
    let totalQuantity = product.productSizes.reduce((total, size) => total + size.quantity, 0);

    if (totalQuantity === 0) {
      return {status: 'Out of stock', color: 'red'};
    } else if (totalQuantity < 5) {
      return {status: 'Low stock', color: 'orange'};
    } else {
      return {status: 'In stock', color: 'green'};
    }
  }



}
