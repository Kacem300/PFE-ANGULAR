import { Component } from '@angular/core';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  token: string = '';
  newPassword: string = '';
  tokenValid: boolean = false;

  constructor(private userService: UserService) { }

  verifyToken() {
    this.userService.verifyToken(this.token).subscribe(response => {
      this.tokenValid = response.isValid;
      if (this.tokenValid) {
        alert('Token verified. You can now reset your password.');
      } else {
        alert('Invalid or expired token.');
      }
    });
  }

  resetPassword() {
    this.userService.resetPassword(this.token, this.newPassword).subscribe(response => {
      alert(response.message);
    }, error => {
      alert('Error resetting password');
    });
  }
}
