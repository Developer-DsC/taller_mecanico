import { Component } from '@angular/core';
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
    currentUserRole: string = '';
  availableRoles: string[] = [];
  rolUsuario: string = '';
  showPassword: boolean = false;

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
      rol: [''],
    });

     this.authService.userRole$.subscribe((rol) => {
    this.rolUsuario = rol;
     });

  }

  ngOnInit(): void {
  this.authService.userRole$.subscribe((rol) => {
    this.rolUsuario = rol;
    console.log('Rol recibido en register.component:', rol);

    // Definir roles permitidos según el rol del usuario autenticado
    if (rol === 'admin') {
      this.availableRoles = ['admin', 'tecnico', 'cliente'];
    } else if (rol === 'tecnico') {
      this.availableRoles = ['tecnico', 'cliente'];
    } else {
      this.availableRoles = ['cliente'];
    }
  });
}



   register() {
    // 3) Antes de enviar, si NO hay sesión (currentUserRole === ''), forzamos rol = 'cliente'
    if (!this.rolUsuario || this.rolUsuario === 'cliente') {
  this.registerForm.get('rol')?.setValue('cliente');
}
    
    // 4) Ahora enviamos tal cual:
    this.authService.signUp(this.registerForm.value).subscribe({
      next: (data) => {
        console.log('Usuario creado:', data);
      },
      error: (errorData) => {
        console.error('Error al crear usuario:', errorData);
        this.alertService.errorCreate();
      },
      complete: () => {
        this.alertService.register();

        this.router.navigate(['/home']);

        this.router.navigate([' ']);


      },
    });

    this.registerForm.reset();
  }
}
