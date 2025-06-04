import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/components/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { AddRespuestoComponent } from './pages/inventario/add-respuestos/add-respuesto.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { AddClienteComponent } from './pages/cliente/add-cliente/add-cliente.component';
import { ServicioContratadoComponent } from './pages/servicio-contratado/servicio-contratado.component';
import { AddServicioContradoComponent } from './pages/servicio-contratado/add-servicio-contrado/add-servicio-contrado.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ServiciosComponent,
    RepuestosComponent,
    UbicacionComponent,
    AcercaDeComponent,
    ContactanosComponent,
    AuthComponent,
    RegisterComponent,
    AddRespuestoComponent,
    InventarioComponent,
    ClienteComponent,
    AddClienteComponent,
    ServicioContratadoComponent,
    AddServicioContradoComponent
    
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
