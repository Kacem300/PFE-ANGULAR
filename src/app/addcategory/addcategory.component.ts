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

  selected: boolean = false;
  showForm = false;
  showGroupForm = false;

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
   this.productCategory.selected = false;
   this.productGroup.selected = false;


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
        this.showGroupForm = false
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

    this.showForm = false
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


  deleteCategory(productCategoryId: any) {
    console.log(productCategoryId);
    this.ProductService.deletepProductCategory(productCategoryId).subscribe({
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
  deleteGroup(productGroupId: any) {
    console.log(productGroupId);
    this.ProductService.deleteProductGroups(productGroupId).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.getGroups();
        }, 2000);
        this.getCategories()
        this.getGroups()
      },
      error: (error: HttpErrorResponse) => {
        console.log("Delete Failed");
      }
    });
  }




  selectCategory(category: ProductCategory) {
    this.categories.forEach(category => category.selected = false); // deselect all categories
    category.selected = true; // select the clicked category
    this.productCategory = category; // populate the form with the selected category
    this.showForm = true; // show the form
  }
  updateCategory() {
    if (this.productCategory.productCategoryId && this.productCategory.categoryName) {
        this.ProductService.updateCategory(this.productCategory.productCategoryId, this.productCategory).subscribe({
            next: (updatedCategory: ProductCategory) => {
                console.log(updatedCategory);
                this.productCategory = {
                    productCategoryId: 0,
                    categoryName: "",
                    sizeType: false
                };
                this.getCategories();
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
            }
        });
    } else {
        console.log("Category ID or name is missing");
    }
}
  selectGroup(group: ProductGroups) {
    this.groups.forEach(group => group.selected = false); // deselect all groups
    group.selected = true; // select the clicked group
    this.productGroup = group; // populate the form with the selected group
    this.showGroupForm = true; // show the form
  }

  updateGroup() {
    if (this.productGroup.productGroupsId && this.productGroup.productGroupsName) {
        this.ProductService.updateGroup(this.productGroup.productGroupsId, this.productGroup).subscribe({
            next: (updatedGroup: ProductGroups) => {
                console.log(updatedGroup);
                this.productGroup = {
                    productGroupsId: 0,
                    productGroupsName: "",
                };
                this.getGroups();
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
            }
        });
    } else {
        console.log("Group ID or name is missing");
    }
}

}

