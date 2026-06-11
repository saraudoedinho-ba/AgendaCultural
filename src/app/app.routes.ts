import { Routes } from '@angular/router';  
import { EncontrarArtistaComponent } from './pages/encontrar-artista/encontrar-artista';  
import { HomeComponent } from './pages/home/home.component';  
import { CadastroComponent } from './pages/cadastro/cadastro';  
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
  
export const routes: Routes = [  
  {path: '', component: HomeComponent},  
  {path: 'painel', component: DashboardComponent},  
  {path: 'login', component: LoginComponent},  
  {path: 'encontrar-artista', component: EncontrarArtistaComponent},  
  {path: 'cadastro-artista', component: CadastroComponent},  
  {path: '**', redirectTo: ''}  
]; 
