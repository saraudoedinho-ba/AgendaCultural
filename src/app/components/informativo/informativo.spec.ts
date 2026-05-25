import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Informativo } from './informativo';

describe('Informativo', () => {
  let component: Informativo;
  let fixture: ComponentFixture<Informativo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Informativo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Informativo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
