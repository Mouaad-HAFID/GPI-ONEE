import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgammeComponent } from './addgamme.component';

describe('AddgammeComponent', () => {
  let component: AddgammeComponent;
  let fixture: ComponentFixture<AddgammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
