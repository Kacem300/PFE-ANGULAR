import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { MenuItem } from 'primeng/api';
import { ProductCategory } from '../_model/productCategory.model';
import { ProductService } from '../_Services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductGroups } from '../_model/ProductGroups.model';
import { product } from '../_model/product.model';
import { CategoryServiceService } from '../_Services/category-service.service';
import { GroupServiceService } from '../_Services/group-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  categories: ProductCategory[]=[];
  groups:ProductGroups[]=[];


  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userauthservice:UserAuthService,private router:Router,public UserService:UserService,private productService:ProductService,private categoryService: CategoryServiceService,private groupService:GroupServiceService){}


  ngOnInit(): void {
    this.getCategories();
    this.getGroups();
  }

  public isloggedIn(){
    return this.userauthservice.isLoggedIn();
  }

  public islogout(){
    this.userauthservice.clear();
    this.router.navigate(['/']);
  }
  public isAdmin(){
    return this.userauthservice.isAdmin();

  }
  public isUser(){
    return this.userauthservice.isUser();
  }

  getCategories() {
    this.productService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
        console.log(this.categories)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  getGroups() {
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


  onCategorySelected(categoryName: string) {
    console.log('Category selected in HeaderComponent:', categoryName);
    this.categoryService.selectCategory(categoryName);
  }

  onGroupSelected(groupName: string) {
    console.log('Group selected in HeaderComponent:', groupName);
    this.groupService.selectGroups(groupName);
  }

}
