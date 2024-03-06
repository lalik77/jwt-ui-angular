import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
// Import user services
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

// Decorator to mark the class as Injectable and provide it at root level
@Injectable({
  providedIn: 'root',
})

// Class implementing CanActivate interface to create a Guard
export class AuthGuard implements CanActivate {
  // Constructor to inject necessary services
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  // Method to determine if the route can be activated
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if user is authenticated by verifying token existence
    if (this.userAuthService.getToken() !== null) {
      // Get roles required to access the route from route data
      const role = route.data['roles'] as Array<string>;

      if (role) {
        // Check if user's role matches the required roles for the route
        const isMatch = this.userService.roleMatch(role);

        if (isMatch) {
          return true; // Allow access if roles match
        } else {
          this.router.navigate(['/forbidden']); // Redirect to forbidden page if roles don't match
          return false;
        }
      }
    }
    // Redirect to login page if user is not authenticated or doesn't have required roles
    this.router.navigate(['/login']);
    return false;
  }
}
