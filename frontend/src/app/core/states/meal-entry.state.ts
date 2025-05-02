import { Injectable, signal, computed } from '@angular/core';
import { MealEntry, MealEntryRequest, MealEntryUpdateRequest } from '../models/meal-entry.model';
import { MealEntryApiService } from '../services/meal-entry-api.service';
import { defaultMealEntry } from '../models/model-defaults';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MealEntryState {
    private _meals = signal<MealEntry[]>([]);
    readonly meals = computed(() => this._meals());

    constructor(private api: MealEntryApiService, private router: Router) { }

    clearMeals() {
        this._meals.set([]);
    }

    loadMeals(date: string, force = false) {
        if (force || this._meals().length === 0) {
            this.api.getAll(date).subscribe({
                next: (res) => {
                    this._meals.set(res.data.mealEntries);
                    console.log(res);
                }
            });
        }
    }

    createMeal(date: string, data: MealEntryRequest) {
        this.api.create(date, data).subscribe({
            next: (res) => {
                this._meals.update(list => [...list, res.data.mealEntry]);
                this.navigateTo('/');
            }
        });
    }

    updateMeal(id: string, date: string, data: MealEntryUpdateRequest) {
        this.api.update(id, date, data).subscribe({
            next: () => {
                this._meals.update(list => list.map(meal =>
                    meal.id === id ? { ...meal, ...data } : meal
                ));
                this.navigateTo('/');
            }
        });
    }

    deleteMeal(id: string, date: string) {
        this.api.delete(id, date).subscribe({
            next: () => {
                this._meals.update(list => list.filter(meal => meal.id !== id));
            }
        });
    }

    findById(id: string): MealEntry {
        return this._meals().find(m => m.id === id) || defaultMealEntry();
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

}
