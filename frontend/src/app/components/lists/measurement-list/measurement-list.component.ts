import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MeasurementState } from '../../../core/states/measurement.state';
import { Measurement } from '../../../core/models/measurement.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-measurement-list',
    imports: [CommonModule],
    templateUrl: './measurement-list.component.html',
    styleUrls: ['./measurement-list.component.css'],
})
export class MeasurementListComponent {
    measurements: Measurement[] = [];
    deleteId: string | null = null;

    constructor(
        private measurementState: MeasurementState,
        private router: Router
    ) {
        effect(() => {
            this.measurements = this.measurementState
                .measurements()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });
    }

    onUpdate(id: string) {
        this.router.navigate(['/measurements', id, 'edit']);
    }

    confirmDelete(id: string) {
        this.deleteId = id;
    }

    cancelDelete() {
        this.deleteId = null;
    }

    onDelete() {
        if (!this.deleteId) return;
        this.measurementState.deleteMeasurement(this.deleteId);
        this.deleteId = null;
    }
}
