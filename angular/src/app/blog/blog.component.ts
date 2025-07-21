import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { BlogPost } from '../interfaces/blog-post';
import { isDevMode } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  // baseUrl = 'https://localhost:7174/'; // Serverless function URL
  baseUrl = 'https://criatuhandmade.onrender.com/'; // Serverless function URL

	constructor(private apiService: ApiService, private spinner: NgxSpinnerService, private http: HttpClient) {
		if (isDevMode()) {
			console.log('Running in development mode');
		} else {
			console.log('Running in production mode');
		}
	}

	ngOnInit(): void {
		this.spinner.show();
    // BlogPost/createPost
		this.getPosts().subscribe(
			(response: BlogPost[]) => {
				// this.blogPosts = response.sort((a, b) => b.createdAt - a.createdAt);
        this.blogPosts = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());},
			(error) => {
				console.error('Error fetching data:', error);
			}
		);
		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		}, 500);
	}

  createPost(post: BlogPost): Observable<any> {
    return this.http.post(`${this.baseUrl}BlogPost/createPost`, post);
  }

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.baseUrl}BlogPost/getBlogPosts`);
  }

	addPost(post: BlogPost): void {
		this.createPost(post).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        this.blogPosts.push(response);
        this.isModalOpen = false; // Close the modal after adding the post
      },
      (error) => {
        console.error('Error creating post:', error);
      });
	}

	onSubmit(): void {
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
