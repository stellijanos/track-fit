import { Component, effect } from '@angular/core';
import { MealEntry, MealType } from '../../../core/models/meal-entry.model';
import { MealEntryState } from '../../../core/states/meal-entry.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { UserState } from '../../../core/states/user.state';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-meal-entries',
    imports: [CommonModule, RouterModule],
    templateUrl: './meal-entries.component.html',
    styleUrl: './meal-entries.component.css'
})
export class MealEntriesComponent {

    date = '';
    mealEntries: MealEntry[] = [];

    mealTypes() {
        return Object.values(MealType).filter(type => type !== MealType.DEFAULT);
    }

    constructor(
        private userState: UserState,
        private mealEntryState: MealEntryState,
        private selectedDateState: SelectedDateState
    ) {

        effect(() => {
            this.date = this.selectedDateState.date();
            if (this.userState.userReady()) {
                this.mealEntryState.loadMeals(this.date, true);
            }
        });

        effect(() => {
            this.mealEntries = this.mealEntryState.meals();
        });
        console.log(this.mealEntries);
    }

    get groupedMealTypes() {
        return this.mealTypes().map(type => ({
            type,
            meals: this.mealEntries.filter(m => m && m.type === type)
        }));
    }

}

