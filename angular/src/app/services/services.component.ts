import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-services-component',
	templateUrl: './services.component.html',
	styleUrl: './services.component.scss',
	standalone: false
})
export class ServicesComponent implements OnInit {

	serviceSections = [
		{
			title: 'General Services',
			description: 'Explore our general services that cater to a wide range of needs.',
			services: [
				{
					image: 'assets/service-images/hat.webp',
					title: 'Hat',
					description: 'Description for Hat'
				},
				{
					image: 'assets/service-images/mug.webp',
					title: 'Mug',
					description: 'Description for Mug'
				},
				{
					image: 'assets/service-images/plate.webp',
					title: 'Plate',
					description: 'Description for Plate'
				},

			]
		},
		{
			title: 'Cricut Services',
			description: 'Discover our specialized Cricut services for custom designs and creations.',
			services: [
				{
					image: 'assets/service-images/hat.webp',
					title: 'Hat',
					description: 'Description for Hat'
				},
				{
					image: 'assets/service-images/mug.webp',
					title: 'Mug',
					description: 'Description for Mug'
				},
				{
					image: 'assets/service-images/plate.webp',
					title: 'Plate',
					description: 'Description for Plate'
				},
				{
					image: 'assets/service-images/tshirt.jpeg',
					title: 'T-Shirt',
					description: 'Description for T-Shirt'
				}
			]
		},
		{
			title: 'Cricut Services',
			description: 'Discover our specialized Cricut services for custom designs and creations.',
			services: [
				{
					image: 'assets/service-images/hat.webp',
					title: 'Hat',
					description: 'Description for Hat'
				},
				{
					image: 'assets/service-images/mug.webp',
					title: 'Mug',
					description: 'Description for Mug'
				},
				{
					image: 'assets/service-images/plate.webp',
					title: 'Plate',
					description: 'Description for Plate'
				},
				{
					image: 'assets/service-images/tshirt.jpeg',
					title: 'T-Shirt',
					description: 'Description for T-Shirt'
				}
			]
		},
		{
			title: 'Cricut Services',
			description: 'Discover our specialized Cricut services for custom designs and creations.',
			services: [
				{
					image: 'assets/service-images/hat.webp',
					title: 'Hat',
					description: 'Description for Hat'
				},
				{
					image: 'assets/service-images/mug.webp',
					title: 'Mug',
					description: 'Description for Mug'
				},
				{
					image: 'assets/service-images/plate.webp',
					title: 'Plate',
					description: 'Description for Plate'
				},
				{
					image: 'assets/service-images/tshirt.jpeg',
					title: 'T-Shirt',
					description: 'Description for T-Shirt'
				}
			]
		}
	];
	constructor() {
	}

	ngOnInit(): void {
	}

	openService(service: any, section: any) {
		console.log(service, section);
	}
}
