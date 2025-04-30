import { Component, effect, OnInit } from '@angular/core';
import { MeasurementState } from '../../../core/states/measurement.state';
import { Measurement } from '../../../core/models/measurement.model';
import { TopNavbarComponent } from "../../../shared/components/top-navbar/top-navbar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-measurements',
    imports: [CommonModule, TopNavbarComponent],
    templateUrl: './measurements.component.html',
    styleUrl: './measurements.component.css'
})
export class MeasurementsComponent implements OnInit {


    measurements: Measurement[] = [];

    constructor(private measurementState: MeasurementState) {
        effect(() => {
            this.measurements = this.measurementState.measurements();
            console.log(this.measurements);
        })
    }

    ngOnInit(): void {

    }

}
