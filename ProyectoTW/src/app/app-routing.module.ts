import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes de las páginas
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { AuthComponent } from './auth/auth.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { AddRespuestoComponent } from './pages/inventario/add-respuestos/add-respuesto.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AddClienteComponent } from './pages/cliente/add-cliente/add-cliente.component';
import { ServicioContratadoComponent } from './pages/servicio-contratado/servicio-contratado.component';
import { AddServicioContradoComponent } from './pages/servicio-contratado/add-servicio-contrado/add-servicio-contrado.component';
const routes: Routes = [
  { path: 'servicios', component: ServiciosComponent }, // Ruta para Servicios
  { path: 'repuestos', component: RepuestosComponent }, // Ruta para Repuestos
  { path: 'ubicacion', component: UbicacionComponent }, // Ruta para Ubicación
  { path: 'acerca-de', component: AcercaDeComponent }, // Ruta para Acerca de
  { path: 'contactanos', component: ContactanosComponent }, // Ruta para Contáctanos
  { path: 'register', component:AuthComponent }, // Ruta de Modulo de registro
  { path: 'inventario', component:InventarioComponent }, // Ruta de Modulo de inventario
  { path: 'inventario/add/:id', component:  AddRespuestoComponent}, // Ruta de Modulo de inventario
  { path: 'cliente', component:ClienteComponent }, // Ruta de Modulo de cliente
  { path: 'cliente/add/:id', component:  AddClienteComponent}, // Ruta de Modulo de inventario
  { path: 'servicio-contratado', component:  ServicioContratadoComponent}, // Ruta de Modulo de inventario
  { path: 'servicio-contratado/add', component:  AddServicioContradoComponent}, // Ruta de Modulo de inventario
  { path: '', redirectTo: '/servicios', pathMatch: 'full' }, // Redirige por defecto a Servicios
  { path: '**', redirectTo: '/servicios', pathMatch: 'full' } // Redirige cualquier ruta inválida a Servicios
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
