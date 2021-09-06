import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsExpansionComponent } from './agents-expansion.component';

describe('AgentsExpansionComponent', () => {
  let component: AgentsExpansionComponent;
  let fixture: ComponentFixture<AgentsExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
