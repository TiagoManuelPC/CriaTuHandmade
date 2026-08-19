import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { BlogPost } from '../interfaces/blog-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogService } from './blog.service';

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

	constructor(private blogService: BlogService, private spinner: NgxSpinnerService) {
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

	// Posting is only reachable while isDevMode() gates the button — there's
	// no auth system yet, so this stays dev-only until one exists (see
	// SITE_REDESIGN_PLAN.md). The backend function itself has no auth either,
	// this is a convenience gate, not a security boundary.
	addPost(post: Pick<BlogPost, 'title' | 'content'>): void {
		this.blogService.createPost(post).subscribe(
			(response) => {
				this.blogPosts.unshift(response);
				this.isModalOpen = false;
			},
			(error) => {
				console.error('Error creating post:', error);
			});
	}

	onSubmit(): void {
		this.addPost(this.newPost);
		this.newPost = { title: '', content: '' };
	}

	openModal(): void {
		this.isModalOpen = true;
	}

	closeModal(): void {
		this.isModalOpen = false;
	}

	isDevMode(): boolean {
		return isDevMode();
	}
}
