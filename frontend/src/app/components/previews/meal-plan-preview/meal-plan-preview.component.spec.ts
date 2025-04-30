import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlanPreviewComponent } from './meal-plan-preview.component';

describe('MealPlanPreviewComponent', () => {
  let component: MealPlanPreviewComponent;
  let fixture: ComponentFixture<MealPlanPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealPlanPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealPlanPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
