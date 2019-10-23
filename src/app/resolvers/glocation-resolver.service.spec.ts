import { TestBed } from '@angular/core/testing';

import { GLocationResolverService } from './glocation-resolver.service';

describe('GLocationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GLocationResolverService = TestBed.get(GLocationResolverService);
    expect(service).toBeTruthy();
  });
});
