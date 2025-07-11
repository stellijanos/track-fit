import { Component, effect, OnInit } from '@angular/core';
import { MealPlanState } from '../../../core/states/meal-plan.state';
import { ActivatedRoute } from '@angular/router';
import { MealPlan } from '../../../core/models/meal-plan.model';
import { defaultMealPlan } from '../../../core/models/model-defaults';
import { CommonModule } from '@angular/common';
import { ExportApiService } from '../../../core/services/export-api.service';

@Component({
    selector: 'app-meal-plan-preview',
    imports: [CommonModule],
    templateUrl: './meal-plan-preview.component.html',
    styleUrl: './meal-plan-preview.component.css'
})
export class MealPlanPreviewComponent implements OnInit {

    mealPlan: MealPlan = defaultMealPlan();

    constructor(private mealPlanstate: MealPlanState, private router: ActivatedRoute, private exportService: ExportApiService) {
        effect(() => {
            this.mealPlan = this.mealPlanstate.selectedMealPlan() || defaultMealPlan();
        })
    }

    ngOnInit(): void {
        const mealPlanId = this.router.snapshot.paramMap.get('id');
        if (mealPlanId) {
            this.mealPlanstate.loadMealPlanById(mealPlanId)
        }
    }


    exportToPdf() {
        this.exportService.getPdf(this.mealPlan.id).subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'meal-plan.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    }
}
