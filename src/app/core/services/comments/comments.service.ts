import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private authService: AuthService) {}

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
}
