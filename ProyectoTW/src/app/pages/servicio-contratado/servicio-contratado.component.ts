import { Component } from '@angular/core';
import { ServicioDetalleService } from '../../services/servicio-detalle.service';

@Component({
  selector: 'app-servicio-contratado',
  templateUrl: './servicio-contratado.component.html',
  styleUrl: './servicio-contratado.component.css',
})
export class ServicioContratadoComponent {

 servicio: any[] = []; // Asegúrate de que sea un arreglo

  constructor(private servicioDetalleService: ServicioDetalleService) {}
  ngOnInit(): void {
    this.obtenerInventarios();
  }

  obtenerInventarios(): void {
    this.servicioDetalleService.getServicioDetalle().subscribe(
      (data) => {
        this.servicio = data; // data ya es un arreglo (response.data)
      },
      (error) => {
        console.error('Error al obtener los inventarios:', error);
      }
    );
  }
  
}
