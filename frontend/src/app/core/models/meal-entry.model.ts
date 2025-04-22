export enum MealType {
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
    SNACK_1 = 'snack1',
    SNACK_2 = 'snack2',
}

export interface MealEntry {
    id: string,
    date: Date,
    name: string,
    type: string,
    per100: string,
    totalConsumed: string,
}

export interface MealEntryRequest {
    description: string,
    type: MealType
}
