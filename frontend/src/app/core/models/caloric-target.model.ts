export enum ActivityLevel {
    SEDENTARY = 'sedentary',
    LIGHT = 'light',
    MODERATELY = 'moderate',
    ACTIVE = 'active',
    VERY_ACTIVE = 'very_active',
}

export enum PhysicalGoal {
    MAINTAIN = 'maintain',
    FAT_LOSS = 'fat_loss',
    MUSCLE_GAIN = 'muscle_gain',
}

export enum GoalSpeed {
    SLOW = 'slow',
    MODERATE = 'moderate',
    FAST = 'fast',
}

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

export interface CaloricTargetRequest {
    activityLevel: ActivityLevel,
    physicalGoal: PhysicalGoal,
    goalSpeed: GoalSpeed
}
