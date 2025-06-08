import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';
import { PostlistService } from '../../../core/services/posts/postlist.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor],
})
export class PostDetailsComponent implements OnInit {
  postId: number | null = null;
  post: Post | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private postlistService: PostlistService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.postlistService.getPostById(this.postId).subscribe({
        next: (data) => {
          this.loading = false;
          this.post = data;
          console.log('Fetched Post:', this.post);
        },
        error: (err) => {
          this.loading = false;
          console.error('Error fetching post:', err);
        },
      });
    }
  }
}
