import { TestBed } from '@angular/core/testing';

import { GpsServiceService } from './gps-service.service';

describe('GpsServiceService', () => {
  let service: GpsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
