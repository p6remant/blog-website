import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostlistService } from '../../core/services/posts/postlist.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  postsLength = 0;

  constructor(
    private router: Router,
    private postlistService: PostlistService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.postlistService.getPosts().subscribe({
      next: (res) => {
        this.loading = false;
        console.log('Posts list:', res);
        this.posts = res.posts;
        this.postsLength = res.posts.length;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error listing posts:', error);
      },
    });
  }

  goToDetails(postId: number) {
    this.router.navigate(['/posts', postId]);
  }
}
