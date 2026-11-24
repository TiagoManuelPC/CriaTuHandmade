import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from './blog.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-blog-component',
	templateUrl: './blog.component.html',
	styleUrl: './blog.component.scss',
	standalone: false
})
export class BlogComponent implements OnInit {
	blogPosts: BlogPost[] = [];

	newPost: Pick<BlogPost, 'title' | 'content'> = { title: '', content: '' };
	isModalOpen: boolean = false;
	saveError = '';

	constructor(private blogService: BlogService, private spinner: NgxSpinnerService, public auth: AuthService) {
	}

	ngOnInit(): void {
		this.spinner.show();
		this.blogService.getPosts().subscribe(
			(response: BlogPost[]) => {
				this.blogPosts = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
				this.spinner.hide();
			},
			(error) => {
				console.error('Error fetching data:', error);
				this.spinner.hide();
			}
		);
	}

	excerpt(content: string, length: number = 200): string {
		if (content.length <= length) {
			return content;
		}
		return content.slice(0, length).trimEnd() + '…';
	}

	// The button only shows to someone signed in (at /admin), and the database
	// itself refuses a write from anyone who is not an admin.
	addPost(post: Pick<BlogPost, 'title' | 'content'>): void {
		this.blogService.createPost(post).subscribe(
			(response) => {
				this.blogPosts.unshift(response);
				this.isModalOpen = false;
				this.newPost = { title: '', content: '' };
			},
			(error) => {
				console.error('Error creating post:', error);
				this.saveError = 'That did not save. Are you signed in as an admin?';
			});
	}

	onSubmit(): void {
		this.saveError = '';
		this.addPost(this.newPost);
	}

	openModal(): void {
		this.isModalOpen = true;
	}

	closeModal(): void {
		this.isModalOpen = false;
	}
}
