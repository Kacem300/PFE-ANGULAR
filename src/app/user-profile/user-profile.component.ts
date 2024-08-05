import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../_model/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { ImageProcesService } from '../image-proces.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  confirmPassword:string="";
  passwordMismatch: boolean = false;
isEditable:Boolean=false;
  constructor(private UserService:UserService,private sanitizer:DomSanitizer,private ImageProcess: ImageProcesService){}
  userPassword2:string="";

  CurrentUser:User={
  /* Role:{rolename: '', roledescription: '',}, */
  Role:[],
  userFirstName:"",
  userLastname:"",
  userName:"",
  userPassword:"",
  userEmail:"",
  enabled:"",
  registrationDate: null,
  userImage: { file: new File([''], ''), url: '' }

  }
  ngOnInit(): void {

    this.getCurrentUser();}


    public getCurrentUser(){
      this.UserService.getCurrentUser().subscribe({
        next: (resp: any) => {
          this.CurrentUser = this.ImageProcess.createUserImage(resp);
          console.log(this.CurrentUser)
          if (this.CurrentUser.userImage === null) {
            // Set default image from assets
            this.CurrentUser.userImage = {  file: new File([''], ''),url: 'assets/default.png' };
        }

        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }


  prepareFormData(user: User): FormData {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    formData.append('imageFile', user.userImage.file, user.userImage.file.name);
    return formData;
  }

  public SelectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const fileHandle: FileHandle = {
          file: file,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        }
        this.CurrentUser.userImage = fileHandle;
    }
  }


  public updateUser() {
console.log(this.userPassword2);
console.log(this.confirmPassword);

    if (this.isEditable) {
      if (this.userPassword2 !== this.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

        this.passwordMismatch = false;
        if(this.userPassword2 !==""){
          this.ChangePassword();
        }



      const userData = this.prepareFormData(this.CurrentUser);
      this.UserService.updateCurrentUser(userData).subscribe({
        next: (resp: any) => {
          this.CurrentUser = resp;
          console.log('User updated successfully');
          this.isEditable = false;
          window.location.reload();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
    }
  }




  public toggleEdit() {
    this.isEditable = !this.isEditable;
    console.log(this.isEditable)
  }
  public CancelToggleEdit() {
    this.isEditable = !this.isEditable;
  }

  public ChangePassword(){
   this.CurrentUser.userPassword = this.userPassword2;
  }

/*   public ChangePassword2(){
    this.userPassword2 = this.CurrentUser.userPassword
   } */

}
