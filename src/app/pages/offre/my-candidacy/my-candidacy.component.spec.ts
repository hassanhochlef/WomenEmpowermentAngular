import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCandidacyComponent } from './my-candidacy.component';

describe('MyCandidacyComponent', () => {
  let component: MyCandidacyComponent;
  let fixture: ComponentFixture<MyCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCandidacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
