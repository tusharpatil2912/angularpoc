import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgSettingsButtonComponent } from './ag-settings-button.component';

describe('AgSettingsButtonComponent', () => {
  let component: AgSettingsButtonComponent;
  let fixture: ComponentFixture<AgSettingsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgSettingsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgSettingsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
