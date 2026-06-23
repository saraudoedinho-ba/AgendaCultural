import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtistasSearchService, ArtistaSearchResult } from '../../services/artistas-search.service';
import { HeaderComponent } from '../../components/header/header';
import { Rodape } from '../../components/rodape/rodape';

@Component({
  selector: 'app-agendamento-sucesso',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, Rodape],
  templateUrl: './agendamento-sucesso.html',
  styleUrl: './agendamento-sucesso.css'
})
export class AgendamentoSucessoComponent implements OnInit {
  artista: ArtistaSearchResult | null = null;
  carregando = true;
  erro = '';

  data = '';
  periodo = '';
  horario = '';
  valor = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistasSearchService: ArtistasSearchService
  ) {}

  ngOnInit() {
    const artistaId = Number(this.route.snapshot.paramMap.get('id'));
    const query = this.route.snapshot.queryParams;

    this.data = query['data'] || '';
    this.periodo = query['periodo'] || '';
    this.horario = query['horario'] || '';
    this.valor = query['valor'] || '';

    if (!artistaId) {
      this.router.navigate(['/encontrar-artista']);
      return;
    }

    this.carregarArtista(artistaId);
  }

  carregarArtista(id: number) {
    this.carregando = true;
    this.artistasSearchService.buscarPorId(id).subscribe({
      next: (artista) => {
        this.artista = artista;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao carregar dados do artista.';
        this.carregando = false;
      }
    });
  }

  voltar() {
    this.router.navigate(['/encontrar-artista']);
  }

  get pix(): string {
    return this.artista?.musTelefone || 'Não informado';
  }
}
