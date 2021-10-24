import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInputComponent } from './to-do-input.component';

describe('ToDoInputComponent', () => {
  let component: ToDoInputComponent;
  let fixture: ComponentFixture<ToDoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
