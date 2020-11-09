import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDetailsButtonComponent } from './ag-details-button.component';

describe('AgDetailsButtonComponent', () => {
  let component: AgDetailsButtonComponent;
  let fixture: ComponentFixture<AgDetailsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDetailsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDetailsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
