import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseBoardComponent } from './release-board.component';

describe('ReleaseBoardComponent', () => {
  let component: ReleaseBoardComponent;
  let fixture: ComponentFixture<ReleaseBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
