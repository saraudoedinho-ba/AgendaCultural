import { Component } from '@angular/core';  
import { CommonModule } from '@angular/common';  
  
@Component({  
  selector: 'app-informativo',  
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './informativo.html',  
  styleUrl: './informativo.css'  
})  
export class InformativoComponent {  
  beneficios = [  
    { titulo: 'Qualidade', descricao: 'Profissionais verificados', icon: '', iconPath: '', nota: 'Destaque' },  
    { titulo: 'Seguran‡a', descricao: 'Pagamento garantido', icon: '', iconPath: '', nota: '' }  
  ];  
  constructor() {}  
} 
