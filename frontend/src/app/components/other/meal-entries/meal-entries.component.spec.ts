import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealEntriesComponent } from './meal-entries.component';

describe('MealEntriesComponent', () => {
  let component: MealEntriesComponent;
  let fixture: ComponentFixture<MealEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
