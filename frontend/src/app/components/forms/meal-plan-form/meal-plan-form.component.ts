import { Component, OnInit } from '@angular/core';
import { MealPlanState } from '../../../core/states/meal-plan.state';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MealPlanRequest, MealPlanType, DietaryPreference, DietaryRestriction } from '../../../core/models/meal-plan.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-meal-plan-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './meal-plan-form.component.html',
    styleUrls: ['./meal-plan-form.component.css']
})
export class MealPlanFormComponent implements OnInit {
    form!: FormGroup;

    planTypes = Object.values(MealPlanType).filter(t => t !== MealPlanType.DEFAULT);
    dietaryPreferences = Object.values(DietaryPreference).filter(p => p !== DietaryPreference.DEFAULT);
    dietaryRestrictions = Object.values(DietaryRestriction).filter(r => r !== DietaryRestriction.DEFAULT);

    selectedRestrictions: DietaryRestriction[] = [];

    constructor(private fb: FormBuilder, private mealPlanState: MealPlanState) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            dailyMealPrepTime: [0, [Validators.required, Validators.min(0)]],
            mealsPerDay: [1, Validators.required],
            planType: ['', Validators.required],
            preference: ['', Validators.required],
            preferredFoods: [''],
            excludedFoods: [''],
            restrictions: [[]]
        });
    }

    onRestrictionChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const value = input.value as DietaryRestriction;

        const current = this.form.get('restrictions')?.value as DietaryRestriction[];
        if (input.checked) {
            this.form.get('restrictions')?.setValue([...current, value]);
        } else {
            this.form.get('restrictions')?.setValue(current.filter(r => r !== value));
        }
    }

    onSubmit(): void {
        console.log(this.form.value);
        if (this.form.invalid) return;

        this.mealPlanState.createMealPlan(this.form.value as MealPlanRequest);
    }
}
