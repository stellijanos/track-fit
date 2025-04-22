import { TestBed } from '@angular/core/testing';

import { ExportApiService } from './export-api.service';

describe('ExportApiService', () => {
  let service: ExportApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
