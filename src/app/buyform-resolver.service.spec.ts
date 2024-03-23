import { TestBed } from '@angular/core/testing';

import { BuyformResolverService } from './buyform-resolver.service';

describe('BuyformResolverService', () => {
  let service: BuyformResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyformResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
