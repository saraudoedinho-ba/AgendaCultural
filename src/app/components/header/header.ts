import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  menuAberto = false;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  get usuarioLogado(): boolean {
    return this.authService.isLogado();
  }

  get emailUsuario(): string {
    return localStorage.getItem('userEmail') || '';
  }

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

  irParaPainel() {
    if (this.authService.isLogado()) {
      this.router.navigate(['/painel']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
