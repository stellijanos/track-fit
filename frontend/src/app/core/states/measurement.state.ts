import { Injectable, signal, computed } from '@angular/core';
import { Measurement } from '../models/measurement.model';
import { MeasurementApiService } from '../services/measurement-api.service';
import { defaultMeasurement } from '../models/model-defaults';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class MeasurementState {
    private _measurements = signal<Measurement[]>([]);
    readonly measurements = computed(() => this._measurements());

    constructor(private api: MeasurementApiService, private router: Router) { }

    loadMeasurements(force = false) {
        if (force || this._measurements().length === 0) {
            this.api.getMeasurements().subscribe({
                next: (res) => {
                    this._measurements.set(res.data.measurements);
                }
            });
        }
    }

    createMeasurement(data: Omit<Measurement, 'id' | 'createdAt' | 'updatedAt'>) {
        this.api.createMeasurement(data).subscribe({
            next: (res) => {
                this._measurements.update(list => [...list, res.data.measurement]);
                this.navigateTo('/measurements');
            }
        });
    }

    updateMeasurement(id: string, data: Omit<Measurement, 'id' | 'createdAt' | 'updatedAt'>) {
        this.api.updateMeasurement(id, data).subscribe({
            next: (res) => {
                this._measurements.update(list =>
                    list.map(m => m.id === id ? res.data.measurement : m)
                );
                this.navigateTo('/measurements');
            }
        });
    }

    deleteMeasurement(id: string) {
        this.api.deleteMeasurement(id).subscribe({
            next: () => {
                this._measurements.update(list => list.filter(m => m.id !== id));
            }
        });
    }

    clearMeasurements() {
        this._measurements.set([]);
    }

    findById(id: string): Measurement {
        return this.measurements().find(m => m.id === id) || defaultMeasurement();
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

}
