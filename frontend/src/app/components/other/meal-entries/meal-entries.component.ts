import { Component, effect } from '@angular/core';
import { MealEntry, MealEntryUpdateRequest, MealType } from '../../../core/models/meal-entry.model';
import { MealEntryState } from '../../../core/states/meal-entry.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { defaultMealEntry } from '../../../core/models/model-defaults';
import { FormsModule } from '@angular/forms';
import { SelectedDateState } from '../../../core/states/selected-date.state';

@Component({
    selector: 'app-meal-entries',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './meal-entries.component.html',
    styleUrl: './meal-entries.component.css'
})
export class MealEntriesComponent {

    date = '';
    mealEntries: MealEntry[] = [];
    selectedMeal: MealEntry = defaultMealEntry();

    mealTypes() {
        return Object.values(MealType).filter(type => type !== MealType.DEFAULT);
    }

    constructor(
        private mealEntryState: MealEntryState,
        private selectedDateState: SelectedDateState
    ) {

        effect(() => {
            this.date = this.selectedDateState.date();
            this.mealEntries = this.mealEntryState.meals();
        });
        console.log(this.mealEntries);
    }

    get groupedMealTypes() {
        return this.mealTypes().map(type => ({
            type,
            meals: this.mealEntries.filter(m => m.type === type)
        }));
    }


    deleteId: string | null = null;

    prepareDelete(mealId: string) {
        this.deleteId = mealId;
    }

    cancelDelete() {
        this.deleteId = null;
    }

    confirmDelete() {
        if (!this.deleteId) return;
        this.mealEntryState.deleteMeal(this.deleteId, this.date);
        this.deleteId = null;
    }


}

