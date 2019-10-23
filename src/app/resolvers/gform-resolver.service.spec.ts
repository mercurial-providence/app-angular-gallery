import { TestBed } from '@angular/core/testing';

import { GFormResolverService } from './gform-resolver.service';

describe('GFormResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GFormResolverService = TestBed.get(GFormResolverService);
    expect(service).toBeTruthy();
  });
});
