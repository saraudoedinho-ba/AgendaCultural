import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MusicosService } from '../../services/musicos.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro-artista',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './cadastro-artista.component.html',
  styleUrls: ['./cadastro-artista.component.css']
})
export class CadastroArtistaComponent {
  artista = {
    musNomeArtistico: '',
    musEmail: '',
    musSenha: '',
    musTelefone: '',
    musEstado: '',
    musCidade: '',
    musBairro: '',
    musGeneros: '',
    musValorHora: '',
    musValorDoSom: '',
    musContato: '',
    musDescricao: '',
    musRedesSociais: '',
    musTipoServico: '',
    musSiteArtista: '',
    musFacebook: '',
    musInstagram: '',
    musTiktok: '',
    musOutrasRedes: '',
    musDriveGoogle: '',
    musVideo01Youtube: '',
    musVideo02Youtube: '',
    musVideo03Youtube: '',
    musVideo04Youtube: '',
    musLocalizacao: '',
    musDescricaoBreve: '',
    musEspecialidade: ''
  };

  faixasEvento = [
    { faixa: '', valor: '' },
    { faixa: '', valor: '' },
    { faixa: '', valor: '' },
    { faixa: '', valor: '' }
  ];

  faixaValorOptions = [
    { value: '10-50', label: '10 a 50 convidados' },
    { value: '50-100', label: '50 a 100 convidados' },
    { value: '100+', label: '100 ou mais convidados' },
    { value: 'negociar', label: 'Negociar' }
  ];

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

  tipoServicoOptions = [
    'Samba',
    'Pagode',
    'Bossanova',
    'MPB',
    'Forró',
    'Sertanejo',
    'Gospel',
    'Sertanejo raiz',
    'Sertanejo universitário',
    'Funk brasileiro',
    'Axé',
    'Maracatu',
    'Baião',
    'Xote',
    'Brega',
    'Piseiro',
    'Rock',
    'Heavy Metal',
    'Kalipso',
    'Punk',
    'Pop',
    'Jazz',
    'Blues',
    'Hip Hop',
    'Rap',
    'R&B',
    'Soul',
    'Eletrônica',
    'House',
    'Techno',
    'Country',
    'Reggae',
    'Reggaeton',
    'Clássico'
  ];

  especialidadesSelecionadas: string[] = [];
  tipoServicoSelecionados: string[] = [];

  isEspecialidadeOpen = false;
  isTipoServicoOpen = false;
  
  salvando = false;
  mensagemErro = '';

  constructor(private router: Router, private musicosService: MusicosService, private authService: AuthService) {}

  preencherExemplo() {
    this.artista = {
      musNomeArtistico: 'João Silva Music',
      musEmail: 'joao.silva@email.com',
      musSenha: '123456',
      musTelefone: '(11) 99999-8888',
      musEstado: 'SP',
      musCidade: 'São Paulo',
      musBairro: 'Vila Mariana',
      musGeneros: 'Brega, Forró',
      musValorHora: '',
      musValorDoSom: '',
      musContato: '(11) 99999-8888',
      musDescricao: 'Músico profissional com 10 anos de experiência em shows e eventos. Repertório variado com mais de 300 músicas entre MPB, Samba, Pop e Sertanejo.',
      musRedesSociais: 'https://open.spotify.com/artist/exemplo',
      musTipoServico: 'Samba, MPB, Pop',
      musSiteArtista: 'https://joaosilvamusic.com.br',
      musFacebook: 'https://facebook.com/joaosilvamusic',
      musInstagram: '@joaosilvamusic',
      musTiktok: '@joaosilvamusic',
      musOutrasRedes: 'https://soundcloud.com/joaosilvamusic',
      musDriveGoogle: 'https://drive.google.com/drive/folders/exemplo',
      musVideo01Youtube: 'https://youtube.com/watch?v=exemplo1',
      musVideo02Youtube: 'https://youtube.com/watch?v=exemplo2',
      musVideo03Youtube: 'https://youtube.com/watch?v=exemplo3',
      musVideo04Youtube: 'https://youtube.com/watch?v=exemplo4',
      musLocalizacao: 'Vila Mariana, São Paulo - SP',
      musDescricaoBreve: 'Voz e Violão para festas e eventos',
      musEspecialidade: 'Voz e Violão, Solo'
    };

    this.especialidadesSelecionadas = ['Voz e Violão', 'Solo'];
    this.tipoServicoSelecionados = ['Samba', 'MPB', 'Pop'];

    this.faixasEvento = [
      { faixa: '10-50', valor: '800' },
      { faixa: '50-100', valor: '1500' },
      { faixa: '100+', valor: '2500' },
      { faixa: 'negociar', valor: '150' }
    ];
  }

  toggleEspecialidade() {
    this.isEspecialidadeOpen = !this.isEspecialidadeOpen;
    if (this.isEspecialidadeOpen) {
      this.isTipoServicoOpen = false;
    }
  }

