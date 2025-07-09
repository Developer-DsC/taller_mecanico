// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getTokenCookie();
    const expectedRoles: string[] = route.data['roles'];

    if (!token) {
      this.router.navigate(['/register']); // O '/login' si tienes esa ruta
      return false;
    }

    const userRole = this.authService.getUserRole();

    if (expectedRoles && !expectedRoles.includes(userRole)) {
      this.router.navigate(['/']); // O una página "No autorizado"
      return false;
    }

    return true;
  }
}
