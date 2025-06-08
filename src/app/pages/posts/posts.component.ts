import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostlistService } from '../../core/services/posts/postlist.service';
import { AuthService } from '../../core/services/auth.service';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  standalone: false,
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  postsLength = 0;
  postForm!: FormGroup;
  submitting = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postlistService: PostlistService,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userId = this.loginService.getUserId();
    this.initForm();
    this.fetchPosts();
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      body: ['', Validators.required],
    });
  }

  // Method to fetch posts from the service
  fetchPosts() {
    this.loading = true;
    this.postlistService.getPosts().subscribe({
      next: (res) => {
        this.loading = false;
        this.posts = res.posts;
        this.postsLength = res.posts.length;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error listing posts:', error);
      },
    });
  }

  // Method to handle form submission for creating a new post
  createPost() {
    if (this.postForm.invalid || !this.userId) return;

    this.submitting = true;
    const payload = {
      ...this.postForm.value,
      userId: Number(this.userId),
    };

    console.log('Payload:', payload); // Log the payload
    this.authService.post<any>('/posts/add', payload).subscribe({
      next: (res) => {
        this.submitting = false;
        // console.log('Post created successfully:', res);
        this.postForm.reset();
        this.posts.push(res); // Add the new post to the list
        // this.fetchPosts(); // reload posts
      },
      error: (err) => {
        this.submitting = false;
        console.error('Post creation failed:', err);
      },
    });
  }

  // Method to navigate to post details
  goToDetails(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  // Method to edit a post
  editPost(postId: number) {
    console.log('Editing post with ID:', postId);
    const post = this.posts.find((p) => p.id === postId);
    console.log('Found post:', post);
    if (post) {
      this.router.navigate(['/posts', postId, 'edit'], {
        queryParams: { title: post.title, body: post.body },
      });
    }
  }

  // Method to delete a post
  deletePost(postId: number) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    this.postlistService.deletePost(postId).subscribe({
      next: (res) => {
        console.log('Post deleted successfully:', res);
        alert('Post deleted:');
        // Remove the deleted post from the list
        // this.posts = this.posts.filter((post) => post.id !== postId);
        // this.postsLength = this.posts.length;
      },
      error: (err) => {
        console.error('Delete failed:', err);
      },
    });
  }
}
