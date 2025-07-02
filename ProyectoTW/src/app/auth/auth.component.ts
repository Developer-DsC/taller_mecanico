import { Component } from '@angular/core';
import { FormBuilder, FormGroup,  Validators
} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/aler.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
 loginForm: FormGroup;
 showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
   
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (data) => {
        
      },
      error: (errorData) => {
        console.error(errorData);
        this.alertService.errorCredenciales();
      },
      complete: () => {
          this.alertService.login();
          this.router.navigate(['/servicio']).then(() => {
            window.location.reload();
          });;

      },
    });
    this.loginForm.reset(); // Limpia el formulario después de guardar

  }
}
