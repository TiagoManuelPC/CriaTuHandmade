import { Component, HostListener, OnInit } from '@angular/core';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: false
})
export class AppComponent implements OnInit {
	isScrolled: boolean = false;
	isMenuOpen: boolean = false;

	constructor() {
	}

	@HostListener('window:scroll', [])
	onWindowScroll() {
		this.isScrolled = window.scrollY > 50;
	}

	ngOnInit(): void {
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	closeMenu() {
		if (this.isMenuOpen) {
			this.isMenuOpen = false;
		}
	}

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
}
