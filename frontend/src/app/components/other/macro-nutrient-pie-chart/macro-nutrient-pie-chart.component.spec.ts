import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroNutrientPieChartComponent } from './macro-nutrient-pie-chart.component';

describe('MacroNutrientPieChartComponent', () => {
  let component: MacroNutrientPieChartComponent;
  let fixture: ComponentFixture<MacroNutrientPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MacroNutrientPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MacroNutrientPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
