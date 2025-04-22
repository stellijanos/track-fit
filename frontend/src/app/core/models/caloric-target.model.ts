export interface CaloricTarget {
    id: string,
    name: string,
    kcal: number,
    protein: number,
    carb: number,
    fat: number,
    proteinPerKg: number,
    carbPerKg: number,
    fatPerKg: number,
    isLocked: boolean,
    createdAt: Date,
    updatedAt: Date,
}
