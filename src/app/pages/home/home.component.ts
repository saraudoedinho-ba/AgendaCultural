import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MusicosService } from '../../services/musicos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  testando = false;

  constructor(
    private router: Router,
    private musicosService: MusicosService
  ) {}

  navegarCadastro() {
    this.router.navigate(['/anunciar-trabalho']);
  }

  cutucar() {
    this.testando = true;
    const dadosTeste = {
      nomeArtistico: 'Teste Cutucar',
      email: 'teste@agendamusical.net.br',
      telefone: '11999999999',
      cidade: 'São Paulo',
      estado: 'SP'
    };

    this.musicosService.enviarEmailCadastro(dadosTeste).subscribe({
      next: () => {
        alert('✅ Email de teste enviado com sucesso! Verifique ba.edison@gmail.com');
        this.testando = false;
      },
      error: (err) => {
        console.error('Erro ao enviar email:', err);
        alert('❌ Erro ao enviar email: ' + (err.message || 'Verifique o console'));
        this.testando = false;
      }
    });
  }

  navegarDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // Dados de exemplo para o portfólio (grid de imagens do Instagram)
  portfolioItems = [
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop'
  ];

  // Dados dos artistas mais bem avaliados
  topArtists = [
    {
      id: 1,
      name: 'Artista 1',
      image: '/assets/images/vozeviolao.png'
    },
    {
      id: 2,
      name: 'Artista 2',
      image: '/assets/images/baile.png'
    },
    {
      id: 3,
      name: 'Artista 3',
      image: '/assets/images/cerimonial.png'
    },
    {
      id: 4,
      name: 'Artista 4',
      image: '/assets/images/pocket.png'
    }
  ];
}
