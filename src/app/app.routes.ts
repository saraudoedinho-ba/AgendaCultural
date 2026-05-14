import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'encontrar-artista',
    loadComponent: () => import('./pages/encontrar-artista/encontrar-artista.component').then(m => m.EncontrarArtistaComponent)
  },
  {
    path: 'lista-musicos',
    loadComponent: () => import('./pages/lista-musicos/lista-musicos.component').then(m => m.ListaMusicosComponent)
  },
  {
    path: 'perfil-musico/:id',
    loadComponent: () => import('./pages/perfil-musico/perfil-musico.component').then(m => m.PerfilMusicoComponent)
  },
  {
    path: 'agenda-evento',
    loadComponent: () => import('./pages/agenda-evento/agenda-evento.component').then(m => m.AgendaEventoComponent)
  },
  {
    path: 'confirmacao-agendamento',
    loadComponent: () => import('./pages/confirmacao-agendamento/confirmacao-agendamento.component').then(m => m.ConfirmacaoAgendamentoComponent)
  },
  {
    path: 'cadastro-artista',
    loadComponent: () => import('./pages/cadastro-artista/cadastro-artista.component').then(m => m.CadastroArtistaComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'anunciar-trabalho',
    loadComponent: () => import('./pages/anunciar-trabalho/anunciar-trabalho.component').then(m => m.AnunciarTrabalhoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
