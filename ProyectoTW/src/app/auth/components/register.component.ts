import { Component} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../services/aler.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {


  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password_hash: ['', [Validators.required, Validators.minLength(8)]],
      rol: ['', [Validators.required]],
    });
  }

  register() {
    console.log(this.registerForm.value);
    this.authService.signUp(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errorData) => {
        console.error(errorData);
        this.alertService.errorCreate;
      },
      complete: () => {
          this.alertService.register();
          this.router.navigate([' ']);

      },
    });
    this.registerForm.reset(); // Limpia el formulario después de guardar

  }
}
