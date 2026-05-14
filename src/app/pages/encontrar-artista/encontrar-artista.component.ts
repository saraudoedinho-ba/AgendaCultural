import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-encontrar-artista',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './encontrar-artista.component.html',
  styleUrl: './encontrar-artista.component.css'
})
export class EncontrarArtistaComponent {
  tipoServicoOptions = [
    'Todos',
    'Voz e Violão',
    'Banda Completa',
    'DJ',
    'Instrumental'
  ];

  cidadeOptions = [
    'Todas',
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Curitiba',
    'Porto Alegre',
    'Salvador',
    'Fortaleza',
    'Recife',
    'Goiânia'
  ];

  selectedTipoServico = 'Todos';
  selectedCidade = 'Todas';
  isTipoServicoOpen = false;
  isCidadeOpen = false;

  constructor(private router: Router) {}

  toggleTipoServico() {
    this.isTipoServicoOpen = !this.isTipoServicoOpen;
  }

  selectTipoServico(option: string) {
    this.selectedTipoServico = option;
    this.isTipoServicoOpen = false;
  }

  toggleCidade() {
    this.isCidadeOpen = !this.isCidadeOpen;
  }

  selectCidade(option: string) {
    this.selectedCidade = option;
    this.isCidadeOpen = false;
  }

  buscarMusicos() {
    this.router.navigate(['/lista-musicos']);
  }
}
