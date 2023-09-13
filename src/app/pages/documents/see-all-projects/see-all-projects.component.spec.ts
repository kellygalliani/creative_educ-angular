import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAllProjectsComponent } from './see-all-projects.component';

describe('SeeAllProjectsComponent', () => {
  let component: SeeAllProjectsComponent;
  let fixture: ComponentFixture<SeeAllProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAllProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeAllProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
