import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../services/aler.service';
import { AuthService } from '../../../auth/auth.service';
import { InventarioService } from '../../../services/inventario.service';
import { ClienteService } from '../../../services/cliente.service';
@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrl: './add-cliente.component.css'
})
export class AddClienteComponent {
 clienteForm: FormGroup;
  id:string|null=null;
  title:string='';
  nameButtom:string='Nuevo';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private clienteService:ClienteService,
    private route:ActivatedRoute
  ) {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
     telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id=this.route.snapshot.paramMap.get('id');

    if (this.id) {
     this.title = 'Actualizar';
       this.nameButtom = 'Actualizar';
      this. clienteService.ListOneCliente(Number(this.id)).subscribe({
        next: (data) => {
          console.log(data);
          this.clienteForm.patchValue(data.data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorUpload();
        },
      });
    }
  }
  create() {
    console.log(this.clienteForm.value);
    if(this.nameButtom=="Nuevo"){
      this.clienteService.insertarCliente(this.clienteForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorCreate;
        },
        complete: () => {
            this.alertService.create;
             
              window.location.reload();
            
            
  
        },
      });
    }else{
      this.clienteService.updateCliente(Number(this.id),this.clienteForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorCreate;
        },
        complete: () => {
            this.alertService.create;
             this.router.navigate(['/repuestos']).then(() => {
              window.location.reload();
            });
            
  
        },
      });
    }
    
    this.clienteForm.reset(); // Limpia el formulario después de guardar
    this.clienteService.getCliente().subscribe(
      (data) => {
       console.log(data); // data ya es un arreglo (response.data)
      },
      (error) => {
        console.error('Error al obtener los inventarios:', error);
      }
    );
  }

}
