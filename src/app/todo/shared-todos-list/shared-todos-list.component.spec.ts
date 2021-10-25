import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTodosListComponent } from './shared-todos-list.component';

describe('SharedTodosListComponent', () => {
  let component: SharedTodosListComponent;
  let fixture: ComponentFixture<SharedTodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedTodosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
