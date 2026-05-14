import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://agendamusical.net.br/api';

  constructor(private http: HttpClient) {}

  login(usuEmail: string, usuSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuEmail, usuSenha });
  }

  isLogado(): boolean {
    return localStorage.getItem('userLogado') === 'true';
  }

  salvarSessao(userData: any) {
    localStorage.setItem('userLogado', 'true');
    localStorage.setItem('usuario', userData.usuario || userData.user?.usuario || userData.user?.username || '');
    localStorage.setItem('userEmail', userData.email || userData.usuEmail || '');
    if (userData.musicoId) {
      localStorage.setItem('musicoId', String(userData.musicoId));
    }
    if (userData.token) {
      localStorage.setItem('authToken', userData.token);
    }
  }

  limparSessao() {
    localStorage.removeItem('userLogado');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('musicoId');
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
