import { Component, Inject } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrl: './image-dialog.component.css'
})
export class ImageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
ngOnInit():void{
this.getImage();
}
  getImage(){
    console.log(this.data);
  }

}