import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-calendar-week-row',
    imports: [CommonModule],
    templateUrl: './calendar-week-row.component.html',
    styleUrls: ['./calendar-week-row.component.css']
})
export class CalendarWeekRowComponent implements OnInit {
    currentDate = new Date();
    selectedDate: Date = new Date();
    week: Date[] = [];

    ngOnInit(): void {
        this.updateWeek();
    }

    updateWeek() {
        const startOfWeek = new Date(this.currentDate);
        startOfWeek.setDate(this.currentDate.getDate() - this.currentDate.getDay());

        this.week = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
    }

    isToday(date: Date): boolean {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }

    isSelected(date: Date): boolean {
        return (
            this.selectedDate.getDate() === date.getDate() &&
            this.selectedDate.getMonth() === date.getMonth() &&
            this.selectedDate.getFullYear() === date.getFullYear()
        );
    }

    selectDay(date: Date) {
        this.selectedDate = date;
    }

    goToPreviousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.updateWeek();
    }

    goToNextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.updateWeek();
    }

    getWeekNumber(date: Date): number {
        const copied = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = copied.getUTCDay() || 7;
        copied.setUTCDate(copied.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(copied.getUTCFullYear(), 0, 1));
        return Math.ceil((((copied as any) - (yearStart as any)) / 86400000 + 1) / 7);
    }
}
