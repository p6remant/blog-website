import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  // Generic GET method, only pass endpoint path
  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, { headers: this.headers });
  }

  // Generic POST method, only pass endpoint path and payload
  post<T>(endpoint: string, payload: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post<T>(url, payload, { headers: this.headers });
  }

  //generic patch method
  patch<T>(endpoint: string, payload: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.patch<T>(url, payload, { headers: this.headers });
  }

  // generic delete method
  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url, { headers: this.headers });
  }

  // Method to refresh the access token using the refresh token
  refreshToken(): Observable<any> {
    const url = `${this.baseUrl}/auth/refresh`;
    const payload = {
      refreshToken: sessionStorage.getItem('refreshToken'),
    };

    return this.http.post(url, payload, {
      headers: this.headers,
    });
  }
}
