import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.auth.isAuthenticated) {
      return false;
    }

    // Get roles array passed through router if exists
    const roles = route.data['roles'] as Array<string>;

    // If roles passed through router, authorize user
    if (roles) {
      if (this.auth.roleMatch(roles)) {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    return true;
  }
}
