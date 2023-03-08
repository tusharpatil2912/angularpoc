import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksTileComponent } from './my-tasks-tile.component';

describe('MyTasksTileComponent', () => {
  let component: MyTasksTileComponent;
  let fixture: ComponentFixture<MyTasksTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTasksTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTasksTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
