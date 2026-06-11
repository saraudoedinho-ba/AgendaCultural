import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEventos } from './agenda-eventos';

describe('AgendaEventos', () => {
  let component: AgendaEventos;
  let fixture: ComponentFixture<AgendaEventos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaEventos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaEventos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
