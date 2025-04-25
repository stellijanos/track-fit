import { Injectable, signal, computed } from '@angular/core';
import { WaterEntryRequest, WaterIntake } from '../models/water-intake.model';
import { WaterIntakeApiService } from '../services/water-intake-api.service';

@Injectable({ providedIn: 'root' })
export class WaterIntakeState {
    private _intake = signal<WaterIntake | null>(null);
    readonly intake = computed(() => this._intake());
    readonly entries = computed(() => this._intake()?.entries ?? []);

    constructor(private api: WaterIntakeApiService) { }

    loadIntake(date: string, force = false) {
        if (force || !this._intake()) {
            this.api.get(date).subscribe({
                next: (res) => {
                    this._intake.set(res.data.waterIntake);
                }
            });
        }
    }

    addEntry(date: string, data: WaterEntryRequest) {
        this.api.create(date, data).subscribe({
            next: (res) => {
                this._intake.set(res.data.waterIntake);
            }
        });
    }

    deleteEntry(entryId: string, date: string) {
        this.api.delete(entryId, date).subscribe({
            next: (res) => {
                this._intake.set(res.data.waterIntake)
            }
        });
    }

    clearIntake() {
        this._intake.set(null);
    }
}
