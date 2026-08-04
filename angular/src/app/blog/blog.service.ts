import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../interfaces/blog-post';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	private baseUrl = 'https://criatuhandmade.onrender.com/';

	constructor(private http: HttpClient) {}

	getPosts(): Observable<BlogPost[]> {
		return this.http.get<BlogPost[]>(`${this.baseUrl}BlogPost/getBlogPosts`);
	}

	// There's no per-id endpoint on the backend yet, so the single post is
	// found client-side from the full list.
	getPost(id: number): Observable<BlogPost | undefined> {
		return this.getPosts().pipe(
			map(posts => posts.find(post => post.id === id))
		);
	}

	createPost(post: BlogPost): Observable<BlogPost> {
		return this.http.post<BlogPost>(`${this.baseUrl}BlogPost/createPost`, post);
	}
}
