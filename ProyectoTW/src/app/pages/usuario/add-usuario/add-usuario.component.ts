import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertService } from '../../../services/aler.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  id: string | null = null;
  title: string = '';
  nameButtom: string = 'Nuevo';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.title = 'Actualizar usuario';
      this.nameButtom = 'Actualizar';

      this.usuarioService.ListOneUsuario(Number(this.id)).subscribe({
        next: (data) => {
        
          // Asegúrate aquí que el objeto viene en data.data o en data directamente
          // Por ejemplo, si el servicio devuelve { ok: true, data: usuario }
          // o simplemente el usuario en data.
          // Ajusta según corresponda:
          const usuario = data.data ? data.data : data;
          this.usuarioForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol,
          });
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorUpload();
        },
      });
    } else {
      this.title = 'Registrar nuevo usuario';
    }
  }

  create() {
    
    if (this.nameButtom === 'Nuevo') {
      this.usuarioService.insertarUsuario(this.usuarioForm.value).subscribe({
        next: (data) => {
         
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorCreate();
        },
        complete: () => {
          this.alertService.create();
          this.router.navigate(['/usuario']);
        },
      });
    } else {
      this.usuarioService.updateUsuario(Number(this.id), this.usuarioForm.value).subscribe({
        next: (data) => {
         
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorCreate();
        },
        complete: () => {
          this.alertService.create();
          this.router.navigate(['/usuario']);
        },
      });
    }

    this.usuarioForm.reset();
  }
}
