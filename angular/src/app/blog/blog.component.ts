import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-blog-component',
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss',
	standalone: false
})
export class BlogComponent implements OnInit {
	blogPosts = [
		{
		  id: 1,
		  title: 'Blog Post Title 1',
		  date: 'January 1, 2023',
		  excerpt: 'This is a short excerpt of the blog post. It gives a brief overview of the content...'
		},
		{
		  id: 2,
		  title: 'Blog Post Title 2',
		  date: 'February 1, 2023',
		  excerpt: 'This is a short excerpt of the blog post. It gives a brief overview of the content...'
		},
		{
		  id: 3,
		  title: 'Blog Post Title 3',
		  date: 'March 1, 2023',
		  excerpt: 'This is a short excerpt of the blog post. It gives a brief overview of the content...'
		}
	  ];
	
	  categories = [
		{ id: 1, name: 'Category 1' },
		{ id: 2, name: 'Category 2' },
		{ id: 3, name: 'Category 3' }
	  ];
	
	  recentPosts = [
		{ id: 1, title: 'Recent Post 1' },
		{ id: 2, title: 'Recent Post 2' },
		{ id: 3, title: 'Recent Post 3' }
	  ];
	constructor() {
	}

	ngOnInit(): void {
	}
}
