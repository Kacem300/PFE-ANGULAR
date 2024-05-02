import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../_Services/product.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.css'
})
export class ImageDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private productService:ProductService) {}
ngOnInit():void{
this.getImage();

}
  getImage(){
    console.log(this.data);
    console.log(this.data.sizes);
  }



}
