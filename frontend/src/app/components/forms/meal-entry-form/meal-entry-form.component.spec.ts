import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealEntryFormComponent } from './meal-entry-form.component';

describe('MealEntryFormComponent', () => {
  let component: MealEntryFormComponent;
  let fixture: ComponentFixture<MealEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
