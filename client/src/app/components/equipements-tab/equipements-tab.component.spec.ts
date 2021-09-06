import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementsTabComponent } from './equipements-tab.component';

describe('EquipementsTabComponent', () => {
  let component: EquipementsTabComponent;
  let fixture: ComponentFixture<EquipementsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipementsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
