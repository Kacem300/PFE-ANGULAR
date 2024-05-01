import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './_Services/user-auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showNavbar: boolean=true;
  constructor(public  authService: UserAuthService,private router:Router) {}

  title = 'pfekacemui';

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !['/login', '/register'].includes(event.url);
      }
    });
  }



  }

