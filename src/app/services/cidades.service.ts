import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EstadoInfo {
  codigo_uf: number;
  uf: string;
  nome: string;
  latitude: number;
  longitude: number;
  regiao: string;
  cidades: string[];
}

export interface CidadeDetalhe {
  codigo_uf: number;
  nome: string;
}

export type CidadesBrasil = EstadoInfo[];

@Injectable({
  providedIn: 'root'
})
export class CidadesService {
  private estadosUrl = '/data/cidades-brasil.json';
  private cidadesUrl = '/data/todas-cidades.json';

  constructor(private http: HttpClient) {}

  carregarEstados(): Observable<CidadesBrasil> {
    return this.http.get<CidadesBrasil>(this.estadosUrl);
  }

  carregarTodasCidades(): Observable<CidadeDetalhe[]> {
    return this.http.get<CidadeDetalhe[]>(this.cidadesUrl);
  }

  carregarCidadesPorEstado(codigoUf: number): Observable<string[]> {
    return this.carregarTodasCidades().pipe(
      map(cidades => cidades
        .filter(c => c.codigo_uf === codigoUf)
        .map(c => c.nome)
      )
    );
  }
}