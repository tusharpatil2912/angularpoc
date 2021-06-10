import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskreadonlyComponent } from './taskreadonly.component';

describe('TaskreadonlyComponent', () => {
  let component: TaskreadonlyComponent;
  let fixture: ComponentFixture<TaskreadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskreadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskreadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
