import { Component, Input, OnInit } from '@angular/core';
import { CaloricTarget, CaloricTargetRequest, ActivityLevel, GoalSpeed, PhysicalGoal } from '../../../core/models/caloric-target.model';
import { defaultCaloricTarget } from '../../../core/models/model-defaults';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CaloricTargetState } from '../../../core/states/caloric-target.state';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-caloric-target-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './caloric-target-form.component.html',
    styleUrls: ['./caloric-target-form.component.css']
})
export class CaloricTargetFormComponent implements OnInit {

    form!: FormGroup;

    formTexts = {
        button: 'Create target',
    };

    activityLevels = Object.values(ActivityLevel);
    physicalGoals = Object.values(PhysicalGoal);
    goalSpeeds = Object.values(GoalSpeed);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private caloricTargetState: CaloricTargetState
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            activityLevel: ['', Validators.required],
            physicalGoal: ['', Validators.required],
            goalSpeed: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.form.invalid) return;
        const payload: CaloricTargetRequest = this.form.value;
        this.caloricTargetState.createTarget(payload);
    }
}
