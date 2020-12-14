import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrudComponent } from './crud/crud.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { AreaComponent } from './area/area.component';
import { EquipoComponent } from './equipo/equipo.component';
import { ModuloComponent } from './modulo/modulo.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { LiderComponent } from './lider/lider.component';
import { EmpleadoComponent } from './empleado/empleado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrudComponent,
    ClientesComponent,
    ProyectosComponent,
    AreaComponent,
    EquipoComponent,
    ModuloComponent,
    ProveedorComponent,
    LiderComponent,
    EmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
