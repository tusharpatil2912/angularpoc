import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskbuttonComponent } from './taskbutton.component';

describe('TaskbuttonComponent', () => {
  let component: TaskbuttonComponent;
  let fixture: ComponentFixture<TaskbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
