import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: false
})
export class HomeComponent implements OnInit {

	isMobile = window.innerWidth <= 1080;
	imageMaxWidth = '260px';

	private apiUrl = 'https://criatuhandmade.onrender.com/WeatherForecast'; // your backend URL


	constructor(private http: HttpClient) {
		this.onResize();
		// attach a resize listener without using HostListener decorator
		window.addEventListener('resize', () => this.onResize());
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

	ngOnInit(): void {
		console.log(this.getProducts().subscribe((data) => {
			console.log(data);
		}));
	}

	getProducts() {
		return this.http.get(this.apiUrl);
	}


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
