import { Component, HostListener, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
	selector: 'app-home-component',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	standalone: false
})
export class HomeComponent implements OnInit {

	thumnailPosition: "top" | "left" | "right" | "bottom" = 'left';
	isMobile = window.innerWidth <= 1080;
	width = 'w-50'
	imageMaxWidth = '500px';

	constructor() {
		this.onResize()
	}

	images: GalleryItem[] = [
		new ImageItem({
			src: 'assets/images/xmax1.jpeg',
			thumb: 'assets/images/xmax1.jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (2).jpeg',
			thumb: 'assets/images/xmax (2).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (3).jpeg',
			thumb: 'assets/images/xmax (3).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (4).jpeg',
			thumb: 'assets/images/xmax (4).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (5).jpeg',
			thumb: 'assets/images/xmax (5).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (6).jpeg',
			thumb: 'assets/images/xmax (6).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (7).jpeg',
			thumb: 'assets/images/xmax (7).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (8).jpeg',
			thumb: 'assets/images/xmax (8).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (9).jpeg',
			thumb: 'assets/images/xmax (9).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (10).jpeg',
			thumb: 'assets/images/xmax (10).jpeg',
			alt: 'Image alt'
		}),
		new ImageItem({
			src: 'assets/images/xmax (11).jpeg',
			thumb: 'assets/images/xmax (11).jpeg',
			alt: 'Image alt'
		}),
	];

	ngOnInit(): void {
	}


	@HostListener('window:resize', ['$event'])
  	onResize() {
    	this.isMobile = window.innerWidth <= 1080;
		this.isMobile ? this.addMovileView() : this.addDesktopView();
  	}

	addMovileView() {
		this.width = 'w-75';
		this.thumnailPosition = 'bottom';
		this.imageMaxWidth = '300px';
	}

	addDesktopView() {
		this.width = 'w-50';
		this.thumnailPosition = 'left';
		this.imageMaxWidth = '500px';
	}
}
