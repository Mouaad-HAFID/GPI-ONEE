import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementsExpansionComponent } from './equipements-expansion.component';

describe('EquipementsExpansionComponent', () => {
  let component: EquipementsExpansionComponent;
  let fixture: ComponentFixture<EquipementsExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementsExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementsExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
