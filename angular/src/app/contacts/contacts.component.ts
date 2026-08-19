import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  standalone: false,

  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contactEmail = 'cria.tu@outlook.com';

  // There's no backend to send this to, so instead of silently swallowing
  // the message (the old behaviour), open it as a pre-filled email — an
  // honest "it actually does something" without needing new infrastructure.
  onSubmit(form: any) {
    if (!form.valid) {
      return;
    }

    const { name, email, message } = form.value;
    const subject = encodeURIComponent(`Message from ${name} via the website`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${this.contactEmail}?subject=${subject}&body=${body}`;
  }
}
