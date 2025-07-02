import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../services/aler.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css',
})
export class ClienteComponent {
  clientes: any[] = []; // Asegúrate de que sea un arreglo

  constructor(private clienteService: ClienteService, private alertService:AlertService) {}
  ngOnInit(): void {
    this.obtenerInventarios();
  }

  obtenerInventarios(): void {
    this.clienteService.getCliente().subscribe(
      (data) => {
        this.clientes = data; // data ya es un arreglo (response.data)
      },
      (error) => {
        console.error('Error al obtener los inventarios:', error);
      }
    );
  }

  eliminar(cliente_id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      // Si el usuario hace clic en "Sí, eliminar"
      if (result.isConfirmed) {
        // Procedemos con la eliminación
        this.clienteService.deleteCliente(cliente_id).subscribe({
          next: (data) => {
            
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {
           
            setTimeout(() => {
              window.location.reload();
            }, 2000);  
          },
        });
    
      } else {
        // Si el usuario hace clic en "Cancelar"
        Swal.fire({
          title: 'Cancelado',
          text: 'La acción de eliminación ha sido cancelada.',
          icon: 'info', // Puedes cambiar el icono a algo más acorde
          confirmButtonText: 'Aceptar',
        }).then(() => {
          
        });
      }
    });

  }
}
