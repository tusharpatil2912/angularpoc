import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimLanesComponent } from './swim-lanes.component';

describe('SwimLanesComponent', () => {
  let component: SwimLanesComponent;
  let fixture: ComponentFixture<SwimLanesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimLanesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimLanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
