import { TestBed } from '@angular/core/testing';

import { CaloricTargetApiService } from './caloric-target-api.service';

describe('CaloricTargetApiService', () => {
  let service: CaloricTargetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaloricTargetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
