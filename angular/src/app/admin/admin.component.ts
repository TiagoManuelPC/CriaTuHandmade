import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

// Not linked from the menu: the shop's owner signs in here to write blog posts.
@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
	standalone: false
})
export class AdminComponent {
	email = '';
	password = '';
	error = '';
	busy = false;

	constructor(public auth: AuthService) {}

	async signIn(): Promise<void> {
		this.busy = true;
		this.error = (await this.auth.signIn(this.email, this.password)) ?? '';
		this.busy = false;
		this.password = '';
	}
}
