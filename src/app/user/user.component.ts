import { Component } from '@angular/core';
import { UserService } from '../_Services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  message: string ='';

  constructor(private userService:UserService){}

ngOnInit(): void{
  this.forUser();
}
forUser(){
  this.userService.forUser().subscribe({
next:(Response)=>{
  console.log(Response);
  this.message = Response
},
error:(error)=>{
  console.log(error);
}
  }

  )
}
}
