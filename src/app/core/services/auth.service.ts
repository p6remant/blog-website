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
  patch<T>(endpoint: string, payload: any): Observable<T> {
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.patch<T>(url, payload, { headers: this.headers });
  }
}