  toggleTipoServico() {
    this.isTipoServicoOpen = !this.isTipoServicoOpen;
    if (this.isTipoServicoOpen) {
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
    this.artista.musEspecialidade = this.especialidadesSelecionadas.join(', ');
  }

  toggleTipoServicoItem(item: string) {
    const index = this.tipoServicoSelecionados.indexOf(item);
    if (index > -1) {
      this.tipoServicoSelecionados.splice(index, 1);
    } else {
      this.tipoServicoSelecionados.push(item);
    }
    this.artista.musTipoServico = this.tipoServicoSelecionados.join(', ');
  }

  isEspecialidadeSelecionada(item: string): boolean {
    return this.especialidadesSelecionadas.includes(item);
  }

  isTipoServicoSelecionado(item: string): boolean {
    return this.tipoServicoSelecionados.includes(item);
  }

  removerEspecialidade(item: string) {
    this.toggleEspecialidadeItem(item);
  }

  removerTipoServico(item: string) {
    this.toggleTipoServicoItem(item);
  }

  private montarFaixasConvidados(): string | null {
    const faixas = this.faixasEvento
      .map(item => String(item.faixa ?? '').trim())
      .filter((faixa): faixa is string => !!faixa);

    if (faixas.length === 0) {
      return null;
    }

    return faixas.join('; ');
  }

  private montarValoresSom(): string | null {
    const valores = this.faixasEvento
      .map(item => String(item.valor ?? '').trim())
      .filter((valor): valor is string => !!valor);

    return valores.length > 0 ? valores.join('; ') : null;
  }

  salvar() {
    if (this.salvando) return;
    
    // Validar campos obrigatórios
    if (!this.artista.musNomeArtistico || !this.artista.musEmail) {
      this.mensagemErro = 'Nome artístico e email são obrigatórios';
      alert('Nome artístico e email são obrigatórios');
      return;
    }
    
    this.salvando = true;
    this.mensagemErro = '';

    // Garantir que strings vazias sejam convertidas para null
    const dadosParaEnviar = {
      musNomeArtistico: this.artista.musNomeArtistico.trim(),
      musEmail: this.artista.musEmail.trim(),
      musSenha: this.artista.musSenha?.trim() || null,
      musTelefone: this.artista.musTelefone?.trim() || null,
      musEstado: this.artista.musEstado?.trim() || null,
      musCidade: this.artista.musCidade?.trim() || null,
      musBairro: this.artista.musBairro?.trim() || null,
      musGeneros: this.artista.musGeneros?.trim() || null,
      musValorHora: this.montarFaixasConvidados(),
      musValorDoSom: this.montarValoresSom(),
      musContato: this.artista.musContato?.trim() || null,
      musDescricao: this.artista.musDescricao?.trim() || null,
      musDescricaoBreve: this.artista.musDescricaoBreve?.trim() || null,
      musRedesSociais: this.artista.musRedesSociais?.trim() || null,
      musTipoServico: this.artista.musTipoServico?.trim() || null,
      musSiteArtista: this.artista.musSiteArtista?.trim() || null,
      musFacebook: this.artista.musFacebook?.trim() || null,
      musInstagram: this.artista.musInstagram?.trim() || null,
      musTiktok: this.artista.musTiktok?.trim() || null,
      musOutrasRedes: this.artista.musOutrasRedes?.trim() || null,
      musDriveGoogle: this.artista.musDriveGoogle?.trim() || null,
      musVideo01Youtube: this.artista.musVideo01Youtube?.trim() || null,
      musVideo02Youtube: this.artista.musVideo02Youtube?.trim() || null,
      musVideo03Youtube: this.artista.musVideo03Youtube?.trim() || null,
      musVideo04Youtube: this.artista.musVideo04Youtube?.trim() || null,
      musLocalizacao: this.artista.musLocalizacao?.trim() || null,
      musEspecialidade: this.artista.musEspecialidade?.trim() || null
    };

    console.log('Enviando dados para cadastro:', JSON.stringify(dadosParaEnviar, null, 2));

    this.musicosService.cadastrarMusico(dadosParaEnviar).subscribe({
      next: (response) => {
        console.log('✅ Músico cadastrado com sucesso:', response);

        this.musicosService.enviarEmailCadastro({
          nomeArtistico: dadosParaEnviar.musNomeArtistico,
          email: dadosParaEnviar.musEmail,
          telefone: dadosParaEnviar.musTelefone,
          cidade: dadosParaEnviar.musCidade,
          estado: dadosParaEnviar.musEstado
        }).subscribe({
          next: () => {
            console.log('📧 E-mail enviado com sucesso para deccolopez1@gmail.com e confirmação para o usuário.');
            alert(`Cadastro realizado com sucesso!\nID: ${response.id}\nNome: ${response.musNomeArtistico}\n\nE-mail de confirmação enviado.`);
            this.salvando = false;
            this.authService.salvarSessao({
              email: dadosParaEnviar.musEmail,
              musicoId: response.id
            });
            this.router.navigate(['/dashboard']);
          },
          error: (erroEmail) => {
            console.warn('⚠️ Cadastro realizado, mas houve falha no envio do e-mail:', erroEmail);
            alert(`Cadastro realizado com sucesso!\nID: ${response.id}\nNome: ${response.musNomeArtistico}\n\nNão foi possível enviar o e-mail automático agora.`);
            this.salvando = false;
            this.authService.salvarSessao({
              email: dadosParaEnviar.musEmail,
              musicoId: response.id
            });
            this.router.navigate(['/dashboard']);
          }
        });
      },
      error: (error) => {
        console.error('❌ Erro ao cadastrar:', error);
        this.salvando = false;
        
        // Tratamento de erros específicos do servidor
        if (error.status === 400) {
          if (error.error?.erro) {
            this.mensagemErro = error.error.erro;
            alert(error.error.erro);
          } else {
            this.mensagemErro = 'Dados inválidos. Verifique os campos obrigatórios.';
            alert('Dados inválidos. Verifique os campos obrigatórios.');
          }
        } else if (error.status === 500) {
          this.mensagemErro = 'Erro no servidor. Tente novamente mais tarde.';
          alert('Erro no servidor. Tente novamente mais tarde.');
        } else if (error.status === 0) {
          this.mensagemErro = 'Servidor offline. Verifique sua conexão.';
          alert('Servidor offline. Verifique sua conexão.');
        } else {
          this.mensagemErro = 'Erro ao cadastrar artista. Tente novamente.';
          alert('Erro ao cadastrar artista. Tente novamente.');
        }
      }
    });
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
