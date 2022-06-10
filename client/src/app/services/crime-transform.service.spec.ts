import { TestBed } from '@angular/core/testing';

import { CrimeTransformService } from './crime-transform.service';

describe('CrimeTransformService', () => {
  let service: CrimeTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrimeTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
