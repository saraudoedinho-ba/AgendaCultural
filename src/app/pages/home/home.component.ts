import { Component } from '@angular/core';  
import { HeaderComponent } from '../../components/header/header';
import { BannerComponent } from '../../components/banner/banner';
import { AnuncioComponent } from '../../components/anuncio/anuncio';
import { PerfilComponent } from '../../components/perfil/perfil';
import { InformativoComponent } from '../../components/informativo/informativo';
import { BeneficiosComponent } from '../../components/beneficios/beneficios';
import { Rodape } from '../../components/rodape/rodape';
  
@Component({  
  selector: 'app-home',  
  standalone: true,  
  imports: [HeaderComponent, BannerComponent, AnuncioComponent, PerfilComponent, InformativoComponent, BeneficiosComponent, Rodape],  
  templateUrl: './home.component.html',  
  styleUrls: ['./home.component.css']  
})  
export class HomeComponent {  
  constructor() {}  
} 
