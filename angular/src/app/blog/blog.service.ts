import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../interfaces/blog-post';

interface BlogPostDocument {
	_id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	// Generic Mongo-backed Netlify Function (angular/netlify/functions/database.js),
	// same one the rest of the app uses — collection name is the last URL segment.
	private baseUrl = '/.netlify/functions/database/blogposts';

	constructor(private http: HttpClient) { }

	getPosts(): Observable<BlogPost[]> {
		return this.http.get<BlogPostDocument[]>(this.baseUrl).pipe(
			map(docs => docs.map(this.toBlogPost))
		);
	}

	// There's no per-id endpoint on the backend, so the single post is found
	// client-side from the full list.
	getPost(id: string): Observable<BlogPost | undefined> {
		return this.getPosts().pipe(
			map(posts => posts.find(post => post.id === id))
		);
	}

	createPost(post: Pick<BlogPost, 'title' | 'content'>): Observable<BlogPost> {
		const now = new Date().toISOString();
		const payload = { title: post.title, content: post.content, createdAt: now, updatedAt: now };
		return this.http.post<BlogPostDocument>(this.baseUrl, payload).pipe(
			map(this.toBlogPost)
		);
	}

	private toBlogPost = (doc: BlogPostDocument): BlogPost => ({
		id: doc._id,
		title: doc.title,
		content: doc.content,
		createdAt: doc.createdAt,
		updatedAt: doc.updatedAt
	});
}
