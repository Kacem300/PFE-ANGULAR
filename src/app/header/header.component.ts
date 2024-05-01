import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_Services/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { MenuItem } from 'primeng/api'; // Import PrimeNG MenuItem

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] = []; // Define items array for PrimeNG Menubar

quantity: number = 3;
  constructor(private userauthservice:UserAuthService,private router:Router,public UserService:UserService){}

  cartDetails:any []= [1,2,3];
  ngOnInit(): void {
    if (!localStorage.getItem('chariot')) {

          localStorage.setItem('chariot', JSON.stringify(this.cartDetails));}
          else {
            this.cartDetails = JSON.parse(localStorage.getItem('chariot') || '[]');

          }
          console.log(this.cartDetails);
          this.updateQuantity();

          this.items = [
            {label: 'Gallery', icon: 'pi pi-fw pi-home', routerLink: '/'},
            {label: 'Add Product', icon: 'pi pi-fw pi-plus', routerLink: '/addNewProduct', visible: this.isAdmin()},
            {label: 'Products', icon: 'pi pi-fw pi-list', routerLink: '/productDetails', visible: this.isAdmin()},
            {label: 'Dashboard', icon: 'pi pi-fw pi-cog', routerLink: '/admin', visible: this.isAdmin()},
            {label: 'Dashboard', icon: 'pi pi-fw pi-user', routerLink: '/user', visible: this.isUser()},
            {label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', routerLink: '/cart', visible: this.isUser()},
            // Add more menu items here...
          ];

  }

  updateQuantity() {

    this.quantity= this.cartDetails.length
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

}
