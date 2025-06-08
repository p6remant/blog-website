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
    return this.authService.get<PostsResponse>('/posts/?limit=0');
  }

  // get posts by userId
  getPostById(id: number): Observable<Post> {
    return this.authService.get<Post>(`/posts/${id}`);
  }

  // update a post
  updatePost(id: number, payload: Partial<Post>): Observable<Post> {
    return this.authService.patch<Post>(`/posts/${id}`, payload);
  }

  //delete a post
  deletePost(id: number): Observable<Post> {
    return this.authService.delete<Post>(`/posts/${id}`);
  }
}
