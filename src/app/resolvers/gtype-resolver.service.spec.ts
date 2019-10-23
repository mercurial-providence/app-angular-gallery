import { TestBed } from '@angular/core/testing';

import { GTypeResolverService } from './gtype-resolver.service';

describe('GTypeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GTypeResolverService = TestBed.get(GTypeResolverService);
    expect(service).toBeTruthy();
  });
});
