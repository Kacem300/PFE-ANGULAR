import { Component } from '@angular/core';
import { UserAuthService } from './_Services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public  authService: UserAuthService) {}

  title = 'pfekacemui';





  }

