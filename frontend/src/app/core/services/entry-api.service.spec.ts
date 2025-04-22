import { TestBed } from '@angular/core/testing';

import { EntryApiService } from './entry-api.service';

describe('EntryApiService', () => {
  let service: EntryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
