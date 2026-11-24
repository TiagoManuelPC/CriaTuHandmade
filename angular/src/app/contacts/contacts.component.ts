import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  standalone: false,

  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contactEmail = 'cria.tu@outlook.com';
  state: 'idle' | 'sending' | 'sent' | 'fallback' = 'idle';

  constructor(private http: HttpClient) {}

  // The message goes to the `contact` function, which emails it. If that function
  // is not set up (no email key in its environment) or fails, the old behaviour
  // takes over: the message opens in the visitor's own mail app, ready to send.
  onSubmit(form: any) {
    if (!form.valid || this.state === 'sending') {
      return;
    }

    const { name, email, message, website } = form.value;
    this.state = 'sending';
    this.http.post('/.netlify/functions/contact', { name, email, message, website }).subscribe({
      next: () => {
        this.state = 'sent';
        form.resetForm();
      },
      error: () => {
        this.state = 'fallback';
        const subject = encodeURIComponent(`Message from ${name} via the website`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:${this.contactEmail}?subject=${subject}&body=${body}`;
      }
    });
  }
}
