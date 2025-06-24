import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/aler.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {
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
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.title = 'Actualizar';
      this.nameButtom = 'Actualizar';

      this.usuarioService.ListOneUsuario(Number(this.id)).subscribe({
        next: (data) => {
          this.usuarioForm.patchValue(data.data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorUpload();
        }
      });
    }
  }

  create() {
    if (this.nameButtom === 'Nuevo') {
      this.usuarioService.insertarUsuario(this.usuarioForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorCreate();
        },
        complete: () => {
          this.alertService.create();
          window.location.reload();
        }
      });
    } else {
      this.usuarioService
        .updateUsuario(Number(this.id), this.usuarioForm.value)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (errorData) => {
            console.error(errorData);
            this.alertService.errorCreate();
          },
          complete: () => {
            this.alertService.create();
            this.router.navigate(['/usuarios']).then(() => {
              window.location.reload();
            });
          }
        });
    }

    this.usuarioForm.reset();

    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
