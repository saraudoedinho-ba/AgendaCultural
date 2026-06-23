import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtistasSearchService, ArtistaSearchResult } from '../../services/artistas-search.service';
import { HeaderComponent } from '../../components/header/header';
import { Rodape } from '../../components/rodape/rodape';

@Component({
  selector: 'app-contratar-artista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, Rodape],
  templateUrl: './contratar-artista.html',
  styleUrl: './contratar-artista.css'
})
export class ContratarArtistaComponent implements OnInit {
  artista: ArtistaSearchResult | null = null;
  carregando = true;
  erro = '';
  enviando = false;
  sucesso = false;

  form = {
    nome: '',
    email: '',
    telefone: '',
    dataEvento: '',
    cidade: '',
    estado: '',
    tipoEvento: '',
    duracao: '',
    mensagem: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistasSearchService: ArtistasSearchService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/encontrar-artista']);
      return;
    }

    this.carregarArtista(id);
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
    if (this.artista) {
      this.router.navigate(['/detalhes-artista', this.artista.id]);
    } else {
      this.router.navigate(['/encontrar-artista']);
    }
  }

  enviarProposta() {
    if (!this.form.nome || !this.form.email || !this.form.dataEvento || !this.form.cidade || !this.form.estado) {
      alert('Preencha os campos obrigatórios.');
      return;
    }

    this.enviando = true;

    setTimeout(() => {
      this.enviando = false;
      this.sucesso = true;
      console.log('Proposta enviada:', this.form);
    }, 1200);
  }
}
