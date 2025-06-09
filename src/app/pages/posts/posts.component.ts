import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostlistService } from '../../core/services/posts/postlist.service';
import { AuthService } from '../../core/services/auth.service';
import { LoginService } from '../../core/services/login/login.service';
import { CommentsService } from '../../core/services/comments/comments.service';
import { BlogComment } from '../../models/comments.modal';

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
  selectedCommentPostId: number | null = null;
  commentsForms: { [postId: number]: FormControl } = {};
  comments: { [postId: number]: BlogComment[] } = {};
  showComments: { [postId: number]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postlistService: PostlistService,
    private authService: AuthService,
    private loginService: LoginService,
    private commentsService: CommentsService
  ) {}

  ngOnInit() {
    this.userId = this.loginService.getUserId();
    this.initForm();
    this.fetchPosts();
  }

  // Initialize the post form with validation
  initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      body: ['', Validators.required],
    });
  }

  // Initialize comment form control for a post
  initCommentForm(postId: number) {
    if (!this.commentsForms[postId]) {
      this.commentsForms[postId] = new FormControl('');
    }
    return this.commentsForms[postId];
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

  // event listener for clicks outside the comment box
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const commentBox = document.querySelector('.comment-box');
    if (
      this.selectedCommentPostId &&
      commentBox &&
      !commentBox.contains(target)
    ) {
      this.selectedCommentPostId = null;
    }
  }

  // Method to fetch comments for a post
  fetchComments(postId: number): void {
    this.commentsService.getCommentsByPostId(postId).subscribe({
      next: (res) => {
        this.comments[postId] = res.comments;
      },
      error: (error) => {
        console.error('Error fetching comments:', error);
      },
    });
  }

  toggleComments(postId: number): void {
    if (this.selectedCommentPostId === postId) {
      this.selectedCommentPostId = null; // Close current
    } else {
      this.selectedCommentPostId = postId; // Open new
      if (!this.comments[postId]) {
        this.fetchComments(postId); // Fetch only if not loaded
      }
    }
  }

  // add comment on Add button click or Enter key press
  submitComment(postId: number) {
    console.log('clickeddddd');
    const commentControl = this.initCommentForm(postId);
    console.log('commentControl:', commentControl);
    console.log('userId:', this.userId);
    if (!commentControl.valid || !this.userId) return;
    console.log('clickeddddd1111');

    const commentText = commentControl.value.trim();
    if (!commentText) return;

    this.commentsService
      .addComment(postId, Number(this.userId), commentText)
      .subscribe({
        next: (res) => {
          console.log('Comment added:', res);
          alert('Comment added successfully!');
          commentControl.reset();
          // Optionally: reload comments or show confirmation
        },
        error: (err) => {
          console.error('Failed to add comment:', err);
        },
      });
  }
}
