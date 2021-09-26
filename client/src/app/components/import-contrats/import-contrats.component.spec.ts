import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContratsComponent } from './import-contrats.component';

describe('ImportContratsComponent', () => {
  let component: ImportContratsComponent;
  let fixture: ComponentFixture<ImportContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportContratsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
