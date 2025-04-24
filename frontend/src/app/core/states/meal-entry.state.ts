import { Injectable, signal, computed } from '@angular/core';
import { MealEntry, MealEntryRequest } from '../models/meal-entry.model';
import { MealEntryApiService } from '../services/meal-entry-api.service';

@Injectable({ providedIn: 'root' })
export class MealEntryState {
    private _meals = signal<MealEntry[]>([]);
    readonly meals = computed(() => this._meals());

    constructor(private api: MealEntryApiService) { }

    clearMeals() {
        this._meals.set([]);
    }

    loadMeals(date: string, force = false) {
        if (force || this._meals().length === 0) {
            this.api.getAll(date).subscribe({
                next: (res) => {
                    this._meals.set(res.data.mealEntries);
                },
                error: (err) => {
                    console.error(err.error.message);
                }
            });
        }
    }

    createMeal(date: string, data: MealEntryRequest) {
        this.api.create(date, data).subscribe({
            next: (res) => {
                this._meals.update(list => [...list, res.data.mealEntry]);
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

    updateMeal(id: string, date: string, data: MealEntry) {
        this.api.update(id, date, data).subscribe({
            next: () => {
                this._meals.update(list => list.map(meal =>
                    meal.id === id ? { ...meal, ...data } : meal
                ));
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

    deleteMeal(id: string, date: string) {
        this.api.delete(id, date).subscribe({
            next: () => {
                this._meals.update(list => list.filter(meal => meal.id !== id));
            },
            error: (err) => {
                console.error(err.error.message);
            }
        });
    }

}
