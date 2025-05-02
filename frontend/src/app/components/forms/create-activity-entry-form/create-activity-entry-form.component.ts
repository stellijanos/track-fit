import { Component, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityEntryState } from '../../../core/states/activity-entry.state';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { ActivityEntryRequest } from '../../../core/models/activity-entry.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-activity-entry-form',
    templateUrl: './create-activity-entry-form.component.html',
    styleUrl: './create-activity-entry-form.component.css',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule]
})
export class CreateActivityEntryFormComponent {
    date = '';
    form!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private activityEntryState: ActivityEntryState,
        private selectedDateState: SelectedDateState
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
        });
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            durationInM: [0, [Validators.required, Validators.min(1)]],
            additionalInfo: ['']
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: ActivityEntryRequest = this.form.value;
        this.activityEntryState.createEntry(this.date, request);
        this.form.reset();
    }
}
