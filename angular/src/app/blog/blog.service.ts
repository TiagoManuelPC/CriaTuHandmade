import { Injectable, isDevMode } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { BlogPost } from '../interfaces/blog-post';
import { db } from '../supabase';

interface PostRow {
	id: string;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
}

// Sample posts for looking at the page before the real table exists: dev mode only, with ?demo in the address.
const DEMO: BlogPost[] = [
	{ id: 'demo-1', title: 'Christmas orders are open', content: 'The felt is cut, the ribbon is ready and the first puddings are already on the tree. Personalised ornaments take about a week to make, so order early if you want a name stitched on.\n\nThis is a sample post.', createdAt: '2026-11-10T10:00:00Z', updatedAt: '2026-11-10T10:00:00Z' },
	{ id: 'demo-2', title: 'How a felt ornament is made', content: 'Every piece starts as a paper pattern. Then come the felt, the blanket stitch round the edge, a little stuffing, and the embroidery last of all.\n\nThis is a sample post.', createdAt: '2026-10-22T10:00:00Z', updatedAt: '2026-10-22T10:00:00Z' },
	{ id: 'demo-3', title: 'See you at the Witney craft fair', content: 'We will have a table of Christmas decorations, bees, ladybirds and a few surprises. Come and say hello.\n\nThis is a sample post.', createdAt: '2026-10-05T10:00:00Z', updatedAt: '2026-10-05T10:00:00Z' },
];

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	private get demo(): boolean {
		return isDevMode() && new URLSearchParams(window.location.search).has('demo');
	}

	getPosts(): Observable<BlogPost[]> {
		if (this.demo) {
			return of(DEMO);
		}
		return from(db.from('posts').select('*').order('created_at', { ascending: false })).pipe(
			map(({ data, error }) => {
				if (error) { throw error; }
				return (data as PostRow[]).map(this.toBlogPost);
			})
		);
	}

	getPost(id: string): Observable<BlogPost | undefined> {
		if (this.demo || id.startsWith('demo-')) {
			return of(DEMO.find(post => post.id === id));
		}
		return from(db.from('posts').select('*').eq('id', id).maybeSingle()).pipe(
			map(({ data, error }) => {
				if (error) { throw error; }
				return data ? this.toBlogPost(data as PostRow) : undefined;
			})
		);
	}

	// Only works for a signed-in admin: the database refuses everyone else.
	createPost(post: Pick<BlogPost, 'title' | 'content'>): Observable<BlogPost> {
		return from(db.from('posts').insert({ title: post.title, content: post.content }).select().single()).pipe(
			map(({ data, error }) => {
				if (error) { throw error; }
				return this.toBlogPost(data as PostRow);
			})
		);
	}

	private toBlogPost = (row: PostRow): BlogPost => ({
		id: row.id,
		title: row.title,
		content: row.content,
		createdAt: row.created_at,
		updatedAt: row.updated_at
	});
}
