import { TestBed } from '@angular/core/testing';

import { GetIpService } from './ip-service.service';

describe('GetIpService', () => {
  let service: GetIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
