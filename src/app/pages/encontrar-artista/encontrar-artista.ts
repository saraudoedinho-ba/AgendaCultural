import { Component } from '@angular/core';  
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header';
import { Rodape } from "../../components/rodape/rodape";
import { CommonModule } from '@angular/common';
  
@Component({  
  selector: 'app-encontrar-artista',  
  standalone: true,  
  imports: [ CommonModule, HeaderComponent, Rodape],  
  templateUrl: './encontrar-artista.html',  
  styleUrl: './encontrar-artista.css'  
})  
export class EncontrarArtistaComponent {  
  
  constructor(private router: Router) {}

  // Método para navegar programaticamente
  navegarParaDetalhes(artistaId: number) {
    this.router.navigate(['/detalhes-artista', artistaId]);
  }

  // Método para voltar
  voltar() {
    this.router.navigate(['/']);
  }
} 
