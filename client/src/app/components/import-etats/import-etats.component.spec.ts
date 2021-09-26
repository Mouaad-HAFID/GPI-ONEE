import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEtatsComponent } from './import-etats.component';

describe('ImportEtatsComponent', () => {
  let component: ImportEtatsComponent;
  let fixture: ComponentFixture<ImportEtatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportEtatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEtatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
