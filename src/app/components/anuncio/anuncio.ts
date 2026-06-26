import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anuncio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anuncio.html',
  styleUrl: './anuncio.css'
})
export class AnuncioComponent implements OnInit, OnDestroy {
  imagens = [
    './assets/images/anuncio1.jpeg',
    './assets/images/anuncio2.jpeg',
    './assets/images/anuncio3.jpeg'
  ];
  currentIndex = 0;
  private intervalId: any;

  constructor() {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
        this.intervalId = setInterval(() => {
      this.next();
    }, 10000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  prev() {
    this.stopAutoSlide();
    this.currentIndex = this.currentIndex === 0 ? this.imagens.length - 1 : this.currentIndex - 1;
    this.startAutoSlide();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.imagens.length;
  }

  goTo(index: number) {
    this.stopAutoSlide();
    this.currentIndex = index;
    this.startAutoSlide();
  }
} 
