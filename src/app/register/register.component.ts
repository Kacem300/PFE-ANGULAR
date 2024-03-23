import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  @ViewChild('verifyPassword') verifyPassword!: ElementRef;
/*   @ViewChild('emailErrorMsg', { static: false }) emailErrorMsg!: ElementRef;
 */@ViewChild('passwordErrorMsg', { static: false }) passwordErrorMsg!: ElementRef;
@ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;

  constructor(private userService:UserService,private router:Router){}
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called'); // Check if ngAfterViewInit is being called

    if (this.password && this.password.nativeElement) {
      this.password.nativeElement.addEventListener("blur", () => { console.log(' password changed'); this.validatePassword()});
    }
    if (this.verifyPassword && this.verifyPassword.nativeElement) {
      this.verifyPassword.nativeElement.addEventListener("blur", () => { console.log('Verify password changed'); this.validatePassword()});
    }
   /*  if (this.email && this.email.nativeElement) {
      this.email.nativeElement.addEventListener("change", () => {console.log("email changed");this.validateEmail()});
    } */
  }


  displayErrorMsg(type: string, msg: string) {
    console.log(`Displaying error message: ${msg}`); // Check if an error message is being displayed
/*
     if(type == "email") {
      this.emailErrorMsg.nativeElement.style.display = "block";
      this.emailErrorMsg.nativeElement.innerHTML = msg;
      this.submitBtn.nativeElement.disabled = true;
    }
    else {
      this.passwordErrorMsg.nativeElement.style.display = "block";
      this.passwordErrorMsg.nativeElement.innerHTML = msg;
      this.submitBtn.nativeElement.disabled = true;
    } */

    this.passwordErrorMsg.nativeElement.style.display = "block";
    this.passwordErrorMsg.nativeElement.innerHTML = msg;
    this.submitBtn.nativeElement.disabled = true;

  }

  hideErrorMsg(type: string) {
  /*   if(type == "email") {
      this.emailErrorMsg.nativeElement.style.display = "none";
      this.emailErrorMsg.nativeElement.innerHTML = "";
      if(this.passwordErrorMsg.nativeElement.innerHTML == "")
        this.submitBtn.nativeElement.disabled = false;
    }
    else {
      this.passwordErrorMsg.nativeElement.style.display = "none";
      this.passwordErrorMsg.nativeElement.innerHTML = "";
      if(this.emailErrorMsg.nativeElement.innerHTML == "")
        this.submitBtn.nativeElement.disabled = false;
    } */
    this.passwordErrorMsg.nativeElement.style.display = "none";
      this.passwordErrorMsg.nativeElement.innerHTML = "";

        this.submitBtn.nativeElement.disabled = false;
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

 /*  validateEmail() {
    if(this.email.nativeElement.value.match(/^[^@]+@[^@]+\.[^@]+$/))
      this.hideErrorMsg("email")
    else
      this.displayErrorMsg("email", "Invalid email")
  }  */

  register(registrationForm:NgForm){
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
  }


  login(){
    this.router.navigate(['/login']);
  }
}
