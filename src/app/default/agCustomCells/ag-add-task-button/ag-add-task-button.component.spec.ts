import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgAddTaskButtonComponent } from './ag-add-task-button.component';

describe('AgAddTaskButtonComponent', () => {
  let component: AgAddTaskButtonComponent;
  let fixture: ComponentFixture<AgAddTaskButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgAddTaskButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgAddTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
