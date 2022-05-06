import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidacyAreaComponent } from './candidacy-area.component';

describe('CandidacyAreaComponent', () => {
  let component: CandidacyAreaComponent;
  let fixture: ComponentFixture<CandidacyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidacyAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidacyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
