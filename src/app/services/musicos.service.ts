import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MusicoAPI {
  id: number;
  musNomeArtistico: string;
  musEmail: string;
  musTelefone: string | null;
  musEstado: string | null;
  musCidade: string | null;
  musBairro: string | null;
  musGeneros: string | null;
  musValorHora: string | null;
  musValorDoSom: string | null;
  musDescricao: string | null;
  musDescricaoBreve: string | null;
  musTipoServico: string | null;
  musLocalizacao: string | null;
  musEspecialidade: string | null;
  musSiteArtista?: string | null;
  musFacebook?: string | null;
  musInstagram?: string | null;
  musTiktok?: string | null;
  musDriveGoogle?: string | null;
  musVideo01Youtube?: string | null;
  musVideo02Youtube?: string | null;
  musVideo03Youtube?: string | null;
  musVideo04Youtube?: string | null;
  musContato?: string | null;
  musRedesSociais?: string | null;
  musOutrasRedes?: string | null;
}

export interface Musico {
  id: number;
  nome: string;
  tipo: string;
  cidade: string;
  estado: string;
  descricao: string;
  avaliacoes: number;
  estrelas: number;
  precoMinimo: number;
  tags: string[];
  avaliado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MusicosService {
  private apiUrl = 'https://agendamusical.net.br/api/musicos';
  private emailNotificationUrl = 'https://formsubmit.co/ajax/ba.edison@gmail.com';

  constructor(private http: HttpClient) {}
  
  getMusicos(): Observable<Musico[]> {
    return this.http.get<MusicoAPI[]>(this.apiUrl).pipe(
      map(apiMusicos => apiMusicos.map(m => this.transformMusico(m)))
    );
  }

  getMusicoById(id: number): Observable<MusicoAPI> {
    return this.http.get<MusicoAPI>(`${this.apiUrl}/${id}`);
  }

  cadastrarMusico(dados: Partial<MusicoAPI>): Observable<MusicoAPI> {
    return this.http.post<MusicoAPI>(this.apiUrl, dados);
  }

  atualizarMusico(id: number, dados: Partial<MusicoAPI>): Observable<MusicoAPI> {
    return this.http.put<MusicoAPI>(`${this.apiUrl}/${id}`, dados);
  }

  buscarMusicoPorEmail(email: string): Observable<MusicoAPI | null> {
    return this.getMusicos().pipe(
      map(musicos => {
        const todos = musicos as any[];
        return null;
      })
    );
  }

  getMusicosRaw(): Observable<MusicoAPI[]> {
    return this.http.get<MusicoAPI[]>(this.apiUrl);
  }

  enviarEmailCadastro(dados: {
    nomeArtistico: string;
    email: string;
    telefone?: string | null;
    cidade?: string | null;
    estado?: string | null;
  }): Observable<unknown> {
    const mensagem = [
      'Novo cadastro de artista recebido.',
      `Nome artístico: ${dados.nomeArtistico}`,
      `E-mail: ${dados.email}`,
      `Telefone: ${dados.telefone || 'Não informado'}`,
      `Cidade/Estado: ${dados.cidade || 'Não informado'}${dados.estado ? ` - ${dados.estado}` : ''}`
    ].join('\n');

    return this.http.post(this.emailNotificationUrl, {
      name: dados.nomeArtistico,
      email: dados.email,
      message: mensagem,
      _subject: 'Novo cadastro de artista - Agenda Cultural',
      _captcha: 'false',
      _template: 'table'
    });
  }

  private transformMusico(apiMusico: MusicoAPI): Musico {
    const localizacao = apiMusico.musLocalizacao || '';
    const localParts = localizacao.split(',').map(p => p.trim());
    const valorBase = apiMusico.musValorDoSom || apiMusico.musValorHora || '0';
    
    return {
      id: apiMusico.id,
      nome: apiMusico.musNomeArtistico,
      tipo: apiMusico.musEspecialidade || apiMusico.musTipoServico || 'Não especificado',
      cidade: apiMusico.musCidade || localParts[0] || 'Não informado',
      estado: apiMusico.musEstado || localParts[1] || 'SP',
      descricao: apiMusico.musDescricaoBreve || apiMusico.musDescricao || 'Sem descrição',
      avaliacoes: 0,
      estrelas: 5,
      precoMinimo: this.extractPrecoMinimo(valorBase),
      tags: this.extractTags(apiMusico),
      avaliado: true
    };
  }

  private extractPrecoMinimo(valor: string | null): number {
    const valorLimpo = (valor || '0').split('|')[0].split(';')[0].trim();

    if (valorLimpo.toLowerCase() === 'negociar') {
      return 0;
    }

    if (valorLimpo.includes('-')) {
      return parseFloat(valorLimpo.split('-')[0]) || 0;
    }

    return parseFloat(valorLimpo.replace('+', '')) || 0;
  }

  private extractTags(apiMusico: MusicoAPI): string[] {
    const tags: string[] = [];
    
    if (apiMusico.musTipoServico) {
      const generos = apiMusico.musTipoServico.split(',').map(g => g.trim());
      tags.push(...generos.slice(0, 3));
    }
    
    if (tags.length === 0 && apiMusico.musGeneros) {
      const generos = apiMusico.musGeneros.split(',').map(g => g.trim());
      tags.push(...generos.slice(0, 3));
    }
    
    return tags.length > 0 ? tags : ['Música ao vivo'];
  }
}
