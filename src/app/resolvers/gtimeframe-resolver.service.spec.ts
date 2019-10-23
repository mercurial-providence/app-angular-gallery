import { TestBed } from '@angular/core/testing';

import { GTimeframeResolverService } from './gtimeframe-resolver.service';

describe('GTimeframeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GTimeframeResolverService = TestBed.get(GTimeframeResolverService);
    expect(service).toBeTruthy();
  });
});
