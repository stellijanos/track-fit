import { Component, effect } from '@angular/core';
import { MealEntryState } from '../../../core/states/meal-entry.state';
import { MealEntryRequest, MealType } from '../../../core/models/meal-entry.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-meal-entry-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './meal-entry-form.component.html',
    styleUrl: './meal-entry-form.component.css'
})
export class MealEntryFormComponent {

    date = '';
    form!: FormGroup;
    mealType: MealType = MealType.DEFAULT;

    constructor(
        private fb: FormBuilder,
        private mealEntryState: MealEntryState,
        private selectedDateState: SelectedDateState,
        private route: ActivatedRoute,
        private router: Router
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
        });
    }

    ngOnInit(): void {
        this.mealType = this.route.snapshot.paramMap.get('mealType') as MealType;

        if (!Object.values(MealType).includes(this.mealType)) {
            this.router.navigate(['/']);
        }

        this.form = this.fb.group({
            description: ['', [Validators.required, Validators.minLength(2)]],
            type: [this.mealType, Validators.required]
        });
    }

    onSubmit() {
        if (this.form.invalid) return;
        this.mealEntryState.createMeal(this.date, this.form.value as MealEntryRequest);
    }
}
