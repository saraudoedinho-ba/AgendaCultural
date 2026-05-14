import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-anunciar-trabalho',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './anunciar-trabalho.component.html',
  styleUrls: ['./anunciar-trabalho.component.css']
})
export class AnunciarTrabalhoComponent {
  anuncio = {
    titulo: '',
    descricao: '',
    especialidade: '',
    generos: '',
    valorMinimo: '',
    valorMaximo: '',
    valorNegociavel: false,
    disponibilidade: '',
    cidade: '',
    estado: '',
    telefone: '',
    instagram: '',
    youtube: '',
    portfolio: ''
  };

  especialidadesOptions = [
    'Banda Completa',
    'Solo',
    'Duo',
    'Trio',
    'Quarteto',
    'DJ',
    'Voz e Violão',
    'Instrumental'
  ];

  generosOptions = [
    'Samba', 'Pagode', 'Bossanova', 'MPB', 'Forró', 'Sertanejo',
    'Gospel', 'Rock', 'Pop', 'Jazz', 'Blues', 'Hip Hop', 'Rap',
    'R&B', 'Soul', 'Eletrônica', 'Reggae', 'Country', 'Funk brasileiro',
    'Axé', 'Piseiro', 'Clássico'
  ];

  disponibilidadeOptions = [
    'Dias úteis',
    'Finais de semana',
    'Todos os dias',
    'Sob consulta'
  ];

  especialidadesSelecionadas: string[] = [];
  generosSelecionados: string[] = [];

  isEspecialidadeOpen = false;
  isGeneroOpen = false;

  salvando = false;
  mensagemErro = '';

  constructor(private router: Router) {}

  toggleEspecialidade() {
    this.isEspecialidadeOpen = !this.isEspecialidadeOpen;
    if (this.isEspecialidadeOpen) {
      this.isGeneroOpen = false;
    }
  }

  toggleGenero() {
    this.isGeneroOpen = !this.isGeneroOpen;
    if (this.isGeneroOpen) {
      this.isEspecialidadeOpen = false;
    }
  }

  toggleEspecialidadeItem(item: string) {
    const index = this.especialidadesSelecionadas.indexOf(item);
    if (index > -1) {
      this.especialidadesSelecionadas.splice(index, 1);
    } else {
      this.especialidadesSelecionadas.push(item);
    }
    this.anuncio.especialidade = this.especialidadesSelecionadas.join(', ');
  }

  toggleGeneroItem(item: string) {
    const index = this.generosSelecionados.indexOf(item);
    if (index > -1) {
      this.generosSelecionados.splice(index, 1);
    } else {
      this.generosSelecionados.push(item);
    }
    this.anuncio.generos = this.generosSelecionados.join(', ');
  }

  isEspecialidadeSelecionada(item: string): boolean {
    return this.especialidadesSelecionadas.includes(item);
  }

  isGeneroSelecionado(item: string): boolean {
    return this.generosSelecionados.includes(item);
  }

  removerEspecialidade(item: string) {
    this.toggleEspecialidadeItem(item);
  }

  removerGenero(item: string) {
    this.toggleGeneroItem(item);
  }

  publicar() {
    if (this.salvando) return;

    if (!this.anuncio.titulo.trim()) {
      this.mensagemErro = 'O título do anúncio é obrigatório';
      return;
    }

    if (!this.anuncio.descricao.trim()) {
      this.mensagemErro = 'A descrição do anúncio é obrigatória';
      return;
    }

    this.salvando = true;
    this.mensagemErro = '';

    // TODO: integrar com API de anúncios quando disponível
    console.log('Dados do anúncio:', this.anuncio);
    
    alert('Anúncio publicado com sucesso!');
    this.salvando = false;
    this.router.navigate(['/']);
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
