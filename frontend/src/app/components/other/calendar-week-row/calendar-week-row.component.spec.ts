import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarWeekRowComponent } from './calendar-week-row.component';

describe('CalendarWeekRowComponent', () => {
  let component: CalendarWeekRowComponent;
  let fixture: ComponentFixture<CalendarWeekRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarWeekRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarWeekRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
