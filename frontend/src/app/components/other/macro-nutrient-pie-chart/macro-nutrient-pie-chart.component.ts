import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-macro-nutrient-pie-chart',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './macro-nutrient-pie-chart.component.html',
    styleUrls: ['./macro-nutrient-pie-chart.component.css']
})
export class MacroNutrientPieChartComponent {
    macros = [
        { name: 'Protein', consumed: 90, total: 120, percent: (90 / 120) * 100, color: '#42a5f5' },
        { name: 'Carbs', consumed: 200, total: 250, percent: (200 / 250) * 100, color: '#66bb6a' },
        { name: 'Fat', consumed: 60, total: 80, percent: (60 / 80) * 100, color: '#ffa726' },
    ];

    public pieChartLabels: string[] = ['Protein', 'Carbs', 'Fat'];
    public pieChartData: ChartData<'pie', number[], string> = {
        labels: this.pieChartLabels,
        datasets: [
            {
                data: this.macros.map(m => m.consumed),
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
}
