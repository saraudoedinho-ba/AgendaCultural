import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { EncontrarArtistaComponent } from './pages/encontrar-artista/encontrar-artista';
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardHome } from './pages/dashboard/dashboard-home/dashboard-home';
import { Billing } from './pages/billing/billing';
import { Messages } from './pages/messages/messages';
import { Referrals } from './pages/referrals/referrals';
import { Settings } from './pages/settings/settings';
import { LoginComponent } from './pages/login/login.component';
import { DetalhesArtistaComponent } from './pages/detalhes-artista/detalhes-artista';
import { AgendaEventos } from './pages/agenda-eventos/agenda-eventos';
import { AgendamentoSucessoComponent } from './pages/agendamento-sucesso/agendamento-sucesso';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'painel',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardHome },
      { path: 'faturamento', component: Billing },
      { path: 'indicacoes', component: Referrals },
      { path: 'mensagens', component: Messages },
      { path: 'configuracoes', component: Settings }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'encontrar-artista', component: EncontrarArtistaComponent },
  { path: 'cadastro-artista', component: CadastroComponent },
  { path: 'detalhes-artista/:id', component: DetalhesArtistaComponent },
  { path: 'contratar-artista/:id', component: AgendaEventos },
  { path: 'agendamento-sucesso/:id', component: AgendamentoSucessoComponent },
  { path: '**', redirectTo: '' }
];
