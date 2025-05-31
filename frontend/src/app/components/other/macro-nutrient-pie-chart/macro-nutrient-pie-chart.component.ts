import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { MealEntryState } from '../../../core/states/meal-entry.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { MealEntry } from '../../../core/models/meal-entry.model';
import { UserState } from '../../../core/states/user.state';
import { defaultCaloricTarget } from '../../../core/models/model-defaults';
import { normalizeTimeOfDay, calculateBMR } from '../../../shared/functions/formulas';
import { ActivityEntryState } from '../../../core/states/activity-entry.state';
import { ActivityEntry } from '../../../core/models/activity-entry.model';

@Component({
    selector: 'app-macro-nutrient-pie-chart',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './macro-nutrient-pie-chart.component.html',
    styleUrls: ['./macro-nutrient-pie-chart.component.css']
})
export class MacroNutrientPieChartComponent {

    date = '';
    mealEntries: MealEntry[] = [];
    totalConsumed = 0;
    totalBurnt = 0;
    activityEntries: ActivityEntry[] = [];
    currentCaloricTarget = defaultCaloricTarget();

    macros = [
        { name: 'Protein', consumed: 0, total: 120, percent: 0, color: '#42a5f5' },
        { name: 'Carbs', consumed: 0, total: 250, percent: 0, color: '#66bb6a' },
        { name: 'Fat', consumed: 0, total: 80, percent: 0, color: '#ffa726' },
    ];

    public pieChartLabels: string[] = ['Protein', 'Carbs', 'Fat'];
    public pieChartData: ChartData<'pie', number[], string> = {
        labels: this.pieChartLabels,
        datasets: [
            {
                data: [],
                backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
                hoverBackgroundColor: ['#64b5f6', '#81c784', '#ffb74d']
            }
        ]
    };
    public pieChartType: ChartType = 'pie';
    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    constructor(
        private selectedDateState: SelectedDateState,
        private mealEntryState: MealEntryState,
        private userState: UserState,
        private activityEntryState: ActivityEntryState
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
            this.mealEntries = this.mealEntryState.meals();
            this.activityEntries = this.activityEntryState.entries();
            this.currentCaloricTarget = this.userState.user().currentCaloricTarget;

            this.calculateTotalBurnt();

            if (this.mealEntries.length) {
                this.calculateMacros();
            } else {
                this.setDefault();
            }
        });
    }

    calculateTotalBurnt() {
        this.totalBurnt = normalizeTimeOfDay(this.date) * calculateBMR(this.userState.user());
        this.activityEntries.forEach(entry => {
            this.totalBurnt += entry.totalCalories;
        })
    }

    setDefault() {
        this.macros = [
            { name: 'Protein', consumed: 0, total: this.currentCaloricTarget.protein, percent: 0, color: '#42a5f5' },
            { name: 'Carbs', consumed: 0, total: this.currentCaloricTarget.carb, percent: 0, color: '#66bb6a' },
            { name: 'Fat', consumed: 0, total: this.currentCaloricTarget.fat, percent: 0, color: '#ffa726' },
        ];

        this.pieChartData = {
            labels: this.pieChartLabels,
            datasets: [
                {
                    data: [0.00001, 0.00001, 0.00001],
                    backgroundColor: ['#eeeeee', '#eeeeee', '#eeeeee'],
                    hoverBackgroundColor: ['#eeeeee', '#eeeeee', '#eeeeee'],
                    borderWidth: 0
                }
            ]
        };

        this.totalConsumed = 0;
    }


    calculateMacros() {
        const totals = {
            protein: 0,
            carb: 0,
            fat: 0
        };

        this.totalConsumed = 0;

        for (const meal of this.mealEntries) {
            totals.protein += meal.totalConsumed.protein;
            totals.carb += meal.totalConsumed.carb;
            totals.fat += meal.totalConsumed.fat;
            this.totalConsumed += meal.totalConsumed.kcal;
        }

        this.macros = [
            { name: 'Protein', consumed: totals.protein, total: this.currentCaloricTarget.protein, color: '#42a5f5' },
            { name: 'Carbs', consumed: totals.carb, total: this.currentCaloricTarget.carb, color: '#66bb6a' },
            { name: 'Fat', consumed: totals.fat, total: this.currentCaloricTarget.fat, color: '#ffa726' },
        ].map(macro => ({
            ...macro,
            percent: (macro.consumed / macro.total) * 100
        }));

        this.pieChartData = {
            labels: this.pieChartLabels,
            datasets: [
                {
                    data: this.macros.map(m => m.consumed),
                    backgroundColor: ['#42a5f5', '#66bb6a', '#ffa726'],
                    hoverBackgroundColor: ['#64b5f6', '#81c784', '#ffb74d']
                }
            ]
        };
    }

}
