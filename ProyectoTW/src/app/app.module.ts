import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/components/register.component';
import { FacturaFormComponent } from './components/factura-form/factura-form.component';
import { FacturaPdfComponent } from './components/factura-pdf/factura-pdf.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { AddClienteComponent } from './pages/cliente/add-cliente/add-cliente.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { AddRespuestoComponent } from './pages/inventario/add-respuestos/add-respuesto.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { AddServicioContradoComponent } from './pages/servicio-contratado/add-servicio-contrado/add-servicio-contrado.component';
import { ServicioContratadoComponent } from './pages/servicio-contratado/servicio-contratado.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { UbicacionComponent } from './pages/ubicacion/ubicacion.component';
import { AddUsuarioComponent } from './pages/usuario/add-usuario/add-usuario.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CitaComponent } from './pages/cita/cita.component';
import { AgendarCitaComponent } from './pages/cita/agendar-cita/agendar-cita.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // para fechas nativas
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';

import { MatButtonModule } from '@angular/material/button';



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
    AddServicioContradoComponent,
    UsuarioComponent,
    AddUsuarioComponent,
    FacturaPdfComponent,
    FacturaFormComponent,
    CitaComponent,
    AgendarCitaComponent
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,BrowserAnimationsModule, FormsModule,  MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,MatIconModule,CommonModule,MatSelectModule,MatButtonModule
  ],
 providers: [
  provideClientHydration(),
  provideHttpClient(
    withFetch(),
    withInterceptorsFromDi()
  ),
],
  bootstrap: [AppComponent],
})
export class AppModule {}
