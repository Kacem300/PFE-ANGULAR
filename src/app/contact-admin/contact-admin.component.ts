import { Component } from '@angular/core';
import { ProductService } from '../_Services/product.service';
import { UserService } from '../_Services/user.service';
import { ContactForm } from '../_model/ContactForm.model';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrl: './contact-admin.component.css'
})
export class ContactAdminComponent {
Contact:ContactForm[]=[];
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getAllContactForms();
  }

  getAllContactForms(): void {
    this.userService.getAllContactForms().subscribe(
      data => {
        this.Contact = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }
    }
