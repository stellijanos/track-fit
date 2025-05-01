import { ActivityEntry } from "./activity-entry.model";
import { CaloricTarget } from "./caloric-target.model";
import { Entry } from "./entry.model";
import { MealEntry } from "./meal-entry.model";
import { DietaryPreference, DietaryRestriction, MealPlan, MealPlanType } from "./meal-plan.model";
import { Measurement } from "./measurement.model";
import { User } from "./user.model";
import { WaterIntake } from "./water-intake.model";


export const defaultActivityEntry = (): ActivityEntry => ({
    id: '',
    date: new Date(),
    name: '',
    caloriesPerHour: 0,
    totalCalories: 0,
    durationInM: 0,
    createdAt: new Date(),
    updatedAt: new Date()
});


export const defaultMeasurement = (): Measurement => ({
    id: '',
    date: new Date(),
    weight: 0,
    bodyFatPercentage: 0,
    skeletalMuscleMass: 0,
    createdAt: new Date(),
    updatedAt: new Date()
});


export const defaultCaloricTarget = (): CaloricTarget => ({
    id: '',
    name: '',
    kcal: 0,
    protein: 0,
    carb: 0,
    fat: 0,
    proteinPerKg: 0,
    carbPerKg: 0,
    fatPerKg: 0,
    isLocked: false,
    createdAt: new Date(),
    updatedAt: new Date()
});


export const defaultEntry = (): Entry => ({
    activities: defaultActivityEntry(),
    meals: defaultMealEntry(),
    waterIntake: defaultWaterIntake()
});


export const defaultMealEntry = (): MealEntry => ({
    id: '',
    date: new Date(),
    name: '',
    type: '',
    per100: {
        kcal: -1,
        protein: -1,
        carb: -1,
        fat: -1,
        fibre: -1,
        salt: -1
    },
    totalConsumed: {
        quantity: -1,
        kcal: -1,
        protein: -1,
        carb: -1,
        fat: -1,
        fibre: -1,
        salt: -1
    }
});


export const defaultMealPlan = (): MealPlan => ({
    id: '',
    name: '',
    type: MealPlanType.DEFAULT,
    preference: DietaryPreference.DEFAULT,
    mealsPerDay: -1,
    restrictions: [],
    preferredFoods: '',
    excludedFoods: '',
    days: [],
    createdAt: new Date(),
    updatedAt: new Date(),
});


export const defaultUser = (): User => ({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: new Date(),
    gender: '',
    height: -1,
    password: '',
    role: '',
    profilePicture: '',
    lastMeasurement: defaultMeasurement(),
    currentWaterTarget: {
        value: -1,
        Unit: '',
        entryOptions: []
    },
    currentCaloricTarget: defaultCaloricTarget(),
    createdAt: new Date(),
    updatedAt: new Date(),
})


export const defaultWaterIntake = (): WaterIntake => ({
    id: '',
    entries: []
});
