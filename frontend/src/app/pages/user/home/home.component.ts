import { Component, effect, OnInit } from '@angular/core';
import { CalendarWeekRowComponent } from "../../../components/other/calendar-week-row/calendar-week-row.component";
import { UserState } from '../../../core/states/user.state';
import { User } from '../../../core/models/user.model';
import { WaterIntakeComponent } from "../../../components/other/water-intake/water-intake.component";
import { MealEntriesComponent } from "../../../components/other/meal-entries/meal-entries.component";

@Component({
    selector: 'app-home',
    imports: [CalendarWeekRowComponent, WaterIntakeComponent, MealEntriesComponent],
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
