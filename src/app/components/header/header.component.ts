import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuAberto = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  navigateToHome() {
    this.router.navigate(['/']);
    this.fecharMenu();
  }

  navigateToEncontrarArtista() {
    this.router.navigate(['/encontrar-artista']);
    this.fecharMenu();
  }

  navigateToCadastroArtistas() {
    this.router.navigate(['/cadastro-artista']);
    this.fecharMenu();
  }

  navigateToDashboard() {
    // Verificar se já está logado usando o serviço
    if (this.authService.isLogado()) {
      // Se já está logado, vai direto pro dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Se não está logado, vai pro login
      this.router.navigate(['/login']);
    }
    
    this.fecharMenu();
  }
}
