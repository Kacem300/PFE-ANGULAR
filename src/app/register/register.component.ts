import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_Services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'

})
export class RegisterComponent implements AfterViewInit {


  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('verifyPassword') verifyPassword!: ElementRef;
  @ViewChild('emailErrorMsg', { static: false }) emailErrorMsg!: ElementRef;
  @ViewChild('passwordErrorMsg', { static: false }) passwordErrorMsg!: ElementRef;
  @ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;
  @ViewChild('userName') userName!: ElementRef;
@ViewChild('userFirstName') userFirstName!: ElementRef;
@ViewChild('userLastName') userLastName!: ElementRef;


  constructor(private userService:UserService,private router:Router,private messageService:MessageService) {}

  ngAfterViewInit(): void {


    if (this.email && this.email.nativeElement) {
      this.email.nativeElement.addEventListener("blur", () => { console.log('Email changed'); this.validateEmail()});
    }
    if (this.password && this.password.nativeElement) {
      this.password.nativeElement.addEventListener("blur", () => { console.log(' password changed'); this.validatePassword()});
    }
    if (this.verifyPassword && this.verifyPassword.nativeElement) {
      this.verifyPassword.nativeElement.addEventListener("blur", () => { console.log('Verify password changed'); this.validatePassword()});
    }
  }
  displayErrorMsg(type: string, msg: string) {
    console.log(`Displaying error message: ${msg}`);

    if (type === "email") {
      this.emailErrorMsg.nativeElement.style.display = "block";
      this.emailErrorMsg.nativeElement.innerHTML = msg;
    } else if (type === "password") {
      this.passwordErrorMsg.nativeElement.style.display = "block";
      this.passwordErrorMsg.nativeElement.innerHTML = msg;
    }
    this.submitBtn.nativeElement.disabled = true;
  }

  hideErrorMsg(type: string) {
    if (type === "email") {
      this.emailErrorMsg.nativeElement.style.display = "none";
      this.emailErrorMsg.nativeElement.innerHTML = "";
      this.submitBtn.nativeElement.disabled = false;
    } else if (type === "password") {
      this.passwordErrorMsg.nativeElement.style.display = "none";
      this.passwordErrorMsg.nativeElement.innerHTML = "";
      this.submitBtn.nativeElement.disabled = false;
    }

  }

  validateEmail() {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.email.nativeElement.value)) {
      this.displayErrorMsg("email", "Invalid email format");

    } else {
      this.hideErrorMsg("email");
    }
  }

  validatePassword() {
    if(this.password.nativeElement.value.length == 0 && this.verifyPassword.nativeElement.value.length == 0)
      this.hideErrorMsg("password")
    else if(this.password.nativeElement.value !== this.verifyPassword.nativeElement.value)
      this.displayErrorMsg("password", "Passwords do not match")
    else {
      if(this.password.nativeElement.value.length >= 8)
        this.hideErrorMsg("password")
      else
        this.displayErrorMsg("password", "Password must be at least 8 characters long")
    }
  }

  register(registrationForm:NgForm){
    this.userService.registerNewUser(registrationForm.value).subscribe({
        next:(response:any)=>{
            console.log(response,"response from server");
            this.messageService.add({severity:'success', summary: 'Success', detail:'Email has been sent to: '+response.userEmail});
            this.submitBtn.nativeElement.disabled = true;
        },
        error:(error)=>{
            console.log(error);
        }
    });
    console.log('You have been registered');
    console.log(registrationForm.value);
}



  login(){
    this.router.navigate(['/login']);
  }



}

/*   register(registrationForm:NgForm){
    this.userService.registerNewUser(registrationForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigate(['/login']);
      },
      error:(error)=>{
        console.log(error);
      }
    });
    console.log('You have been registered');
    console.log(registrationForm.value);
  } */
