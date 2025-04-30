import { Component, Input, OnInit } from '@angular/core';
import { Measurement } from '../../../core/models/measurement.model';
import { defaultMeasurement } from '../../../core/models/model-defaults';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MeasurementState } from '../../../core/states/measurement.state';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-measurement-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './measurement-form.component.html',
    styleUrls: ['./measurement-form.component.css']
})
export class MeasurementFormComponent implements OnInit {
    @Input()
    measurement: Measurement = defaultMeasurement();

    form !: FormGroup;

    formTexts = {
        button: '',
    }

    constructor(
        private fb: FormBuilder,
        private measurementState: MeasurementState,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {

        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.measurement = this.measurementState.findById(id);
        }

        this.form = this.fb.group({
            date: [this.measurement.date || new Date(), Validators.required],
            weight: [this.measurement.weight, [Validators.required, Validators.min(1)]],
            bodyFatPercentage: [this.measurement.bodyFatPercentage, [Validators.required, Validators.min(0)]],
            skeletalMuscleMass: [this.measurement.skeletalMuscleMass, [Validators.required, Validators.min(0)]],
        });
    }

    onSubmit() {
        if (this.form.invalid) return;

        if (this.measurement.id) {
            this.measurementState.updateMeasurement(this.measurement.id, this.form.value as Measurement);
        } else {
            this.measurementState.createMeasurement(this.form.value as Measurement);
        }
    }
}
