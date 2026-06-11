import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';
  carregando = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    // Validar campos
    if (!this.email || !this.senha) {
      this.erro = 'Por favor, preencha todos os campos.';
      return;
    }

    this.erro = '';
    this.carregando = true;

    // Fazer requisição ao servidor
    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        // Login bem-sucedido
        this.authService.salvarSessao({
          usuario: this.email,
          email: this.email,
          usuEmail: this.email,
          musicoId: response.musicoId || response.id,
          token: response.token,
          ...response
        });
        
        this.carregando = false;
        this.router.navigate(['/painel']);
      },
      error: (error) => {
        // Erro no login
        this.carregando = false;
        
        if (error.status === 401 || error.status === 403) {
          this.erro = 'Usuário ou senha inválidos.';
        } else if (error.status === 0) {
          this.erro = 'Erro ao conectar com o servidor. Verifique se o servidor está rodando.';
        } else {
          this.erro = error.error?.message || 'Erro ao fazer login. Tente novamente.';
        }
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
