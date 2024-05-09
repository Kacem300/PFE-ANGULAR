import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { ProductCategory } from '../_model/productCategory.model';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductGroups } from '../_model/ProductGroups.model';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {


  categories: ProductCategory[]=[];
  groups:ProductGroups[]=[];
  productCategory:ProductCategory ={
    productCategoryId:0,
    categoryName:"",
    sizeType:false
  }
  productGroup: ProductGroups = {
    productGroupsId: 0,
    productGroupsName: "",}


  constructor(
    private ProductService:ProductService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService
  ){}
  ngOnInit(): void {
   this.getCategories()
   this.getGroups()
  }

  getCategories() {
    this.ProductService.getCategories().subscribe({
      next: (categories: ProductCategory[]) => {
        this.categories = categories;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
  getGroups() {
    this.ProductService.getGroups().subscribe({
      next: (groups: ProductGroups[]) => {
        this.groups = groups;
        console.log(groups)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }
  addCategory(categoryForm: NgForm) {
    const formData = new FormData();
    formData.append('productCategoryId', this.productCategory.productCategoryId.toString());
    formData.append('categoryName', this.productCategory.categoryName);
    formData.append('sizeType', this.productCategory.sizeType.toString());

    this.ProductService.addCategory(formData).subscribe({
      next: (Response: ProductCategory) => {

        this.productCategory = {
          productCategoryId: 0,
          categoryName: "",
          sizeType: false
        };
        this.getCategories()
        this.getGroups()
      },
      error: (Error: HttpErrorResponse) => {
        console.log(Error);
      }
    });
  }

addGroup(groupForm: NgForm) {
    const formData = new FormData();
    formData.append('productGroupId', this.productGroup.productGroupsId.toString());
    formData.append('productGroupsName', this.productGroup.productGroupsName);


    this.ProductService.addGroup(formData).subscribe({
      next: (response: ProductGroups) => {
        console.log(response);

        this.productGroup = {
          productGroupsId: 0,
          productGroupsName: "",

        };
        this.getCategories()
        this.getGroups()
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  /* deleteCategory(productCategoryId: any) {
    console.log(productCategoryId)
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ProductService.deletepProductGroups(productCategoryId).subscribe({
          next: (response) => {
            this.messageService.add({severity:'success', summary:'Successful', detail:'Category Deleted', life: 3000});

            setTimeout(() => {
              this.getCategories();
            }, 2000);
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
  } */
  deleteCategory(productCategoryId: any) {
    console.log(productCategoryId);
    this.ProductService.deletepProductGroups(productCategoryId).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.getCategories();
        }, 2000);
        this.getCategories()
        this.getGroups()
      },
      error: (error: HttpErrorResponse) => {
        console.log("Delete Failed");
      }
    });
  }




}

