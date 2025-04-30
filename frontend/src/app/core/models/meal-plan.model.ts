
interface Meal {
    id: string,
    name: string,
    description: string,
    type: string,
    kcal: number,
    protein: number,
    carb: number,
    fat: number,
    fibre: number,
    salt: number,
}


interface Day {
    id: string,
    name: string,
    description: string,
    dailyCaloricTarget: number,
    dailyMacros: {
        protein: number,
        carb: number,
        fat: number
    },
    meals: Meal[]
}


export enum MealPlanType {
    ONE_DAY = 'one_day',
    THREE_DAY = 'three_day',
    FIVE_DAY = 'five_day',
    SEVEN_DAY = 'seven_day',
    DEFAULT = ''
}


export enum DietaryPreference {
    OMNIVORE = 'omnivore',
    VEGETARIAN = 'vegetarian',
    VEGAN = 'vegan',
    PESCATARIAN = 'pescatarian',
    KETO = 'keto',
    LOW_CARB = 'low_carb',
    HIGH_PROTEIN = 'high_protein',
    GLUTEN_FREE = 'gluten_free',
    MEDITERRANEAN = 'mediterranean',
    PALEO = 'paleo',
    DEFAULT = ''
}


export enum DietaryRestriction {
    NUTS = 'nuts',
    GLUTEN = 'gluten',
    LACTOSE = 'lactose',
    SOY = 'soy',
    EGGS = 'eggs',
    SHELLFISH = 'shellfish',
    FISH = 'fish',
    NIGHTSHADES = 'nightshades',
    DEFAULT = ''
}


export interface MealPlan {
    id: string,
    name: string,
    type: MealPlanType,
    preference: DietaryPreference,
    mealsPerDay: 1 | 2 | 3 | 4 | 5 | -1,
    restrictions: DietaryRestriction[],
    preferredFoods: string,
    excludedFoods: string,
    days: Day[],
    createdAt: Date,
    updatedAt: Date,
}


export interface MealPlanRequest {

    dailyMealPrepTime: string,
    mealsPerDay: 1 | 2 | 3 | 4 | 5,
    planType: MealPlanType,
    preference: DietaryPreference,
    restrictions: DietaryRestriction[]
}
