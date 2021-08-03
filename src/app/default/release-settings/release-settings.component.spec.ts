import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSettingsComponent } from './release-settings.component';

describe('ReleaseSettingsComponent', () => {
  let component: ReleaseSettingsComponent;
  let fixture: ComponentFixture<ReleaseSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
