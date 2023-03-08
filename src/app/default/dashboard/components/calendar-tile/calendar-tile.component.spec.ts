import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTileComponent } from './calendar-tile.component';

describe('CalendarTileComponent', () => {
  let component: CalendarTileComponent;
  let fixture: ComponentFixture<CalendarTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
