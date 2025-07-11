import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { ServicioDetalleService } from '../../../services/servicio-detalle.service';
import {clientes} from '../../../models/cliente.model';
import { servicios } from '../../../models/servicio.model';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent implements OnInit {
  citaForm!: FormGroup;
  clientes: clientes[] = [];
  servicios: servicios[] = [];
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private ServicioDetalleService: ServicioDetalleService,
    private CitaService:CitaService
  ) {}


  ngOnInit(): void {
    this.initForm();
    this.cargarClientes();
    this.cargarServicios();
  }

  initForm() {
    this.citaForm = this.fb.group({
      cliente_id: ['', Validators.required],
      servicio_id: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estado: ['PENDIENTE'],
      observaciones: ['']
    });
  }

  cargarClientes() {
    this.clienteService.getCliente().subscribe(data => {
      this.clientes = data;
    });
   
  }

   cargarServicios() {
    this.ServicioDetalleService.getServicioAll().subscribe(data => {
      this.servicios = data;
    });
 
  }
formatearFecha(fecha: Date | string): string {
  const d = new Date(fecha);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`; // Ej: '2025-07-10'
}

guardarCita() {
  if (this.citaForm.valid) {
    this.cargando = true;

    const cita = { ...this.citaForm.value };

    // Convertir Date a string si es necesario
    cita.fecha = this.formatearFecha(cita.fecha);

    this.CitaService.crearCita(cita).subscribe(
      () => {
        this.mensaje = 'Cita agendada exitosamente';
        this.cargando = false;
        this.citaForm.reset();
      },
      (      error: any) => {
        console.error(error);
        this.mensaje = 'Error al agendar la cita';
        this.cargando = false;
      }
    );
  } else {
    this.mensaje = 'Por favor, complete todos los campos requeridos.';
  }
}
}
