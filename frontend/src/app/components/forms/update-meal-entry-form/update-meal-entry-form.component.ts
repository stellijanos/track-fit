import { Component, effect, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealEntryState } from '../../../core/states/meal-entry.state';
import { MealEntry, MealEntryUpdateRequest, MealType } from '../../../core/models/meal-entry.model';
import { defaultMealEntry } from '../../../core/models/model-defaults';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectedDateState } from '../../../core/states/selected-date.state';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-update-meal-entry-form',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './update-meal-entry-form.component.html',
    styleUrl: './update-meal-entry-form.component.css'
})
export class UpdateMealEntryFormComponent implements OnInit {

    date = '';
    mealEntryId = '';
    form !: FormGroup;
    mealEntry: MealEntry = defaultMealEntry();
    mealTypes: MealType[] = Object.values(MealType).filter(type => type !== MealType.DEFAULT);

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private mealEntryState: MealEntryState,
        private selectedDateState: SelectedDateState
    ) {
        effect(() => {
            this.date = this.selectedDateState.date();
        });
    }


    ngOnInit(): void {
        this.mealEntryId = this.route.snapshot.paramMap.get('id') || '';
        this.mealEntry = this.mealEntryState.findById(this.mealEntryId);

        this.form = this.fb.group({
            name: [this.mealEntry.name, Validators.required],
            quantity: [this.mealEntry.totalConsumed.quantity, [Validators.required, Validators.min(1)]],
            type: [this.mealEntry.type, Validators.required]
        });

        this.form.get('quantity')?.valueChanges.subscribe(quantity => {
            const ratio = quantity / 100;
            this.mealEntry.totalConsumed = {
                quantity,
                kcal: +(this.mealEntry.per100.kcal * ratio).toFixed(2),
                protein: +(this.mealEntry.per100.protein * ratio).toFixed(2),
                carb: +(this.mealEntry.per100.carb * ratio).toFixed(2),
                fat: +(this.mealEntry.per100.fat * ratio).toFixed(2),
                fibre: +(this.mealEntry.per100.fibre * ratio).toFixed(2),
                salt: +(this.mealEntry.per100.salt * ratio).toFixed(2),
            };
        });
    }



    onSubmit() {
        if (this.form.invalid) return;
        this.mealEntryState.updateMeal(this.mealEntryId, this.date, this.form.value as MealEntryUpdateRequest);
    }

}
