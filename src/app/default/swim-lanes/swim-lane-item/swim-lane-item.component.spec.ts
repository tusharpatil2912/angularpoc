import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwimLaneItemComponent } from './swim-lane-item.component';

describe('SwimLaneItemComponent', () => {
  let component: SwimLaneItemComponent;
  let fixture: ComponentFixture<SwimLaneItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwimLaneItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwimLaneItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
