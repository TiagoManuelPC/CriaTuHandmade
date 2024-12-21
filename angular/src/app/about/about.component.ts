import { Component, HostListener, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
	selector: 'app-about-component',
	templateUrl: './about.component.html',
	styleUrl: './about.component.scss',
	standalone: false
})
export class AboutComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}
}
