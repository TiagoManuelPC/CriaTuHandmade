import { Injectable } from '@angular/core';
import { db } from './supabase';

// Who, if anyone, is signed in on this browser. Signing in is only for writing the blog.
@Injectable({ providedIn: 'root' })
export class AuthService {
	email: string | null = null;

	constructor() {
		db.auth.getSession().then(({ data }) => this.email = data.session?.user.email ?? null);
		db.auth.onAuthStateChange((_event, session) => this.email = session?.user.email ?? null);
	}

	get signedIn(): boolean {
		return this.email !== null;
	}

	async signIn(email: string, password: string): Promise<string | null> {
		const { error } = await db.auth.signInWithPassword({ email, password });
		return error ? error.message : null;
	}

	signOut(): Promise<unknown> {
		return db.auth.signOut();
	}
}
