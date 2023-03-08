import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTileComponent } from './projects-tile.component';

describe('ProjectsTileComponent', () => {
  let component: ProjectsTileComponent;
  let fixture: ComponentFixture<ProjectsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
