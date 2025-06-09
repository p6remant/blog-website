import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { CommentsResponse } from '../../../models/comments.modal';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private authService: AuthService) {}

  // add a comment to a post
  addComment(
    postId: number,
    userId: number,
    commentText: string
  ): Observable<any> {
    const payload = {
      postId,
      userId,
      body: commentText,
    };
    return this.authService.post<any>('/comments/add', payload);
  }

  getCommentsByPostId(postId: number): Observable<CommentsResponse> {
    return this.authService.get<CommentsResponse>(`/comments/post/${postId}`);
  }
}
