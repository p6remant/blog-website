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

  // Clear session storage
  clearSession(): void {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('username');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
