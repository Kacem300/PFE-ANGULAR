import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  token: string ="";


  constructor(private route: ActivatedRoute, private userService: UserService,private router :Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.token = params['token'];
        if (this.token) {
            this.verifyEmail();
        } else {
            console.log('No token found');
        }
    });
}




verifyEmail() {
  // Call the confirmRegistration method with the token from the URL
  this.userService.confirmRegistration(this.token).subscribe({
      next: (response) => {
          console.log(response);
          // Set a delay of 5 seconds (5000 milliseconds) before navigating to the login page
          setTimeout(() => {
              this.router.navigate(['/login']);
          }, 5000);
      },
      error: (error) => {
          console.log(error);
          // Handle failed verification
      }
  });
}


}
