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
    private router: Router,
    private cdr: ChangeDetectorRef  // Inyecta ChangeDetectorRef
  ) {
    this.checkToken();
  }

  ngOnInit() {
    this.checkUserRole();
     this.userRole = this.authService.getUserRole();
  }

  // Función para verificar el estado del token
  checkToken() {
    if (this.authService.getTokenCookie()) {
      this.token = true;
    } else {
      this.token = false;
    }
  }

  // Función para obtener el rol del usuario
  checkUserRole() {
    this.checkToken();
  
    if (this.token) {
      this.userRole = this.authService.getUserRole();
      console.log('User role:', this.userRole); // 👀 Verifica si se obtiene correctamente
      this.cdr.detectChanges(); // 🔄 Asegura que la vista se actualice
    }
  }
  

  // Función para eliminar el token y redirigir
  tokenDelete() {
    this.authService.deleteTokenCookie();  // Elimina el token
    this.token = false;
    this.userRole = '';
    this.cdr.detectChanges();  // Forzar la detección de cambios para actualizar la vista
    this.router.navigate(['/']);  // Redirige al home
  }
}
