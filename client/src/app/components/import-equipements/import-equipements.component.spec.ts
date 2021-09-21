import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportEquipementsComponent } from './import-equipements.component';

describe('ImportEquipementsComponent', () => {
  let component: ImportEquipementsComponent;
  let fixture: ComponentFixture<ImportEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportEquipementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
