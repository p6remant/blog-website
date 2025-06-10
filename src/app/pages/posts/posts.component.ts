import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
import { WebSocketService } from '../../core/services/web-socket/web-socket.service';
import { NotificationService } from '../../core/services/notification/notification.service';
import { ToastService } from '../../core/services/toast/toast.service';

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
  messages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postlistService: PostlistService,
    private authService: AuthService,
    private loginService: LoginService,
    private commentsService: CommentsService,
    private wsService: WebSocketService,
    private notificationService: NotificationService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.wsService.connect('wss://ws.ifelse.io');

    this.wsService.getMessages().subscribe((message) => {
      if (!message.includes('Request served by')) {
        //console.log('Received from WS:', message);
        this.messages = [...this.messages, message];
        this.notificationService.updateMessages(this.messages);
        // alert(message);
        this.toast.success('New comment added!');
        //console.log(this.messages);
      }
    });
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

  initCommentForm(postId: number): FormControl {
    if (!this.commentsForms[postId]) {
      this.commentsForms[postId] = new FormControl('', Validators.required);
    }
    return this.commentsForms[postId];
  }

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

  createPost() {
    if (this.postForm.invalid || !this.userId) return;

    this.submitting = true;
    const payload = {
      ...this.postForm.value,
      userId: Number(this.userId),
    };

    this.authService.post<any>('/posts/add', payload).subscribe({
      next: (res) => {
        this.submitting = false;
        this.postForm.reset();
        console.log('Post created successfully:', res);
        this.toast.success('Post created successfully');
      },
      error: (err) => {
        this.submitting = false;
        console.error('Post creation failed:', err);
        this.toast.error(err.error.message || 'Failed to create post');
      },
    });
  }

  goToDetails(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  editPost(postId: number) {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      this.router.navigate(['/posts', postId, 'edit'], {
        queryParams: { title: post.title, body: post.body },
      });
    }
  }

  deletePost(postId: number) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    this.postlistService.deletePost(postId).subscribe({
      next: (res) => {
        this.posts = this.posts.filter((post) => post.id !== postId);
        this.postsLength = this.posts.length;
        this.toast.success('Post deleted successfully');
        // alert('Post deleted');
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.toast.error(err.error.message || 'Failed to delete post');
      },
    });
  }

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

  fetchComments(postId: number): void {
    this.loading = true;
    this.commentsService.getCommentsByPostId(postId).subscribe({
      next: (res) => {
        this.loading = false;
        this.comments[postId] = res.comments;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching comments:', error);
      },
    });
  }

  toggleComments(postId: number): void {
    if (this.selectedCommentPostId === postId) {
      this.selectedCommentPostId = null;
    } else {
      this.selectedCommentPostId = postId;
      if (!this.comments[postId]) {
        this.fetchComments(postId);
      }
    }
  }

  submitComment(postId: number) {
    const commentControl = this.initCommentForm(postId);
    if (!commentControl.valid || !this.userId) return;

    const commentText = commentControl.value.trim();
    if (!commentText) return;

    this.commentsService
      .addComment(postId, Number(this.userId), commentText)
      .subscribe({
        next: (res) => {
          this.wsService.sendMessage(commentText);
          commentControl.reset();
        },
        error: (err) => {
          this.toast.error(
            err.error.message ||
              'Failed to add comment. Please try again later.'
          );
        },
      });
  }
}
