import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MusicosService, Musico } from '../../services/musicos.service';

@Component({
  selector: 'app-lista-musicos',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lista-musicos.component.html',
  styleUrl: './lista-musicos.component.css'
})
export class ListaMusicosComponent implements OnInit {
  musicos: Musico[] = [];
  loading: boolean = true;
  erro: boolean = false;
  mensagemErro: string = '';

  constructor(
    private musicosService: MusicosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.erro = false;
    
    this.musicosService.getMusicos().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.musicos = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar músicos:', error);
        this.erro = true;
        this.loading = false;
        this.mensagemErro = 'O servidor está inativo';
      }
    });
  }

  getStars(count: number): number[] {
    return Array(count).fill(0);
  }

  verPerfil(id: number) {
    this.router.navigate(['/perfil-musico', id]);
  }
}
