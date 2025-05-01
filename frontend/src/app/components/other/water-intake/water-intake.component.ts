import { Component, effect, OnInit } from '@angular/core';
import { WaterIntake } from '../../../core/models/water-intake.model';
import { defaultWaterIntake } from '../../../core/models/model-defaults';
import { WaterIntakeState } from '../../../core/states/water-intake.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { UserState } from '../../../core/states/user.state';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-water-intake',
    imports: [CommonModule],
    templateUrl: './water-intake.component.html',
    styleUrl: './water-intake.component.css'
})
export class WaterIntakeComponent {
    date = '';
    dailyTarget = 0;
    currentIntake = 0;
    entryOptions: number[] = [];
    waterIntake: WaterIntake = defaultWaterIntake();

    constructor(
        private waterIntakeState: WaterIntakeState,
        private selectedDateState: SelectedDateState,
        private userState: UserState
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
            this.waterIntakeState.loadIntake(this.date, true);
            this.entryOptions = this.userState.user().currentWaterTarget.entryOptions;
            this.dailyTarget = this.userState.user().currentWaterTarget.value;
        });

        effect(() => {
            this.waterIntake = this.waterIntakeState.intake() || defaultWaterIntake();
            this.updateCurrentIntake();
        });

    }

    get fillLevel(): number {
        return Math.min(100, (this.currentIntake / this.dailyTarget) * 100);
    }

    updateCurrentIntake() {
        this.currentIntake = this.waterIntake.entries.reduce((sum, entry) => sum + entry.quantity, 0);
    }

    addWater(quantity: number) {
        this.waterIntakeState.addEntry(this.date, { quantity });
    }

    deleteEntry(id: string) {
        this.waterIntakeState.deleteEntry(id, this.date);
    }
}
