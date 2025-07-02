import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../../services/aler.service';
import { AuthService } from '../../../auth/auth.service';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-add-respuesto',
  templateUrl: './add-respuesto.component.html',
  styleUrl: './add-respuesto.component.css'
})
export class AddRespuestoComponent {

  respuestosForm: FormGroup;
  id:string|null=null;
  title:string='';
  nameButtom:string='Nuevo';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private inventarioService:InventarioService,
    private route:ActivatedRoute
  ) {
    this.respuestosForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      cantidad_disponible: ['', [Validators.required]],
      cantidad_minima: ['', [Validators.required]],
      costo_unitario: ['', [Validators.required]],
      fecha_ingreso:['', [Validators.required]],
      imagen:['',Validators.required],
      descripcion:['',Validators.required]
    });
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id=this.route.snapshot.paramMap.get('id');

    if (this.id) {
     this.title = 'Actualizar';
       this.nameButtom = 'Actualizar';
      this.inventarioService.ListOneRespuesto(Number(this.id)).subscribe({
        next: (data) => {
          
          this.respuestosForm.patchValue(data.data);
        },
        error: (errorData) => {
          console.error(errorData);
          this.alertService.errorUpload();
        },
      });
    }
  }
  create() {
    
    if(this.nameButtom=="Nuevo"){
      this.inventarioService.insertarRepuesto(this.respuestosForm.value).subscribe({
        next: (data) => {
          
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
    }else{
      this.inventarioService.updateRepuesto(Number(this.id),this.respuestosForm.value).subscribe({
        next: (data) => {
         
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
    
    this.respuestosForm.reset(); // Limpia el formulario después de guardar
    this.inventarioService.getInventarios().subscribe(
      (data) => {
      // data ya es un arreglo (response.data)
      },
      (error) => {
        console.error('Error al obtener los inventarios:', error);
      }
    );
  }

  update(){
    this.inventarioService.updateRepuesto(Number(this.id),this.respuestosForm.value).subscribe({
      next: (data) => {
        
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
}
