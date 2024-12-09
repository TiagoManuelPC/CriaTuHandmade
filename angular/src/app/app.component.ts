import { Component, HostListener, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: false
})
export class AppComponent implements OnInit {
	
	thumnailPosition: "top" | "left" | "right" | "bottom" = 'left';
	isMobile = window.innerWidth <= 768;
	width = 'w-50'

	constructor() { }

	images: GalleryItem[] = [
		new ImageItem({
			src: 'assets/images/xmax1.jpeg',
			thumb: 'assets/images/xmax1.jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (2).jpeg',
			thumb: 'assets/images/xmax (2).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (3).jpeg',
			thumb: 'assets/images/xmax (3).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (4).jpeg',
			thumb: 'assets/images/xmax (4).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (5).jpeg',
			thumb: 'assets/images/xmax (5).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (6).jpeg',
			thumb: 'assets/images/xmax (6).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (7).jpeg',
			thumb: 'assets/images/xmax (7).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (8).jpeg',
			thumb: 'assets/images/xmax (8).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (9).jpeg',
			thumb: 'assets/images/xmax (9).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (10).jpeg',
			thumb: 'assets/images/xmax (10).jpeg'
		}),
		new ImageItem({
			src: 'assets/images/xmax (11).jpeg',
			thumb: 'assets/images/xmax (11).jpeg'
		}),
	];

	ngOnInit(): void {
		if (this.isMobile) this.thumnailPosition = 'bottom';
	}

	@HostListener('window:resize', ['$event'])
  	onResize() {
		console.log(window.innerWidth);
    	this.isMobile = window.innerWidth <= 768;
		this.isMobile ? this.addMovileView() : this.addDesktopView();
  	}

	addMovileView() {
		this.width = 'w-75';
		this.thumnailPosition = 'bottom';
	}

	addDesktopView() {
		this.width = 'w-50';
		this.thumnailPosition = 'left';
	}
 
}
