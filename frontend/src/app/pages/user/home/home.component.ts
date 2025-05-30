import { Component, effect, OnInit } from '@angular/core';
import { CalendarWeekRowComponent } from "../../../components/other/calendar-week-row/calendar-week-row.component";
import { UserState } from '../../../core/states/user.state';
import { User } from '../../../core/models/user.model';
import { WaterIntakeComponent } from "../../../components/other/water-intake/water-intake.component";
import { MealEntriesComponent } from "../../../components/other/meal-entries/meal-entries.component";
import { ActivityEntriesComponent } from "../../../components/other/activity-entries/activity-entries.component";
import { MacroNutrientPieChartComponent } from "../../../components/other/macro-nutrient-pie-chart/macro-nutrient-pie-chart.component";

@Component({
    selector: 'app-home',
    imports: [CalendarWeekRowComponent, WaterIntakeComponent, MealEntriesComponent, ActivityEntriesComponent, MacroNutrientPieChartComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

    user !: User;

    constructor(private userState: UserState) {
        effect(() => {
            this.user = this.userState.user();
        });
    }

    ngOnInit(): void {

    }
}
