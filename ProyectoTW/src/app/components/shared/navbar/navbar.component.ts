import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: boolean = false;
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Suscribirse al rol y actualizar
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      this.token = !!role; // Si hay rol, hay token
    });
  }

  tokenDelete() {
    this.authService.deleteTokenCookie(); // Elimina token + borra el rol
    this.router.navigate(['/']);
  }
}

