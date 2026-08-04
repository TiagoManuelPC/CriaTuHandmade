import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'cria-tu-theme';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	private current: Theme;

	constructor() {
		const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
		this.current = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		this.apply();
	}

	get theme(): Theme {
		return this.current;
	}

	toggle(): void {
		this.set(this.current === 'dark' ? 'light' : 'dark');
	}

	set(theme: Theme): void {
		this.current = theme;
		localStorage.setItem(STORAGE_KEY, theme);
		this.apply();
	}

	private apply(): void {
		document.documentElement.setAttribute('data-theme', this.current);
	}
}
