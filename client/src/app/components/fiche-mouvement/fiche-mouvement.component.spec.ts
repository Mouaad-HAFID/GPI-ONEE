import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheMouvementComponent } from './fiche-mouvement.component';

describe('FicheMouvementComponent', () => {
  let component: FicheMouvementComponent;
  let fixture: ComponentFixture<FicheMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheMouvementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
