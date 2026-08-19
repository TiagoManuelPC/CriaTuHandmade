import { Component, OnInit } from '@angular/core';

interface ServiceCategory {
	icon: string;
	title: string;
	description: string;
	etsySearch: string;
}

@Component({
	selector: 'app-services-component',
	templateUrl: './services.component.html',
	styleUrl: './services.component.scss',
	standalone: false
})
export class ServicesComponent implements OnInit {

	etsyShopUrl = 'https://www.etsy.com/uk/shop/CriaTuHandmade';

	// The only real product photography in the repo today — used to feature
	// the Christmas collection. Other categories don't have real photos yet,
	// so they're presented as icon cards instead of stock/placeholder images.
	christmasPhotos: string[] = [
		'assets/images/xmax (2).jpeg',
		'assets/images/xmax (5).jpeg',
		'assets/images/xmax (9).jpeg',
	];

	categories: ServiceCategory[] = [
		{
			icon: '🐣',
			title: 'Easter Ornaments',
			description: 'Felt Easter eggs in every colour, personalised with names or letters, plus bunny decorations for the Easter tree.',
			etsySearch: 'easter'
		},
		{
			icon: '🐝',
			title: 'Felt Animal Ornaments',
			description: 'Bees, ladybugs, and quirky seagulls — cute felt characters for year-round hanging.',
			etsySearch: 'bee'
		},
		{
			icon: '🎁',
			title: 'Personalised Gifts & Accessories',
			description: 'Friendship bracelets, name bookmarks, coasters, and badges — small handmade gifts with a personal touch.',
			etsySearch: 'personalised gift'
		},
		{
			icon: '🏡',
			title: 'Home Décor',
			description: 'Felt hanging decorations for the home, all year round.',
			etsySearch: 'home decor'
		},
		{
			icon: '💌',
			title: "Valentine's & Mother's Day",
			description: 'Embroidered hearts and "Mum" hangings — thoughtful handmade gifts for the people you love.',
			etsySearch: 'heart'
		}
	];

	constructor() {
	}

	ngOnInit(): void {
	}

	etsySearchUrl(query: string): string {
		return `${this.etsyShopUrl}?search_query=${encodeURIComponent(query)}`;
	}
}
