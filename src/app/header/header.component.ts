import { Component } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userauthservice:UserAuthService,private router:Router,public UserService:UserService){}

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

}
