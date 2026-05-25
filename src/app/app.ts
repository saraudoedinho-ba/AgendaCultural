import { Component } from '@angular/core';  
import { RouterOutlet } from '@angular/router';  
import { HeaderComponent } from './components/header/header';  
import { BannerComponent } from './components/banner/banner';  
import { AnuncioComponent } from './components/anuncio/anuncio';  
import { PerfilComponent } from './components/perfil/perfil';  
import { InformativoComponent } from './components/informativo/informativo';  
import { BeneficiosComponent } from './components/beneficios/beneficios';  
import { Rodape } from './components/rodape/rodape';
  
@Component({  
  selector: 'app-root',  
  standalone: true,  
  imports: [RouterOutlet],  
  templateUrl: './app.html',  
  styleUrl: './app.css'  
})  
export class App {} 
