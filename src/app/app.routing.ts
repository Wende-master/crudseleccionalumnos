import{ Routes, RouterModule} from '@angular/router'
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { ActualizaralumnoComponent } from './components/actualizaralumno/actualizaralumno.component';
import { CreatealumnosComponent } from './components/createalumnos/createalumnos.component';
import { LoginComponent } from './components/login/login.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { ListaalumnosComponent } from './components/listaalumnos/listaalumnos.component';

const appRoutes:Routes=[
    {path:"", component:LoginComponent},
    {path:"login", component:LoginComponent},
    {path:"home", component:HomeComponent},
    {path:"generarGrupos", component:GruposComponent},
    {path:"actualizar/:idalumno/:nombre/:apellidos/:imagen/:activo/:idcurso", component:ActualizaralumnoComponent},
    {path:"eliminar/:idalumno", component:EliminarComponent}, //Eliminar por routing
    {path:"crear", component:CreatealumnosComponent},

]
export const appRoutingProvider:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);
