import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { ListaalumnosComponent } from './components/listaalumnos/listaalumnos.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { appRoutingProvider, routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AlumnosService } from './services/alumnos.service';
import { ActualizaralumnoComponent } from './components/actualizaralumno/actualizaralumno.component';
import { CreatealumnosComponent } from './components/createalumnos/createalumnos.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ListaalumnosComponent,
    GruposComponent,
    ActualizaralumnoComponent,
    CreatealumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    appRoutingProvider,
    AlumnosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
