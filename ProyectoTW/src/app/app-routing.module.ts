import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';

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
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AddUsuarioComponent } from './pages/usuario/add-usuario/add-usuario.component';

const routes: Routes = [
  // Define las rutas de la aplicación
  { path: 'servicios', component: ServiciosComponent, data: { animation: 'ServiciosPage', index: 1 } },
  { path: 'repuestos', component: RepuestosComponent, data: { animation: 'RepuestosPage', index: 2 } },
  { path: 'ubicacion', component: UbicacionComponent, data: { animation: 'UbicacionPage', index: 3 } },
  { path: 'acerca-de', component: AcercaDeComponent, data: { animation: 'AcercaDePage', index: 4 } },
  { path: 'contactanos', component: ContactanosComponent, data: { animation: 'ContactanosPage', index: 5 } },
  { path: 'register', component: AuthComponent, data: { animation: 'RegisterPage', index: 6 } },
  { path: 'inventario', component: InventarioComponent, data: { animation: 'InventarioPage', index: 7 } },
  { path: 'inventario/add/:id', component: AddRespuestoComponent, data: { animation: 'AddRespuestoPage', index: 8 } },
  { path: 'cliente', component: ClienteComponent, data: { animation: 'ClientePage', index: 9 } },
  { path: 'cliente/add/:id', component: AddClienteComponent, data: { animation: 'AddClientePage', index: 10 } },
  { path: 'servicio-contratado', component: ServicioContratadoComponent, data: { animation: 'ServicioContratadoPage', index: 11 } },
  { path: 'servicio-contratado/add', component: AddServicioContradoComponent, data: { animation: 'AddServicioContratadoPage', index: 12 } },
  { path: 'usuario', component: UsuarioComponent, data: { animation: 'UsuarioPage', index: 13 } },
  { path: 'usuario', component: UsuarioComponent, data: { animation: 'UsuarioPage', index: 13 } },
  { path: 'usuario/add', component: AddUsuarioComponent, data: { animation: 'AddUsuarioPage', index: 14 } },
  { path: '', redirectTo: '/servicios', pathMatch: 'full' },
  { path: '**', redirectTo: '/servicios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  getRouteAnimationData(outlet: RouterOutlet) {
    if (!outlet || !outlet.activatedRouteData) {
      return null;
    }
    return outlet.activatedRouteData['index'];
  }
}