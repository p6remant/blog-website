import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { PostlistService } from '../../../core/services/posts/postlist.service';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class PostEditComponent implements OnInit {
  postForm!: FormGroup;
  submitting = false;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostlistService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Get the post ID from the route parameters
    this.postId = Number(this.route.snapshot.paramMap.get('id'));

    //get title and body from query params
    this.route.queryParamMap.subscribe((params) => {
      const title = params.get('title');
      const body = params.get('body');

      if (title && body) {
        this.postForm.patchValue({ title, body });
      }
    });
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      body: ['', Validators.required],
    });
  }

  // Method to handle form submission for creating a new post
  updatePost() {
    if (this.postForm.invalid || this.postId === null) return;

    const updatedData = this.postForm.value;

    this.submitting = true;

    this.postService.updatePost(this.postId, updatedData).subscribe({
      next: (response) => {
        this.submitting = false;
        console.log('Post updated successfully:', response);
        // alert('Post updated successfully!');
        // console.log('Updated Post:', response);
        this.toast.success('Post updated successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        //  console.error('Update failed:', err);
        this.submitting = false;
        this.toast.error(
          err.error.message || 'Failed to update post. Please try again later.'
        );
      },
    });
  }
}
