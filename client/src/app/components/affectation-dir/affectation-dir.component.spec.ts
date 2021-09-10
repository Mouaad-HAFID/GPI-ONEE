import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationDirComponent } from './affectation-dir.component';

describe('AffectationDirComponent', () => {
  let component: AffectationDirComponent;
  let fixture: ComponentFixture<AffectationDirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationDirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
