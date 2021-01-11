import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgSwimlanesButtonComponent } from './ag-swimlanes-button.component';

describe('AgSwimlanesButtonComponent', () => {
  let component: AgSwimlanesButtonComponent;
  let fixture: ComponentFixture<AgSwimlanesButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgSwimlanesButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgSwimlanesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
