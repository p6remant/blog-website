import { Injectable } from '@angular/core';
import {
  LoginPayloadTypes,
  LoginResponseTypes,
} from '../../../models/auth.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AuthService) {}

  login(payload: LoginPayloadTypes): Observable<LoginResponseTypes> {
    return this.authService.post<LoginResponseTypes>('/auth/login', payload);
  }

  refreshAccessToken(): Observable<any> {
    return this.authService.refreshToken();
  }

  // Individual setter methods
  setAccessToken(token: string): void {
    sessionStorage.setItem('accessToken', token);
  }

  setRefreshToken(token: string): void {
    sessionStorage.setItem('refreshToken', token);
  }

  setUsername(username: string): void {
    sessionStorage.setItem('username', username);
  }

  setUserId(userId: string): void {
    sessionStorage.setItem('userId', userId);
  }

  // Getter methods
  getAccessToken(): string | null {
    return sessionStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('refreshToken');
  }

  getUsername(): string | null {
    return sessionStorage.getItem('username');
  }

  getUserId(): string | null {
    const userId = sessionStorage.getItem('userId');
    return userId;
  }

  // Clear session storage
  clearSession(): void {
    sessionStorage.clear();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
