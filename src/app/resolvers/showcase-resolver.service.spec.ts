import { TestBed } from '@angular/core/testing';

import { ShowcaseResolverService } from './showcase-resolver.service';

describe('ShowcaseResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowcaseResolverService = TestBed.get(ShowcaseResolverService);
    expect(service).toBeTruthy();
  });
});
