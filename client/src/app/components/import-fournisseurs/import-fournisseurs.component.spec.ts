import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFournisseursComponent } from './import-fournisseurs.component';

describe('ImportFournisseursComponent', () => {
  let component: ImportFournisseursComponent;
  let fixture: ComponentFixture<ImportFournisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportFournisseursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
