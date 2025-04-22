import { TestBed } from '@angular/core/testing';

import { ActivityEntryApiService } from './activity-entry-api.service';

describe('ActivityEntryApiService', () => {
  let service: ActivityEntryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityEntryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
