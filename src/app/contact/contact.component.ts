import { Component } from '@angular/core';
import { ContactForm } from '../_model/ContactForm.model';
import { UserService } from '../_Services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: ContactForm = { id: 0, name: '', email: '', message: '' }; // Initialize an empty form object
  constructor(private userService: UserService) { }

  onSubmit(contactForm:NgForm) {
    const contactFormData = this.prepareFromData(this.contact)
    console.log(contactFormData)
    this.userService.submitForm(contactFormData)
      .subscribe({
        next: (response: ContactForm) => {
          console.log("Form submitted successfully!", response);
          contactForm.reset()
        },
        error: (error: HttpErrorResponse) => {
          console.error("Error submitting form:", error);
          // Handle errors (e.g., show an error message)
        }
      });
  }

  prepareFromData(contact: ContactForm): FormData {
    const formData = new FormData();
    formData.append(
      'ContactForm',
      new Blob([JSON.stringify(contact)], { type: 'application/json' })
    );
    return formData;
}
}

