import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent {
  categorias = [
        { 
          nome: 'Músico', 
          imagem: './assets/images/pocket.png'
        },
        { 
          nome: 'Banda', 
          imagem: './assets/images/cerimonial.png'
        },
    { 
      nome: 'DJ', 
      imagem: './assets/images/baile.png'
    },
    { 
      nome: 'Cantor', 
      imagem: './assets/images/vozeviolao.png'
    }
  ];
  constructor() {}
} 
