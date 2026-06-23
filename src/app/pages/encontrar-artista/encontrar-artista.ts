import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { Rodape } from "../../components/rodape/rodape";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidadesService } from '../../services/cidades.service';
import { ArtistasSearchService, ArtistaSearchResult } from '../../services/artistas-search.service';
import { ESPECIALIDADES } from '../../constants/especialidades';
  
@Component({  
  selector: 'app-encontrar-artista',  
  standalone: true,  
  imports: [ CommonModule, FormsModule, HeaderComponent, Rodape],
  templateUrl: './encontrar-artista.html',  
  styleUrl: './encontrar-artista.css'  
})  
export class EncontrarArtistaComponent implements OnInit {  
    estados: { uf: string; nome: string; codigo_uf: number }[] = [];
  cidadesDisponiveis: string[] = [];
  dadosCidades: any = null;
  estadoSelecionado = '';
  estadoSelecionadoInfo: any = null;

  artistas: ArtistaSearchResult[] = [];
  carregando = false;

  filtroNome = '';
  filtroEstado = '';
  filtroCidade = '';
  filtroCategoria = '';

  especialidades = ESPECIALIDADES;

  private coresCards = ['purple-bg', 'purple-bg', 'purple-bg']; // SUGGESTED EDIT

  constructor(
    private router: Router,
    private cidadesService: CidadesService,
    private artistasSearchService: ArtistasSearchService
  ) {}
  ngOnInit() {
    this.cidadesService.carregarEstados().subscribe({
      next: (dados: any) => {
        this.dadosCidades = dados;
        this.estados = dados.map((e: any) => ({ uf: e.uf, nome: e.nome, codigo_uf: e.codigo_uf }));
      },
      error: (erro) => console.error('Erro ao carregar estados:', erro)
    });

    this.carregarArtistas();
  }

  carregarArtistas() {
    this.carregando = true;
    this.artistasSearchService.buscarTodos().subscribe({
      next: (artistas) => {
        this.artistas = artistas;
        this.carregando = false;
        },
      error: (erro) => {
        console.error('Erro ao carregar artistas:', erro);
        this.carregando = false;
    }
    });
  }

  onChangeEstado(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.estadoSelecionado = select.value;
    this.filtroEstado = select.value;
    this.estadoSelecionadoInfo = this.dadosCidades?.find((e: any) => e.uf === this.estadoSelecionado) || null;

    if (this.estadoSelecionado && this.estadoSelecionadoInfo) {
      const codigoUf = this.estadoSelecionadoInfo.codigo_uf;
      this.cidadesService.carregarCidadesPorEstado(codigoUf).subscribe({
        next: (cidades) => {
          this.cidadesDisponiveis = cidades;
        },
        error: (erro) => console.error('Erro ao carregar cidades:', erro)
      });
    } else {
      this.cidadesDisponiveis = [];
  }
  }

  pesquisarArtista() {
    this.carregando = true;
    this.artistasSearchService.buscarPorFiltros({
      nome: this.filtroNome || undefined,
      estado: this.filtroEstado || undefined,
      cidade: this.filtroCidade || undefined,
      categoria: this.filtroCategoria || undefined
    }).subscribe({
      next: (artistas) => {
        this.artistas = artistas;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro na busca:', erro);
        this.carregando = false;
  }
    });
}

  getCardColor(id: number): string {
    return this.coresCards[id % this.coresCards.length];
  }

  navegarParaDetalhes(artistaId: number) {
    this.router.navigate(['/detalhes-artista', artistaId]);
  }

  voltar() {
    this.router.navigate(['/']);
  }
}

