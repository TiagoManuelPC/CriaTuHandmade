import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
      // Add your form submission logic here
    }
  }

}
