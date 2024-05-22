import { Component, OnInit } from '@angular/core';
import { UserService } from '../_Services/user.service';
import { User } from '../_model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: User[]=[];
  searchKeyword: string = '';
  filterOptions: any[] = [
    {label: 'All', value: 'all'},
    {label: 'Verified', value: 'verified'},
    {label: 'Unverified', value: 'unverified'}
  ];
  selectedFilter: string = 'all';


  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers(this.selectedFilter);
  }

  getUsers(statusParameter: string) {
    this.userService.getAllUsers(this.searchKeyword,statusParameter).subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log(this.users);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



}




