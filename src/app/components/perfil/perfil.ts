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
    { nome: 'M£sico', icon: '' },  
    { nome: 'Banda', icon: '' },  
    { nome: 'DJ', icon: '' },  
    { nome: 'Cantor', icon: '' }  
  ];  
  constructor() {}  
} 
