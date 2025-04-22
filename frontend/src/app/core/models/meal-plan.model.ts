
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


export interface MealPlan {
    id: string,
    name: string,
    type: string,
    preference: string,
    mealsPerDay: string,
    restrictions: string,
    preferredFoods: string,
    excludedFoods: string,
    createdAt: string,
    updatedAt: string,
    days: Day[]
}
