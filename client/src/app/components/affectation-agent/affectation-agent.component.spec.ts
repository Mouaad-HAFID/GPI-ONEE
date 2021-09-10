import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationAgentComponent } from './affectation-agent.component';

describe('AffectationAgentComponent', () => {
  let component: AffectationAgentComponent;
  let fixture: ComponentFixture<AffectationAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
