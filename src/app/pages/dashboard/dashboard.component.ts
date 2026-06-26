import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Página inicial', icon: 'home', route: '/painel' },
    { id: 'faturamento', label: 'Faturamento', icon: 'billing', route: '/painel/faturamento' },
    { id: 'indicacoes', label: 'Indicações', icon: 'referrals', route: '/painel/indicacoes' },
    { id: 'mensagens', label: 'Mensagens', icon: 'messages', route: '/painel/mensagens' },
    { id: 'configuracoes', label: 'Configurações', icon: 'settings', route: '/painel/configuracoes' }
  ];

  isActive(item: MenuItem): boolean {
    const currentUrl = this.router.url;
    if (item.route === '/painel') {
      return currentUrl === '/painel' || currentUrl === '/painel/';
    }
    return currentUrl.startsWith(item.route);
  }

  sair(): void {
    this.authService.limparSessao();
    this.router.navigate(['/']);
  }
}
