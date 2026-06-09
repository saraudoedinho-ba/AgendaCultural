import { Routes } from '@angular/router';  
import { EncontrarArtistaComponent } from './pages/encontrar-artista/encontrar-artista';  
import { HomeComponent } from './pages/home/home.component';  
import { CadastroComponent } from './pages/cadastro/cadastro';  
  
export const routes: Routes = [  
  {path: '', component: HomeComponent},  
  {path: 'encontrar-artista', component: EncontrarArtistaComponent},  
  {path: 'cadastro-artista', component: CadastroComponent},  
  {path: '**', redirectTo: ''}  
]; 
