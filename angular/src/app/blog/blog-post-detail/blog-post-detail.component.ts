import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlogPost } from '../../interfaces/blog-post';
import { BlogService } from '../blog.service';

@Component({
	selector: 'app-blog-post-detail',
	templateUrl: './blog-post-detail.component.html',
	styleUrl: './blog-post-detail.component.scss',
	standalone: false
})
export class BlogPostDetailComponent implements OnInit {
	post: BlogPost | undefined;
	notFound = false;

	constructor(
		private route: ActivatedRoute,
		private blogService: BlogService,
		private spinner: NgxSpinnerService
	) {}

	ngOnInit(): void {
		const id = this.route.snapshot.paramMap.get('id') ?? '';
		this.spinner.show();
		this.blogService.getPost(id).subscribe(
			(post) => {
				this.post = post;
				this.notFound = !post;
				this.spinner.hide();
			},
			(error) => {
				console.error('Error fetching post:', error);
				this.notFound = true;
				this.spinner.hide();
			}
		);
	}
}
