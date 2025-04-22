export interface ActivityEntry {
    id: string,
    date: Date,
    name: string,
    caloriesPerHour: number,
    totalCalories: number,
    durationInM: number,
    createdAt: Date,
    updatedAt: Date,
}

export interface ActivityEntryRequest {
    name: string,
    durationInM: number,
    additionalInfo: string
}
