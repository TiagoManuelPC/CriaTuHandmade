import { Component, HostListener } from '@angular/core';

@Component({
	selector: 'app-home-component',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	standalone: false
})
export class HomeComponent {

	isMobile = window.innerWidth <= 1080;
	imageMaxWidth = '260px';

	constructor() {
		this.onResize()
	}

	wallImages: string[] = [
		'assets/images/xmax1.jpeg',
		'assets/images/xmax (2).jpeg',
		'assets/images/xmax (3).jpeg',
		'assets/images/xmax (4).jpeg',
		'assets/images/xmax (5).jpeg',
		'assets/images/xmax (6).jpeg',
		'assets/images/xmax (7).jpeg',
		'assets/images/xmax (8).jpeg',
		'assets/images/xmax (9).jpeg',
		'assets/images/xmax (10).jpeg',
		'assets/images/xmax (11).jpeg',
	];

	@HostListener('window:resize', ['$event'])
  	onResize() {
    	this.isMobile = window.innerWidth <= 1080;
		this.isMobile ? this.addMovileView() : this.addDesktopView();
  	}

	addMovileView() {
		this.imageMaxWidth = '180px';
	}

	addDesktopView() {
		this.imageMaxWidth = '260px';
	}
}
