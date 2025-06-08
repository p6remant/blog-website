import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post, PostsResponse } from '../../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostlistService {
  constructor(private authService: AuthService) {}

  // get all posts
  // Returns an Observable of PostsResponse
  getPosts(): Observable<PostsResponse> {
    return this.authService.get<PostsResponse>('/posts');
  }

  // get posts by userId
  getPostById(id: number): Observable<Post> {
    return this.authService.get<Post>(`/posts/${id}`);
  }
}
