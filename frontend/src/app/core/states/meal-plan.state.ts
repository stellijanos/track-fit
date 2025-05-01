import { Injectable, signal, computed } from '@angular/core';
import { MealPlan, MealPlanRequest } from '../models/meal-plan.model';
import { MealPlanApiService } from '../services/meal-plan-api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MealPlanState {
    private _mealPlans = signal<MealPlan[]>([]);
    private _selectedMealPlan = signal<MealPlan | null>(null);

    readonly mealPlans = computed(() => this._mealPlans());
    readonly selectedMealPlan = computed(() => this._selectedMealPlan());

    constructor(private api: MealPlanApiService, private router: Router) { }

    loadMealPlans(force = false) {
        if (force || this._mealPlans().length === 0) {
            this.api.getAllPreviews().subscribe({
                next: (res) => {
                    this._mealPlans.set(res.data.mealPlans);
                }
            });
        }
    }

    loadMealPlanById(id: string) {
        this.api.get(id).subscribe({
            next: (res) => {
                this._selectedMealPlan.set(res.data.mealPlan);
            }
        });
    }

    createMealPlan(data: MealPlanRequest) {
        this.api.create(data).subscribe({
            next: (res) => {
                this._mealPlans.update(list => [...list, res.data.mealPlan]);
                this.navigateTo('/meal-plans');
            }
        });
    }

    deleteMealPlan(id: string) {
        this.api.delete(id).subscribe({
            next: () => {
                this._mealPlans.update(list => list.filter(mp => mp.id !== id));
                if (this._selectedMealPlan()?.id === id) {
                    this._selectedMealPlan.set(null);
                }
            }
        });
    }

    clearMealPlans() {
        this._mealPlans.set([]);
        this._selectedMealPlan.set(null);
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }
}
