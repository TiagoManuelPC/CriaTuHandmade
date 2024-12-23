import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../interfaces/blog-post';

@Component({
	selector: 'app-blog-component',
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss',
	standalone: false
})

export class BlogComponent implements OnInit {
	blogPosts: BlogPost[] = [];

	newPost: BlogPost = {
		title: '',
		post: '',
		date: Date.now(),
	  };
	constructor(private apiService: ApiService) {
	}

	ngOnInit(): void {
		console.log('Blog component initialized');
		this.apiService.getData('blog-posts').subscribe(
			(response) => {
			  this.blogPosts = response;
			},
			(error) => {
			  console.error('Error fetching data:', error);
			}
		  );
	}

	addPost(post: BlogPost): void {
		this.apiService.addData('blog-posts', post).subscribe((data) => {
		this.blogPosts.push(data);
		console.log('Item added:', data);
		});
	  }

	  onSubmit(): void {
		const newPost: BlogPost = {
		  title: this.newPost.title,
		  post: this.newPost.post,
		  date: Date.now(),
		};
	
		this.addPost(newPost);
	
		// Reset the form
		this.newPost = {
		  title: '',
		  post: '',
		  date: Date.now(),
		};
	}
}
