import { TestBed } from '@angular/core/testing';

import { MealEntryApiService } from './meal-entry-api.service';

describe('MealEntryApiService', () => {
  let service: MealEntryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealEntryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
