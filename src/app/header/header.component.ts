import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() cartLength: number = 0;

  categories: ProductCategory[]=[];
  groups:ProductGroups[]=[];
  hoveredGroup: string = '';


  @Output() categorySelected: EventEmitter<string> = new EventEmitter<string>();

@Output() groupSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private userauthservice:UserAuthService,
    private router:Router,
    public UserService:UserService,
    private productService:ProductService,
    private categoryService: CategoryServiceService,
    private groupService:GroupServiceService){}


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
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }



  onCategorySelected(categoryName: string) {
    console.log('Category selected in HeaderComponent:', categoryName);
    console.log(this.hoveredGroup + "hovered group")
    this.categoryService.selectCategory(categoryName, this.hoveredGroup);
  }

  ongroup(categoryName: string) {
    console.log('Category selected in HeaderComponent:', categoryName);
    this.categoryService.selectCategory("", this.hoveredGroup);
    console.log(this.hoveredGroup + "hovered group")

  }
  onCategorySelectedforgallery(categoryName: string) {
    console.log('Gallery selected in HeaderComponent:', "");
    console.log("" + "hovered group")
    this.categoryService.selectCategory('', '');
  }







  /*  onGroupSelected(groupName: string) {
    console.log('Group selected in HeaderComponent:', groupName);
    this.groupService.selectGroups(groupName);
  } */



  onGroupHover(groupName: string) {
    this.hoveredGroup = groupName;
  }

  onGroupLeave() {
    this.hoveredGroup = ''; // Clear the hovered group on mouse leave
  }
}
