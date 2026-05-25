import { Component } from '@angular/core';  
import { RouterModule } from '@angular/router';  
  
@Component({  
  selector: 'app-banner',  
  standalone: true,  
  imports: [RouterModule],  
  templateUrl: './banner.html',  
  styleUrl: './banner.css'  
})  
export class BannerComponent {  
  constructor() {}  
} 
