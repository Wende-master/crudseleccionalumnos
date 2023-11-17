import{ Routes, RouterModule} from '@angular/router'
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { GruposComponent } from './components/grupos/grupos.component';

const appRoutes:Routes=[
    {path:"", component:HomeComponent},
    {path:"generarGrupos", component:GruposComponent},
    {path:"generarGrupos", component:GruposComponent},
    {path:"generarGrupos", component:GruposComponent},

]
export const appRoutingProvider:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);
