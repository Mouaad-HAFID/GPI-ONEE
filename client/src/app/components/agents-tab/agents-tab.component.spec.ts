import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsTabComponent } from './agents-tab.component';

describe('AgentsTabComponent', () => {
  let component: AgentsTabComponent;
  let fixture: ComponentFixture<AgentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
