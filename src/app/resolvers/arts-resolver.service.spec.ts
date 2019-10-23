import { TestBed } from '@angular/core/testing';

import { ArtsResolverService } from './arts-resolver.service';

describe('ArtsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtsResolverService = TestBed.get(ArtsResolverService);
    expect(service).toBeTruthy();
  });
});
