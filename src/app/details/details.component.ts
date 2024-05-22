import { Component, OnInit } from '@angular/core';
import { product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_Services/product.service';
import { Comment } from '../_model/comment.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ImageProcesService } from '../image-proces.service';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  userRating: number = 0;
  selectedProductIndex = 0;
  averageRate: number = 0;
  amount: number = 0;
  show: boolean = false;
  selectedSize: string = "";
  cartproducts:any[]=[];
  role: string="";

  product:product = {
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountprice:0,
    productActualprice:0,
    productImages:[],
    productSizes:[],
    productCategory:{productCategoryId: 0, categoryName: '', sizeType: false},
    productGroups:[],
    productCategoryId:0,

  }


  commentText = "";
    comments: Comment[]=[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private ImageProcess: ImageProcesService,
    public userService:UserService,

  ) { }




  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: any) => {
      this.role = user.role;
      console.log(this.role)
    });

    this.product = this.activatedRoute.snapshot.data['product'];
    this.showComments();
    this.averageRating();
    this.getUserRating();

  }
  isUserRole(): boolean {
    return this.role === 'User';
  }
  public showComments() {
  this.productService.getCommentsForProduct(this.product.productId)
    .pipe(
       map((comments: any[]) => comments.map(comment => {
        comment.user = this.ImageProcess.createUserImage(comment.user);
        return comment;
      }))
    )
    .subscribe({
      next: (resp: Comment[]) => {
        console.log(resp);
        this.comments = resp;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
}






  saveComment() {
    console.log(this.product.productId)
    this.productService.saveComment(this.product.productId, this.commentText).subscribe({
      next: (response) => {
        console.log(response);
        this.commentText = "";
        this.showComments();
      },
      error: (error) => {
        console.log("Save comment failed");
      }
    });
  }



  changeIndex(index:number) {
    this.selectedProductIndex = index;
  }

  buyProduct(productId:number) {
     this.router.navigate(['/buyProduct', {
      single: true, productId: productId
    }]);
  }

  rateProduct() {
    this.productService.rateProduct(this.product.productId, this.userRating).subscribe({
      next: (response) => {
        console.log('Saved rating:', response);
      },
      error: (error) => {
        console.log("Rating submission failed");
      }
    });
  }

  averageRating(){

    this.productService.getProductAverageRating(this.product.productId).subscribe(averageRating => {
      console.log('Average rating:', averageRating);
      this.averageRate = parseFloat(averageRating.toFixed(1));
    });

  }

  getUserRating() {
    this.productService.getUserRatingForProduct(this.product.productId).subscribe(userRating => {
      console.log('User rating:', userRating);
      this.userRating = userRating;
    });
  }

  decreaseAmount() {
    if (this.amount > 1) {
        this.amount--;
    }
}

increaseAmount() {
    this.amount++;
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
      console.error('Error: product or selected size is null');
    }
  }
}

