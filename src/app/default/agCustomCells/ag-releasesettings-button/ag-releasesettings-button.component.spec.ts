import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgReleasesettingsButtonComponent } from './ag-releasesettings-button.component';

describe('AgReleasesettingsButtonComponent', () => {
  let component: AgReleasesettingsButtonComponent;
  let fixture: ComponentFixture<AgReleasesettingsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgReleasesettingsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgReleasesettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
