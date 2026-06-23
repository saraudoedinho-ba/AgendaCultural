import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ArtistasSearchService, ArtistaSearchResult } from '../../services/artistas-search.service';
import { HeaderComponent } from '../../components/header/header';
import { Rodape } from '../../components/rodape/rodape';

@Component({
  selector: 'app-detalhes-artista',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, Rodape],
  templateUrl: './detalhes-artista.html',
  styleUrl: './detalhes-artista.css'
})
export class DetalhesArtistaComponent implements OnInit {
  artista: ArtistaSearchResult | null = null;
  carregando = true;
  erro = '';
  secaoAtiva: 'videos' | 'valores' = 'videos';

  diasSemana = [
    { dia: 'Sexta', status: 'Disponível' },
    { dia: 'Sábado', status: 'Disponível' },
    { dia: 'Domingo', status: 'Indisponível' },
    { dia: 'Feriado', status: 'Disponível' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistasSearchService: ArtistasSearchService,
    private sanitizer: DomSanitizer
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
        this.erro = 'Erro ao carregar perfil do artista.';
        this.carregando = false;
      }
    });
  }

  voltar() {
    this.router.navigate(['/encontrar-artista']);
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  get videos(): { original: string; embed: SafeResourceUrl }[] {
    if (!this.artista) return [];
    return [
      this.artista.musVideo01Youtube,
      this.artista.musVideo02Youtube,
      this.artista.musVideo03Youtube,
      this.artista.musVideo04Youtube
    ]
      .filter((v): v is string => !!v)
      .map(url => ({
        original: url,
        embed: this.getEmbedUrl(url)
      }));
  }

  private getEmbedUrl(url: string): SafeResourceUrl {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    const embedUrl = match ? `https://www.youtube.com/embed/${match[1]}` : url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  get localizacao(): string {
    if (!this.artista) return '';
    const partes = [this.artista.musCidade, this.artista.musEstado].filter(Boolean);
    return partes.join(', ') || 'Localização não informada';
  }

  get whatsappLink(): string {
    if (!this.artista?.musTelefone) return '#';
    const numero = this.artista.musTelefone.replace(/\D/g, '');
    return `https://wa.me/55${numero}`;
  }

  contatarWhatsApp() {
    if (!this.artista?.musTelefone) {
      alert('Este artista ainda não cadastrou um telefone de contato.');
      return;
    }
    const numero = this.artista.musTelefone.replace(/\D/g, '');
    window.open(`https://wa.me/55${numero}`, '_blank');
  }

  avaliacoes = [
    {
      nome: 'Maria Costa',
      iniciais: 'MC',
      nota: 5,
      tempo: 'Há 1 mês',
      texto: 'Foi mágico! Animou muito nosso casamento. Profissional, pontual e com excelente repertório. Recomendo muito!'
    }
  ];
}
