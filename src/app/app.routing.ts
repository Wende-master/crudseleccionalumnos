import{ Routes, RouterModule} from '@angular/router'
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { ActualizaralumnoComponent } from './components/actualizaralumno/actualizaralumno.component';
import { CreatealumnosComponent } from './components/createalumnos/createalumnos.component';

const appRoutes:Routes=[
    {path:"", component:HomeComponent},
    {path:"generarGrupos", component:GruposComponent},
    {path:"actualizar/:idalumno", component:ActualizaralumnoComponent},
    {path:"crear", component:CreatealumnosComponent},

]
export const appRoutingProvider:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);
