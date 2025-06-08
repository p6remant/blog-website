import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoginService } from '../services/login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private loginService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.loginService.getAccessToken();
    let clonedReq = req;

    if (accessToken) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.includes('/auth/refresh')) {
          return this.handle401Error(req, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.loginService.refreshAccessToken().pipe(
        switchMap((tokenResponse) => {
          this.isRefreshing = false;
          const newToken = tokenResponse.token;
          this.loginService.setAccessToken(newToken);
          this.refreshTokenSubject.next(newToken);

          return next.handle(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            })
          );
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.loginService.clearSession();
          // Redirect to login
          window.location.href = '/login';
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        )
      );
    }
  }
}
