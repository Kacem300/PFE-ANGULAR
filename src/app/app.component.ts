import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './_Services/user-auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  selectedCategory: string | null = null;
  cartDetails:any []= [];


  showNavbar: boolean=true;
  constructor(public  authService: UserAuthService,private router:Router) {}

  title = 'pfekacemui';

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/register','/forgetpassword'].includes(event.url);
      }
    });
  }

  handleCategorySelection(categoryName: string) {
    console.log('Category selected in AppComponent:', categoryName);
    this.selectedCategory = categoryName;
  }


  }

