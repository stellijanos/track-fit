import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityEntriesComponent } from './activity-entries.component';

describe('ActivityEntriesComponent', () => {
  let component: ActivityEntriesComponent;
  let fixture: ComponentFixture<ActivityEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
