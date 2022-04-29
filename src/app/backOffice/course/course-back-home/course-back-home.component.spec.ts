import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBackHomeComponent } from './course-back-home.component';

describe('CourseBackHomeComponent', () => {
  let component: CourseBackHomeComponent;
  let fixture: ComponentFixture<CourseBackHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseBackHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseBackHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
