import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../interfaces/blog-post';
import { isDevMode } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
	selector: 'app-blog-component',
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss',
	standalone: false
})

export class BlogComponent implements OnInit {
	blogPosts: BlogPost[] = [];

	newPost: BlogPost = {} as BlogPost;
	isLoading = true;
	isModalOpen: boolean = false;
	constructor(private apiService: ApiService, private spinner: NgxSpinnerService) {
		if (isDevMode()) {
			console.log('Running in development mode');
		} else {
			console.log('Running in production mode');
		}
	}

	ngOnInit(): void {
		this.spinner.show();
		this.apiService.getData('blog-posts').subscribe(
			(response: BlogPost[]) => {
				this.blogPosts = response.sort((a, b) => b.date - a.date);
			},
			(error) => {
				console.error('Error fetching data:', error);
			}
		);
		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		}, 500);
	}

	addPost(post: BlogPost): void {
		this.apiService.addData('blog-posts', post).subscribe((data) => {
			this.blogPosts.unshift(data);
			console.log('Item added:', data);

		});
	}

	onSubmit(): void {
		this.newPost.date = Date.now();
		this.addPost(this.newPost);

		// Reset the form
		this.newPost = {} as BlogPost;
	}

	openModal(): void {
		this.isModalOpen = true;
	  }
	
	  closeModal(): void {
		this.isModalOpen = false;
	  }
}
