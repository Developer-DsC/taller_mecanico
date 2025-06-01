import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ServicioDetalleService } from '../../../services/servicio-detalle.service';
import { ClienteService } from '../../../services/cliente.service';
import { InventarioService } from '../../../services/inventario.service';
import { AlertService } from '../../../services/aler.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-servicio-contrado',
  templateUrl: './add-servicio-contrado.component.html',
  styleUrl: './add-servicio-contrado.component.css',
})
export class AddServicioContradoComponent {
  title: string = '';
  servicioForm: FormGroup;
  id: string | null = null;
  nameButtom: string = 'Guardar';
  clientes: any[] =[];
  serviciosDetalle:any[]=[];
  repuestos:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
       private servicioDetalle: ServicioDetalleService,
     private router: Router,
        private alertService: AlertService,
      /* private inventarioService:InventarioService, */
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private inventarioService: InventarioService
  ) {
    this.servicioForm = this.formBuilder.group({
      servicio_id: ['', [Validators.required]],
      cliente_id: ['', [Validators.required]],
      repuesto_id: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.ListClientes();
    this.ListServicios();
    this.ListRepuestos();

  }

  ListClientes() {
    this.clienteService.getCliente().subscribe({
      next: (data) => {
        console.log(data);
        this.clientes=data;
      },
      error: (errorData) => {
        console.error(errorData);
/*         this.alertService.errorCreate();
 */      },
      complete: () => {
        console.log('clientes cargados');
      },
    });
  }

  ListServicios() {
    this.servicioDetalle.getServicioDetalleAll().subscribe({
      next: (data) => {
        console.log(data);
        this.serviciosDetalle=data;
      },
      error: (errorData) => {
        console.error(errorData);
/*         this.alertService.errorCreate();
 */      },
      complete: () => {
        console.log('servicios cargados');
      },
    });
  }

  ListRepuestos() {
    this.inventarioService.getInventarios().subscribe({
      next: (data) => {
        console.log(data);
        this.repuestos=data;
      },
      error: (errorData) => {
        console.error(errorData);
/*         this.alertService.errorCreate();
 */      },
      complete: () => {
        console.log('repuestos cargados');
      },
    });
  }

  create() {
    this.servicioDetalle.insertarServicioDetalle(this.servicioForm.value).subscribe({
        next: (data) => {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Servicio agregado correctamente',
            }).then(() => {
                this.router.navigate(['/servicio-contratado']).then(() => {
                    window.location.reload();
                });
            });
        },
        error: (errorData) => {
            if (errorData.status === 400) {
                if (errorData.error.msg === 'El repuesto no existe en el inventario.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El repuesto no existe en el inventario.',
                    });
                } else if (errorData.error.msg === 'No hay suficiente cantidad en stock.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Stock insuficiente',
                        text: 'No hay suficiente cantidad en stock.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un error al procesar la solicitud. Intenta nuevamente.',
                });
            }
        }
    });
}

}
