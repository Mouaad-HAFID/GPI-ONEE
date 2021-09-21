import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAgentsComponent } from './import-agents.component';

describe('ImportAgentsComponent', () => {
  let component: ImportAgentsComponent;
  let fixture: ComponentFixture<ImportAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
