import { Component, effect } from '@angular/core';
import { MealPlan } from '../../../core/models/meal-plan.model';
import { MealPlanState } from '../../../core/states/meal-plan.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-meal-plan-list',
    imports: [CommonModule, RouterModule],
    templateUrl: './meal-plan-list.component.html',
    styleUrl: './meal-plan-list.component.css'
})
export class MealPlanListComponent {
    mealPlans: MealPlan[] = [];
    deleteId: string | null = null;

    constructor(
        private mealPlanState: MealPlanState,
    ) {
        effect(() => {
            this.mealPlans = this.mealPlanState
                .mealPlans()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            console.log(this.mealPlans);
        });
    }

    confirmDelete(id: string) {
        this.deleteId = id;
    }

    cancelDelete() {
        this.deleteId = null;
    }

    onDelete() {
        if (!this.deleteId) return;
        this.mealPlanState.deleteMealPlan(this.deleteId);
        this.deleteId = null;
    }
}
