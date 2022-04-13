import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontLandingComponent } from './front-landing.component';

describe('FrontLandingComponent', () => {
  let component: FrontLandingComponent;
  let fixture: ComponentFixture<FrontLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
