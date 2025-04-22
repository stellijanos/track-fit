import { TestBed } from '@angular/core/testing';

import { WaterIntakeApiService } from './water-intake-api.service';

describe('WaterIntakeApiService', () => {
  let service: WaterIntakeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterIntakeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
