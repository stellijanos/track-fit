import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from "./shared/components/global-message/global-message.component";
import { AuthState } from './core/states/auth.state';
import { CommonModule } from '@angular/common';
import { UserState } from './core/states/user.state';
import { MeasurementState } from './core/states/measurement.state';
import { CaloricTargetState } from './core/states/caloric-target.state';
import { MealPlanState } from './core/states/meal-plan.state';
import { SelectedDateState } from './core/states/selected-date.state';
import { MealEntryState } from './core/states/meal-entry.state';
import { ActivityEntryState } from './core/states/activity-entry.state';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, GlobalMessageComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'Track-Fit';
    date = '';

    constructor(
        private authState: AuthState,
        private userState: UserState,
        private measurementState: MeasurementState,
        private caloricTargetState: CaloricTargetState,
        private mealPlanState: MealPlanState,
        private mealEntryState: MealEntryState,
        private selectedDateState: SelectedDateState,
        private activityEntryState: ActivityEntryState,
        private router: Router) {
        this.authState.initializeAuth();

        effect(() => {
            if (!this.authState.isTokenRefreshing() && this.authState.isLoggedIn()) {
                this.userState.getMe();
                this.measurementState.loadMeasurements(true);
                this.caloricTargetState.loadTargets(true);
                this.mealPlanState.loadMealPlans(true);
                this.date = this.selectedDateState.date();

                this.mealEntryState.loadMeals(this.date, true);
                this.activityEntryState.loadEntries(this.date);
            }
        });
    }

    shouldShowNavbar() {
        return !this.router.url.includes('not-found') && this.authState.isLoggedIn();
    }
}
