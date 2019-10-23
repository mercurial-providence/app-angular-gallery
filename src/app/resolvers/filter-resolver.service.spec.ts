import { TestBed } from '@angular/core/testing';

import { FilterResolverService } from './filter-resolver.service';

describe('FilterResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterResolverService = TestBed.get(FilterResolverService);
    expect(service).toBeTruthy();
  });
});
