import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTourComponent } from './site-tour.component';

describe('SiteTourComponent', () => {
  let component: SiteTourComponent;
  let fixture: ComponentFixture<SiteTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
