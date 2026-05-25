import { Routes } from '@angular/router';  
import { EncontrarArtistaComponent } from './pages/encontrar-artista/encontrar-artista';
import { HomeComponent } from './pages/home/home.component';
  
export const routes: Routes = [  
  {path: '', component: HomeComponent}, 
    {path: 'encontrar-artista', component: EncontrarArtistaComponent}, 
]; 
