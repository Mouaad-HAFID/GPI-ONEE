import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementsExpansionComponent } from './mouvements-expansion.component';

describe('MouvementsExpansionComponent', () => {
  let component: MouvementsExpansionComponent;
  let fixture: ComponentFixture<MouvementsExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MouvementsExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementsExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
