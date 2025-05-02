export enum MealType {
    BREAKFAST = 'breakfast',
    LUNCH = 'lunch',
    DINNER = 'dinner',
    SNACK_1 = 'snack1',
    SNACK_2 = 'snack2',
    DEFAULT = '',
}

export interface MealEntry {
    id: string,
    date: Date,
    name: string,
    type: string,
    per100: {
        kcal: number,
        protein: number,
        carb: number,
        fat: number,
        fibre: number,
        salt: number
    },
    totalConsumed: {
        quantity: number,
        kcal: number,
        protein: number,
        carb: number,
        fat: number,
        fibre: number,
        salt: number
    }
}

export interface MealEntryRequest {
    description: string,
    type: MealType
}
