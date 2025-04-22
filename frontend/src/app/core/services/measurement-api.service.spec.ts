import { TestBed } from '@angular/core/testing';

import { MeasurementApiService } from './measurement-api.service';

describe('MeasurementApiService', () => {
  let service: MeasurementApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasurementApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
