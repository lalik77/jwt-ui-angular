import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

// Import user services
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

// Decorator to mark the class as Injectable
@Injectable()

// Class implementing HttpInterceptor interface to intercept HTTP requests
export class AuthInterceptor implements HttpInterceptor {
  // Constructor to inject necessary services
  constructor(
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  // Method to intercept HTTP requests
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request doesn't require authentication
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone()); // Proceed with the request
    }

    // Get token from authentication service
    const token = this.userAuthService.getToken();

    // Add token to the request headers
    req = this.addToken(req, token);

    // Handle the request and response
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.status);
        if (err.status === 401) {
          // Redirect to login page if unauthorized
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          // Redirect to forbidden page if forbidden
          this.router.navigate(['/forbidden']);
        }
        return throwError('Something is wrong');
      })
    );
  }

  // Method to add authorization token to the request headers
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
