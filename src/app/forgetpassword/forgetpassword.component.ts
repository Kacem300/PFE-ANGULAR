import { Component } from '@angular/core';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';

  constructor(private userService: UserService) { }

  sendResetToken() {
    this.userService.forgotPassword(this.email).subscribe(response => {
      alert(response.message);
    }, error => {
      alert('Error sending reset token');
    });
  }
}
