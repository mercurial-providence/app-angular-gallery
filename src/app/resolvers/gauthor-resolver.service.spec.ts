import { TestBed } from '@angular/core/testing';

import { GAuthorResolverService } from './gauthor-resolver.service';

describe('GAuthorResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GAuthorResolverService = TestBed.get(GAuthorResolverService);
    expect(service).toBeTruthy();
  });
});
