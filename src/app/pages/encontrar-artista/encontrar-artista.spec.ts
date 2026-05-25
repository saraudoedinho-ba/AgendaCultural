import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncontrarArtista } from './encontrar-artista';

describe('EncontrarArtista', () => {
  let component: EncontrarArtista;
  let fixture: ComponentFixture<EncontrarArtista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncontrarArtista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncontrarArtista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
