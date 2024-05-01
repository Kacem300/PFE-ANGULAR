import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../_model/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

isEditable:Boolean=false;
  constructor(private UserService:UserService,private sanitizer:DomSanitizer){}

  CurrentUser:User={
  Role:[],
  userFirstName:"",
  userLastname:"",
  userName:"",
  userPassword:"",
  /* userImage:{ file: new File([''], ''), url: '' } */
  userImage:[],
  }
  ngOnInit(): void {
    this.getCurrentUser();}

  public getCurrentUser(){
    this.UserService.getCurrentUser().subscribe({
      next: (resp: any) => {
        this.CurrentUser = resp;
        console.log(this.CurrentUser);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  prepareFormData(user: User): FormData {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    for (let i = 0; i < user.userImage.length; i++) {
      formData.append('imageFile', user.userImage[i].file, user.userImage[i].file.name);
    }
    return formData;
  }

  public SelectFile(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        }
        this.CurrentUser.userImage.push(fileHandle);
      }
    }
  }



  public updateUser() {
    if (this.isEditable) {
      const userData = this.prepareFormData(this.CurrentUser);
      this.UserService.updateCurrentUser(userData).subscribe({
        next: (resp: any) => {
          this.CurrentUser = resp;
          console.log('User updated successfully');
          this.isEditable = false; // Turn off edit mode after successful update

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
  }


  public toggleEdit() {
    this.isEditable = !this.isEditable;
  }
  public CancelToggleEdit() {
    this.isEditable = !this.isEditable;
  }



}
