import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MusicosService, MusicoAPI } from '../../services/musicos.service';

@Component({
  selector: 'app-perfil-musico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-musico.component.html',
  styleUrl: './perfil-musico.component.css'
})
export class PerfilMusicoComponent implements OnInit {
  musico: MusicoAPI | null = null;
  videos: string[] = [];
  videoExpandido: string | null = null;
  faixasPreco: Array<{ value: string; label: string; valor: string }> = [];
  faixaSelecionada = '';

  faixaValorOptions = [
    { value: '10-50', label: '10 a 50 convidados' },
    { value: '50-100', label: '50 a 100 convidados' },
    { value: '100+', label: '100 ou mais convidados' },
    { value: 'negociar', label: 'Negociar' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musicosService: MusicosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.musicosService.getMusicoById(+id).subscribe({
        next: (data) => {
          this.musico = data;
          this.videos = this.extractVideos(data);
          this.faixasPreco = this.montarFaixasPreco(data.musValorHora, data.musValorDoSom);
          this.faixaSelecionada = this.faixasPreco[0]?.value || this.faixaValorOptions[0].value;
        },
        error: (error) => {
          console.error('Erro ao buscar músico:', error);
        }
      });
    }
  }

  extractVideos(musico: MusicoAPI): string[] {
    const videos = [];
    if (musico.musVideo01Youtube) videos.push(musico.musVideo01Youtube);
    if (musico.musVideo02Youtube) videos.push(musico.musVideo02Youtube);
    if (musico.musVideo03Youtube) videos.push(musico.musVideo03Youtube);
    if (musico.musVideo04Youtube) videos.push(musico.musVideo04Youtube);
    return videos;
  }

  getEspecialidades(): string[] {
    if (!this.musico) return [];
    
    const especialidades: string[] = [];
    if (this.musico.musTipoServico) {
      const tipos = this.musico.musTipoServico.split(',').map(t => t.trim());
      especialidades.push(...tipos);
    }
    if (this.musico.musGeneros) {
      const generos = this.musico.musGeneros.split(',').map(g => g.trim());
      especialidades.push(...generos);
    }
    
    return [...new Set(especialidades)];
  }

  getStars(): number[] {
    return Array(5).fill(0);
  }

  voltar() {
    this.router.navigate(['/lista-musicos']);
  }

  contratar() {
    console.log('Método contratar chamado!');
    console.log('Músico:', this.musico);
    console.log('Navegando para agenda-evento...');
    
    this.router.navigate(['/agenda-evento'], {
      queryParams: {
        musicoId: this.musico?.id,
        nomeMusico: this.musico?.musNomeArtistico
      }
    }).then(result => {
      console.log('Navegação concluída:', result);
    }).catch(error => {
      console.error('Erro na navegação:', error);
    });
  }

  getVideoId(url: string): string {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : '';
  }

  calcularPrecoMaximo(valor: string | null): string {
    const valorNum = parseFloat(valor || '0');
    return (valorNum * 1.5).toFixed(0);
  }

  getFaixaPrecoFormatada(valor: string | null): string {
    const valorLimpo = (valor || '').split('|')[0].trim();
    const primeiroValor = valorLimpo.split(';')[0].trim();

    if (!primeiroValor) {
      return 'A combinar';
    }

    if (primeiroValor.toLowerCase() === 'negociar') {
      return 'Negociar';
    }

    if (primeiroValor.includes('-')) {
      const [minimo, maximo] = primeiroValor.split('-').map(item => item.trim());
      return `R$ ${minimo} - R$ ${maximo}`;
    }

    if (primeiroValor.endsWith('+')) {
      return `R$ ${primeiroValor}`;
    }

    return valorLimpo.includes(';') ? `A partir de R$ ${primeiroValor}` : `R$ ${primeiroValor}`;
  }

  private montarFaixasPreco(faixasRaw: string | null, valoresRaw: string | null): Array<{ value: string; label: string; valor: string }> {
    const faixas = (faixasRaw || '')
      .split('|')[0]
      .split(';')
      .map(item => item.trim())
      .filter(Boolean);

    const valores = (valoresRaw || '')
      .split(';')
      .map(item => item.trim())
      .filter(Boolean);

    if (faixas.length === 0 && valores.length === 0) {
      return [];
    }

    if (faixas.length === 0 && valores.length > 0) {
      return valores.map((valor, index) => ({
        value: `opcao-${index + 1}`,
        label: `Opção ${index + 1}`,
        valor
      }));
    }

    return faixas.map((faixa, index) => ({
      value: faixa,
      label: this.formatarFaixaConvidados(faixa),
      valor: valores[index] || ''
    }));
  }

  private formatarFaixaConvidados(faixa: string): string {
    const faixaNormalizada = faixa.trim().toLowerCase();

    if (faixaNormalizada === '10-50') return '10 a 50 convidados';
    if (faixaNormalizada === '50-100') return '50 a 100 convidados';
    if (faixaNormalizada === '100+') return '100 ou mais convidados';
    if (faixaNormalizada === 'negociar') return 'Negociar';

    return faixa;
  }

  getValorSelecionadoFormatado(): string {
    if (this.faixasPreco.length === 0) {
      return 'A combinar';
    }

    const opcao = this.faixasPreco.find(item => item.value === this.faixaSelecionada) || this.faixasPreco[0];
    if (!opcao?.valor) {
      return 'A combinar';
    }

    const valorNumero = Number(opcao.valor.replace(',', '.'));
    if (Number.isNaN(valorNumero)) {
      return `R$ ${opcao.valor}`;
    }

    return `R$ ${valorNumero.toFixed(2).replace('.', ',')}`;
  }

  abrirVideo(videoUrl: string) {
    this.videoExpandido = this.getEmbedUrl(videoUrl);
  }

  fecharVideo() {
    this.videoExpandido = null;
  }

  getEmbedUrl(url: string): string {
    const videoId = this.getVideoId(url);
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  
  getSafeEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.getVideoId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
}
