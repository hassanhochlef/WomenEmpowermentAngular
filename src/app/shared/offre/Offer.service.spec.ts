import { TestBed } from '@angular/core/testing';

import { OfferService } from './Offer.service';

describe('AddOffreService', () => {
  let service: OfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
