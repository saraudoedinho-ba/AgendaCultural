import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ArtistaSearchResult {
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
}

@Injectable({
  providedIn: 'root'
})
export class ArtistasSearchService {
  private apiUrl = 'https://agendamusical.net.br/api/musicos';

  constructor(private http: HttpClient) {}

  buscarTodos(): Observable<ArtistaSearchResult[]> {
    return this.http.get<ArtistaSearchResult[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<ArtistaSearchResult> {
    return this.http.get<ArtistaSearchResult>(`${this.apiUrl}/${id}`);
  }

  buscarPorNome(nome: string): Observable<ArtistaSearchResult[]> {
    return this.http.get<ArtistaSearchResult[]>(this.apiUrl).pipe(
      map(artistas => artistas.filter(a =>
        a.musNomeArtistico?.toLowerCase().includes(nome.toLowerCase())
      ))
    );
  }

  buscarPorFiltros(filtros: {
    nome?: string;
    estado?: string;
    cidade?: string;
    categoria?: string;
  }): Observable<ArtistaSearchResult[]> {
    return this.http.get<ArtistaSearchResult[]>(this.apiUrl).pipe(
      map(artistas => {
        return artistas.filter(a => {
          const matchNome = !filtros.nome ||
            a.musNomeArtistico?.toLowerCase().includes(filtros.nome.toLowerCase());
          const matchEstado = !filtros.estado ||
            a.musEstado?.toLowerCase() === filtros.estado.toLowerCase();
          const matchCidade = !filtros.cidade ||
            a.musCidade?.toLowerCase() === filtros.cidade.toLowerCase();
          const matchCategoria = !filtros.categoria ||
            a.musTipoServico?.toLowerCase().includes(filtros.categoria.toLowerCase());
          return matchNome && matchEstado && matchCidade && matchCategoria;
        });
      })
    );
  }
}