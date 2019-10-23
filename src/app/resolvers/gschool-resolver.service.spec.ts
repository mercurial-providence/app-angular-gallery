import { TestBed } from '@angular/core/testing';

import { GSchoolResolverService } from './gschool-resolver.service';

describe('GSchoolResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GSchoolResolverService = TestBed.get(GSchoolResolverService);
    expect(service).toBeTruthy();
  });
});
